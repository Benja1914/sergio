import React from 'react';
import { Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
  onDonationsClick?: () => void;
  onInstagramClick?: () => void;
  onTwitterClick?: () => void;
  email?: string;
}

const Footer: React.FC<FooterProps> = ({
  onTermsClick,
  onPrivacyClick,
  onDonationsClick,
  onInstagramClick,
  onTwitterClick,
  email = "contact@ychauction.com"
}) => {
  return (
    <footer className="w-full bg-[#0e172c] py-4 px-4 md:px-6">
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-2 items-center justify-between text-white text-sm">
        {/* Left Section - Desktop */}
        <div className="flex items-center space-x-6 justify-center">
          <span className="text-gray-300">© All Rights Reserved</span>
          
          <button 
            onClick={onTermsClick}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Terms of use.
          </button>
          
          <button 
            onClick={onPrivacyClick}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Privacy Policy.
          </button>
          
          <button 
            onClick={onDonationsClick}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Donations
          </button>
        </div>

        {/* Right Section - Desktop */}
        <div className="flex items-center space-x-6 justify-end">
          <div className="flex items-center space-x-2">
            <span>Email:</span>
            <a 
              href={`mailto:${email}`}
              className="hover:text-gray-300 transition-colors duration-200"
            >
              {email}
            </a>
          </div>
          
          <div className="flex items-center space-x-3">
            <span>Follow Us:</span>
            
            <button 
              onClick={onInstagramClick}
              className="hover:text-gray-300 transition-colors duration-200"
            >
              <Instagram size={18} />
            </button>
            
            <button 
              onClick={onTwitterClick}
              className="hover:text-gray-300 transition-colors duration-200"
            >
              <Twitter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden text-white text-xs space-y-3">
        {/* Primera fila - Copyright y redes sociales */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300">© All Rights Reserved</span>
          
          <div className="flex items-center space-x-3">
            <span className="text-xs">Follow Us:</span>
            <button 
              onClick={onInstagramClick}
              className="hover:text-gray-300 transition-colors duration-200"
            >
              <Instagram size={16} />
            </button>
            <button 
              onClick={onTwitterClick}
              className="hover:text-gray-300 transition-colors duration-200"
            >
              <Twitter size={16} />
            </button>
          </div>
        </div>

        {/* Segunda fila - Links */}
        <div className="flex items-center justify-center space-x-4">
          <button 
            onClick={onTermsClick}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Terms
          </button>
          
          <span className="text-gray-500">|</span>
          
          <button 
            onClick={onPrivacyClick}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Privacy
          </button>
          
          <span className="text-gray-500">|</span>
          
          <button 
            onClick={onDonationsClick}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Donations
          </button>
        </div>

        {/* Tercera fila - Email */}
        <div className="text-center">
          <a 
            href={`mailto:${email}`}
            className="hover:text-gray-300 transition-colors duration-200 text-xs"
          >
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;