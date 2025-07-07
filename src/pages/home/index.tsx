import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlpFilters } from "@/components/filter/Filters";
import { filtersConfig } from "@/mock";
import Card from "@/components/Card";
import Paginator from "@/components/Paginator/Paginator";
import { RootState, AppDispatch } from "@/store";
import { fetchAuctions, FetchAuctionsParams } from "@/store/auction/thunk";

const Auctions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { auctions, filteredAuctions, isLoading, error } = useSelector((state: RootState) => state.auction);

  const [activeFilters, setActiveFilters] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // Debug: Log para ver qué estamos obteniendo

  // Resetear página cuando cambien filtros o búsqueda
  useEffect(() => {
    if (search || activeFilters.length > 0) {
      setCurrentPage(1);
    }
  }, [search, activeFilters]);

  // Cargar subastas al montar el componente y cuando cambien los filtros
  useEffect(() => {
    const params: FetchAuctionsParams = {
      page: currentPage,
      limit: itemsPerPage
    };
    
    // Agregar búsqueda si existe
    if (search) {
      params.search = search;
    }
    
    // Agregar filtros si existen
    if (activeFilters.length > 0) {
      params.filters = {
        safetyLevel: activeFilters.filter(f => f.filterCategory === 'safetyLevel').map(f => f.labelId),
        species: activeFilters.filter(f => f.filterCategory === 'species').map(f => f.labelId),
        deliveryDueDays: activeFilters.filter(f => f.filterCategory === 'deliveryDueDays').map(f => parseInt(f.labelId))
      };
    }
    
    const actionResult = dispatch(fetchAuctions(params));
  }, [dispatch, currentPage, search, activeFilters]);

  // Mapear los datos de la API al formato que espera el componente Card
  const mapAuctionToCardData = (auction: any) => {
    
    return {
      id: auction.id,
      image: auction.attachedImage || "/assets/images/image_test_card.png",
      titulo: auction.title || "Sin título",
      subtitulo: auction.username || "Usuario desconocido",
      sb: parseFloat(auction.startingBidPrice) || 0,
      mb: parseFloat(auction.minimumBidIncrement) || 0,
      chip1: auction.safety || "safe",
      chip2: auction.promotedTime ? true : false,
      time: formatTimeRemaining(auction.auctionEndDate),
      isPromoted: auction.promotedTime ? true : false
    };
  };

  // Función para formatear el tiempo restante
  const formatTimeRemaining = (endDate: string) => {
    if (!endDate) return "Sin fecha";
    
    try {
      const now = new Date();
      const end = new Date(endDate);
      const diffMs = end.getTime() - now.getTime();
      
      if (diffMs <= 0) {
        return "Finalizada";
      }
      
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        return `About ${diffDays} day${diffDays > 1 ? 's' : ''}`;
      } else if (diffHours > 0) {
        return `${diffHours} Hour${diffHours > 1 ? 's' : ''}`;
      } else if (diffMinutes > 0) {
        return `${diffMinutes} Minute${diffMinutes > 1 ? 's' : ''}`;
      } else {
        return "Less than 1 minute";
      }
    } catch (error) {
      console.error('Error formatting time:', error);
      return "Error en fecha";
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    const params: FetchAuctionsParams = {
      page: page,
      limit: itemsPerPage
    };
    
    dispatch(fetchAuctions(params));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Verificar que filteredAuctions es un array
  if (!Array.isArray(filteredAuctions)) {
    console.error('filteredAuctions is not an array:', filteredAuctions);
    return (
      <div className="w-full h-full flex justify-center items-center py-14">
        <div className="text-red-500 text-xl">Error: datos inválidos</div>
      </div>
    );
  }

  // Mapear datos de forma segura
  let currentData = [];
  try {
    currentData = filteredAuctions.map(mapAuctionToCardData);
  } catch (error) {
    console.error('Error mapping data:', error);
    return (
      <div className="w-full h-full flex justify-center items-center py-14">
        <div className="text-red-500 text-xl">Error mapeando datos</div>
      </div>
    );
  }

  const totalItems = auctions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center py-14">
        <div className="text-white text-xl">Cargando subastas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center py-14">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="w-full h-full flex flex-col md:grid md:grid-cols-[28%_auto] gap-8 py-14 px-4">
        {/* Filtros Desktop - Sidebar */}
        <div className="w-auto h-auto hidden md:block">
          <PlpFilters
            filtersConfig={filtersConfig}
            onFiltersChange={setActiveFilters}
            onSearch={setSearch}
            activeFilters={activeFilters}
            searchQuery={search}
          />
        </div>

        <div className="flex-1">
          {/* Header de secciones */}
          <div className="w-full h-[68px] flex justify-center items-center gap-3 mb-4">
            <div>
              <span className="text-white font-lato text-[20px] font-normal">Commission</span>
            </div>
            <div>
              <span className="text-white font-lato text-[24px] font-bold underline border-l-2 border-r-2 border-white px-4">YCH</span>
            </div>
            <div>
              <span className="text-white font-lato text-[20px] font-normal">Adoptable</span>
            </div>
          </div>

          {/* Filtros Mobile - Debajo del header */}
          <div className="w-full block md:hidden mb-4">
            <PlpFilters
              filtersConfig={filtersConfig}
              onFiltersChange={setActiveFilters}
              onSearch={setSearch}
              activeFilters={activeFilters}
              searchQuery={search}
            />
          </div>

          {/* Información de resultados */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <span className="text-gray-400 text-sm">
              Mostrando {currentData.length} de {totalItems} resultados
            </span>
            <span className="text-gray-400 text-sm">
              Página {currentPage} de {totalPages || 1}
            </span>
          </div>


          {/* Grid de cards - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 justify-items-center md:justify-items-stretch">
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <Card
                  key={item.id}
                  image={item.image}
                  titulo={item.titulo}
                  subtitulo={item.subtitulo}
                  sb={item.sb}
                  mb={item.mb}
                  isPromoted={item.isPromoted}
                  time={item.time}
                  safety={item.chip1}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                No se encontraron subastas
              </div>
            )}
          </div>

          {/* Paginador */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showPages={5}
                className="mb-8"
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auctions;