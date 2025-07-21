import React, { useState, useEffect } from 'react';
import { Search, Clock, ChevronUp, User } from 'lucide-react';

const AuctionPlatform = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 2,
    minutes: 43,
    seconds: 41
  });

  const [showCustomize, setShowCustomize] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const bidders = [
    { name: "WolfStranger876", amount: "$70.00", avatar: "🐺" },
    { name: "John Doe", amount: "$65.00", avatar: "👤" },
    { name: "Abadun", amount: "$60.00", avatar: "🎭" }
  ];

  return (
    <div className="min-h-screen text-white flex flex-col">
      

      {/* Main content */}
      <div className="flex flex-1">
        {/* Left side - Artwork */}
        <div className="flex-1">
          {/* Artwork image */}
          <div className="relative">
            <div className="h-96 bg-gradient-to-br from-purple-600 via-purple-700 to-red-600 relative overflow-hidden">
              {/* YCH text */}
              <div className="absolute top-8 left-8 text-white text-5xl font-bold transform -rotate-12 z-10">
                YCH
              </div>
              
              {/* Character placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-purple-300 bg-opacity-80 rounded-lg p-6 w-32 h-40">
                  {/* Simple character representation */}
                  <div className="w-full h-full bg-purple-400 rounded relative">
                    {/* Head */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-200 rounded-full"></div>
                    {/* Body parts */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-600 rounded"></div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-purple-600 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Explicit badge */}
              <div className="absolute bottom-6 left-6">
                <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                  Explicit
                </span>
              </div>
              
              {/* Artist watermark */}
              <div className="absolute bottom-6 right-6 bg-black bg-opacity-90 px-3 py-2 rounded text-center">
                <div className="text-white text-sm font-bold leading-tight">
                  <div>SAD</div>
                  <div>PEA</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Artist info and description */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-gray-300">Test777</span>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-3">YCH | HUMAN | FURRY</h1>
            
            <div className="text-gray-400 text-sm mb-4">
              <div>Human/furry/anthro</div>
              <div>female, futanari, femboy any species;</div>
            </div>
            
            <div className="text-gray-300 text-sm leading-relaxed space-y-3">
              <p>This is not finished art, the final result will be worked out, to see the finished works, you can go to my portfolio.</p>
              
              <div className="space-y-1">
                <div className="font-semibold">SB 30$ - sketch</div>
                <div>&lt;$60 - black and white shade lineart</div>
                <div>&lt;$100 - full art render nsfw</div>
                <div>&lt;$150 - full art render nsfw + your outfit</div>
                <div>AB 170$ - full art render nsfw + your outfit + futa version</div>
              </div>
              
              <p>You can put absolutely any characters here, change their emotions/their general condition. Additional elements can be added...</p>
            </div>
          </div>
        </div>
        
        {/* Right side - Bidding section */}
        <div className="w-80 border-l border-gray-700">
          <div className="p-4 space-y-4">
            
            {/* Timer */}
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="font-mono text-xl">
                {String(timeRemaining.hours).padStart(2, '0')}:
                {String(timeRemaining.minutes).padStart(2, '0')}:
                {String(timeRemaining.seconds).padStart(2, '0')}
              </span>
            </div>
            <div className="text-sm text-gray-400 mb-4">Starting Bid: $10</div>
            
            {/* Current bidders */}
            <div className="space-y-3 mb-4">
              {bidders.map((bidder, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      {bidder.avatar}
                    </div>
                    <span className="text-gray-200 text-sm">{bidder.name}</span>
                  </div>
                  <span className="text-white font-bold">{bidder.amount}</span>
                </div>
              ))}
              
              <button className="w-full text-gray-400 text-sm hover:text-white transition-colors">
                Show More... (12)
              </button>
            </div>
            
            {/* Action buttons */}
            <div className="space-y-3 mb-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition-colors flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                Buy Now: $200
              </button>
              
              <button className="w-full hover:bg-gray-600 text-white py-3 rounded font-semibold transition-colors">
                Bid
              </button>
            </div>
            
            {/* Bid Goals */}
            <div className="mb-4">
              <h3 className="font-bold text-white mb-3">Bid Goals:</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sketch:</span>
                  <span className="text-white">$20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Flat Color:</span>
                  <span className="text-white">$40</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Full Color:</span>
                  <span className="text-white">$80</span>
                </div>
              </div>
            </div>
            
            {/* Customize order */}
            <div>
              <button 
                className="w-full flex items-center justify-between text-left py-2 mb-2"
                onClick={() => setShowCustomize(!showCustomize)}
              >
                <span className="font-bold text-white">Customize Your Order</span>
                <ChevronUp className="w-4 h-4 text-gray-400" />
              </button>
              
              {showCustomize && (
                <div className="text-sm space-y-3">
                  <div>
                    <div className="text-gray-400 font-medium mb-1">Addons:</div>
                    <div className="text-gray-300 space-y-1">
                      <div>Simple Background: +$3</div>
                      <div>Animated: +10%</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 font-medium mb-1">Extras:</div>
                    <div className="text-gray-300 space-y-1">
                      <div>Extra penis: +$10</div>
                      <div>Change outfit: +5%</div>
                      <div>Nude Version: +$20</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default AuctionPlatform;