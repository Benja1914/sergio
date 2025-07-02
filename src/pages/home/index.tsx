import React, { useState } from "react";
import { PlpFilters } from "@/components/filter/Filters";
import { filtersConfig } from "@/mock";
import Card from "@/components/Card";
import Paginator from "@/components/Paginator/Paginator";

const Auctions = () => {
  const [activeFilters, setActiveFilters] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  // Estados para el paginador (simulados para maquetado)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Simular 10 páginas
  const itemsPerPage = 24;

  // Simular datos para la página actual
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return Array.from({ length: itemsPerPage }).map((_, idx) => ({
      id: startIndex + idx,
      image: "/assets/images/image_test_card.png",
      titulo: `Example Title Auction examp YCH ${startIndex + idx + 1}`,
      subtitulo: "Artist Name Example",
      sb: 180,
      mb: 20,
      isPromoted: (startIndex + idx) % 2 === 0,
      time: "15 hours"
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Aquí después harás la llamada al servicio
    console.log(`Cambiar a página: ${page}`);

    // Scroll suave hacia arriba (opcional)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentData = getCurrentPageData();
  const totalItems = totalPages * itemsPerPage; // Total simulado

  return (
    <React.Fragment>
      <div className="w-full h-full flex flex-col md:grid md:grid-cols-[28%_auto] gap-8 py-14 px-4">
        {/* Filtros Desktop - Sidebar */}
        <div className="w-auto h-auto hidden md:block">
          <PlpFilters
            filtersConfig={filtersConfig}
            onFiltersChange={setActiveFilters}
            onSearch={setSearch}
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
            />
          </div>

          {/* Información de resultados */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <span className="text-gray-400 text-sm">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} resultados
            </span>
            <span className="text-gray-400 text-sm">
              Página {currentPage} de {totalPages}
            </span>
          </div>

          {/* Grid de cards - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 justify-items-center md:justify-items-stretch">
            {currentData.map((item, idx) => (
              <Card
                key={item.id}
                image={item.image}
                titulo={item.titulo}
                subtitulo={item.subtitulo}
                sb={item.sb}
                mb={item.mb}
                isPromoted={item.isPromoted}
                time={item.time}
              />
            ))}
          </div>

          {/* Paginador */}
          <div className="flex justify-center">
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showPages={5}
              className="mb-8"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auctions;