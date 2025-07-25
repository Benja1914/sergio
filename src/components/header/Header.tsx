import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, MessageCircle, User, Settings, BarChart3, LogOut } from 'lucide-react';
import { HiPlus } from 'react-icons/hi';
import { useRouter } from 'next/router';

interface HeaderProps {
  onNewAuction?: () => void;
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
  onProfile?: () => void;
  onDashboard?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
  userAvatar?: string;
  userName?: string;
  isLoggedIn?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onNewAuction,
  onNotificationClick,
  onMessageClick,
  onLogin,
  onRegister,
  onProfile,
  onDashboard,
  onSettings,
  onLogout,
  userAvatar = "/assets/images/profile/profile.png",
  userName = "User",
  isLoggedIn = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (callback?: () => void, route?: string) => {
    setIsDropdownOpen(false);
    if (route) {
      router.push(route);
    } else if (callback) {
      callback();
    }
  };

  return (
    <header className="w-full bg-[#0e172c]">
      <div className="mx-auto px-6 py-3">
        <div className="flex justify-center items-center md:grid md:grid-cols-2">
          <div className='flex items-center space-x-4 gap-8'>
            {/* Logo */}
            <img
              src="/assets/images/Logo.svg"
              alt="Logo"
              width={150}
              height={100}
            />
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
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
            {isLoggedIn ? (
              <>
                {/* New Auction Button - Desktop */}
                <button
                  onClick={onNewAuction}
                  className="hidden md:flex w-[200px] h-[45px] bg-[#20315D] rounded-full text-white justify-center items-center"
                >
                  <span className="text-lg mr-1">+</span>
                  <span>New Auction</span>
                </button>

                {/* New Auction Button - Mobile (solo icono +) */}
                <button
                  onClick={onNewAuction}
                  className="flex md:hidden w-[32px] h-[32px] bg-white text-[#0E172C] justify-center items-center"
                  style={{ borderRadius: '50%' }}
                >
                  <HiPlus size={18} />
                </button>

                {/* Notification Bell */}
                <button
                  onClick={onNotificationClick}
                  className="p-2 text-gray-300 hover:text-white hover:bg-[#3A4B6C] rounded-full transition-colors duration-200"
                >
                  <Bell size={20} color='white' fill='white' />
                </button>

                {/* Message Icon */}
                <button
                  onClick={onMessageClick}
                  className="p-2 text-gray-300 hover:text-white hover:bg-[#3A4B6C] rounded-full transition-colors duration-200"
                >
                  <MessageCircle size={20} fill='white' />
                </button>

                {/* User Avatar with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <div className="flex items-center">
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#3A4B6C] hover:border-[#4A5B7C] transition-colors cursor-pointer"
                      onClick={handleAvatarClick}
                    />
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#1E2A3F] border border-[#3A4B6C] rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <button
                          onClick={() => handleMenuItemClick(onProfile, '/profile')}
                          className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-[#2A3B6F] transition-colors"
                        >
                          <User size={16} className="mr-3" />
                          My Profile
                        </button>
                        <button
                          onClick={() => handleMenuItemClick(onDashboard)}
                          className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-[#2A3B6F] transition-colors"
                        >
                          <BarChart3 size={16} className="mr-3" />
                          Dashboard
                        </button>
                        <button
                          onClick={() => handleMenuItemClick(onSettings)}
                          className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-[#2A3B6F] transition-colors"
                        >
                          <Settings size={16} className="mr-3" />
                          Settings
                        </button>
                        <hr className="my-2 border-[#3A4B6C]" />
                        <button
                          onClick={() => handleMenuItemClick(onLogout)}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-[#2A3B6F] transition-colors"
                        >
                          <LogOut size={16} className="mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login Button */}
                <button
                  onClick={onLogin}
                  className="hidden md:flex px-6 py-2 text-white hover:text-gray-300 transition-colors"
                >
                  Login
                </button>

                {/* Register Button */}
                <button
                  onClick={onRegister}
                  className="hidden md:flex px-6 py-2 bg-[#20315D] rounded-full text-white hover:bg-[#2A3B6F] transition-colors"
                >
                  Crear Cuenta
                </button>

                {/* Mobile Login/Register */}
                <div className="flex md:hidden gap-2">
                  <button
                    onClick={onLogin}
                    className="px-4 py-2 text-white text-sm hover:text-gray-300 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={onRegister}
                    className="px-4 py-2 bg-[#20315D] rounded-full text-white text-sm hover:bg-[#2A3B6F] transition-colors"
                  >
                    Crear Cuenta
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;