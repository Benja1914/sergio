import React from 'react';
import { Search, Bell, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onNewAuction?: () => void;
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
  userAvatar?: string;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({
  onNewAuction,
  onNotificationClick,
  onMessageClick,
  userAvatar = "/assets/images/profile/profile.png",
  userName = "User"
}) => {
  return (
    <header className="w-full bg-[#0e172c]">
      <div className="mx-auto px-6 py-3">
        <div className="grid grid-cols-2">
          <div className='flex items-center space-x-4 gap-8'>
            {/* Logo */}
            <img
              src="/assets/images/logo.svg"
              alt="Logo"
              width={82}
              height={48}
              className="h-auto"
            />
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users"
                  className="w-full bg-[#1E2A3F] border border-[#A4A4A4] rounded-full px-4 py-2.5 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#4A5B7C] transition-colors"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                  <Search size={18} />
                </button>
              </div>
            </div>
          </div>




          {/* Right Section */}
          <div className="flex items-center justify-end px-4 gap-[20px]">
            {/* New Auction Button */}
            <button
              onClick={onNewAuction}
              className="w-[200px] h-[45px] bg-[#20315D] rounded-full text-white flex justify-center items-center"
            >
              <span className="text-lg mr-1">+</span>
              <span>New Auction</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onNotificationClick}
              className="p-2 text-gray-300 hover:text-white hover:bg-[#3A4B6C] rounded-full transition-colors duration-200"
            >
              <Bell size={20} color='white' fill='white'/>
            </button>

            {/* Message Icon */}
            <button
              onClick={onMessageClick}
              className="p-2 text-gray-300 hover:text-white hover:bg-[#3A4B6C] rounded-full transition-colors duration-200"
            >
              <MessageCircle size={20} fill='white'/>
            </button>

            {/* User Avatar */}
            <div className="flex items-center">
              <img
                src={userAvatar}
                alt={userName}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#3A4B6C] hover:border-[#4A5B7C] transition-colors cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;