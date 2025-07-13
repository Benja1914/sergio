import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Interfaz para definir la estructura de una auction
export interface Auction {
  id: string;
  title: string;
  images: string[];
  startingBid: number; // SB - Starting Bid
  minimumBid: number;  // MB - Minimum Bid
  currentBid?: number;
  description?: string;
  endDate?: string;
  status?: 'active' | 'ended' | 'upcoming';
}

export interface AuctionsComponentProps {
  auctions: Auction[];
  className?: string;
}

const AuctionsComponent: React.FC<AuctionsComponentProps> = ({ 
  auctions, 
  className = '' 
}) => {
  const [currentAuctionIndex, setCurrentAuctionIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  const handlePrevAuction = () => {
    setCurrentAuctionIndex(prev => 
      prev > 0 ? prev - 1 : auctions.length - 1
    );
  };

  const handleNextAuction = () => {
    setCurrentAuctionIndex(prev => 
      prev < auctions.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrevImage = (auctionId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [auctionId]: prev[auctionId] > 0 ? prev[auctionId] - 1 : totalImages - 1
    }));
  };

  const handleNextImage = (auctionId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [auctionId]: prev[auctionId] < totalImages - 1 ? prev[auctionId] + 1 : 0
    }));
  };

  const getCurrentImage = (auctionId: string) => {
    return currentImageIndex[auctionId] || 0;
  };

  if (!auctions || auctions.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-slate-400">No auctions available at the moment.</p>
      </div>
    );
  }

  const currentAuction = auctions[currentAuctionIndex];
  const currentImgIdx = getCurrentImage(currentAuction.id);
  const totalImages = currentAuction.images.length;

  return (
    <div className={`relative ${className}`}>
      {/* Auction Card */}
      <div className="relative bg-slate-900 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-colors max-w-md">
        {/* Main Navigation Arrows */}
        {auctions.length > 1 && (
          <>
            <button 
              onClick={handlePrevAuction}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700/80 rounded-full p-2 transition-colors z-20"
              aria-label="Previous auction"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNextAuction}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700/80 rounded-full p-2 transition-colors z-20"
              aria-label="Next auction"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Container */}
        <div className="relative mb-4">
          {currentAuction.images[currentImgIdx] && currentAuction.images[currentImgIdx].trim() !== '' ? (
            <img 
              src={currentAuction.images[currentImgIdx]} 
              alt={`${currentAuction.title} - Image ${currentImgIdx + 1}`}
              className="w-full h-80 lg:h-96 object-cover rounded-lg bg-slate-800"
              onError={(e) => {
                // Si la imagen falla, ocultar el img y mostrar el fallback
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = parent.querySelector('.image-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }
              }}
              onLoad={() => console.log('Image loaded successfully:', currentAuction.images[currentImgIdx])}
            />
          ) : null}
          
          {/* Fallback message - always rendered but hidden by default */}
          <div 
            className={`image-fallback w-full h-80 lg:h-96 bg-slate-800 rounded-lg border-2 border-dashed border-slate-600 ${
              !currentAuction.images[currentImgIdx] || currentAuction.images[currentImgIdx].trim() === '' 
                ? 'flex' : 'hidden'
            } flex-col items-center justify-center text-center p-6`}
          >
            <div className="text-slate-400 mb-2">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-medium">No image provided</p>
            <p className="text-slate-500 text-xs mt-1">Image not available for this auction</p>
          </div>
          
          {/* Image Navigation Arrows - only show if multiple images AND image exists */}
          {totalImages > 1 && currentAuction.images[currentImgIdx] && currentAuction.images[currentImgIdx].trim() !== '' && (
            <>
              <button 
                onClick={() => handlePrevImage(currentAuction.id, totalImages)}
                className="absolute left-2 bottom-2 bg-black/60 hover:bg-black/80 rounded-full p-1 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button 
                onClick={() => handleNextImage(currentAuction.id, totalImages)}
                className="absolute right-2 bottom-2 bg-black/60 hover:bg-black/80 rounded-full p-1 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </>
          )}
          
          {/* Status badge */}
          {currentAuction.status && (
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentAuction.status === 'active' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : currentAuction.status === 'ended'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}>
                {currentAuction.status.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Auction Info */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2 text-white">{currentAuction.title}</h3>
          
          {currentAuction.description && (
            <p className="text-slate-300 text-sm mb-3 line-clamp-2">{currentAuction.description}</p>
          )}
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-slate-400">
              <span className="font-medium text-slate-300">SB:</span> ${currentAuction.startingBid}
            </div>
            <div className="text-slate-400">
              <span className="font-medium text-slate-300">MB:</span> ${currentAuction.minimumBid}
            </div>
            
            {currentAuction.currentBid && (
              <div className="text-slate-400 col-span-2">
                <span className="font-medium text-slate-300">Current Bid:</span> 
                <span className="text-green-400 font-semibold"> ${currentAuction.currentBid}</span>
              </div>
            )}
            
            {currentAuction.endDate && (
              <div className="text-slate-400 col-span-2">
                <span className="font-medium text-slate-300">Ends:</span> {new Date(currentAuction.endDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mb-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium">
            Place Bid
          </button>
          <button className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-colors">
            Watch
          </button>
        </div>

        {/* Auction indicators */}
        {auctions.length > 1 && (
          <div className="flex justify-center mb-2">
            <div className="flex gap-1">
              {auctions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAuctionIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentAuctionIndex ? 'bg-white' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to auction ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Image indicators - only show if current auction has multiple valid images */}
        {totalImages > 1 && currentAuction.images.some(img => img && img.trim() !== '') && (
          <div className="flex justify-center">
            <div className="flex gap-1">
              {currentAuction.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(prev => ({...prev, [currentAuction.id]: index}))}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentImgIdx ? 'bg-blue-400' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionsComponent;