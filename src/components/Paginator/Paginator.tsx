// components/Paginator.tsx
import React from 'react';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPages?: number; // Número de páginas a mostrar alrededor de la actual
  className?: string;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPages = 5,
  className = ''
}) => {
  // Calcular las páginas visibles (sin puntos suspensivos)
  const getVisiblePages = () => {
    const pages: number[] = [];
    
    if (totalPages <= showPages) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas alrededor de la actual
      const half = Math.floor(showPages / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + showPages - 1);
      
      // Ajustar si estamos cerca del final
      if (end - start + 1 < showPages) {
        start = Math.max(1, end - showPages + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // No mostrar paginador si solo hay una página o menos
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {/* Botón anterior */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={isFirstPage}
        className={`
          flex items-center justify-center min-w-[48px] h-12 px-3 rounded-lg border transition-all duration-200 font-medium
          ${isFirstPage 
            ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed' 
            : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-blue-600 hover:border-blue-500 hover:text-white'
          }
        `}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Páginas numeradas */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`
            flex items-center justify-center min-w-[48px] h-12 px-3 rounded-lg border transition-all duration-200 font-medium
            ${page === currentPage
              ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
              : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-blue-600 hover:border-blue-500 hover:text-white'
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Botón siguiente */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={isLastPage}
        className={`
          flex items-center justify-center min-w-[48px] h-12 px-3 rounded-lg border transition-all duration-200 font-medium
          ${isLastPage 
            ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed' 
            : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-blue-600 hover:border-blue-500 hover:text-white'
          }
        `}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Paginator;