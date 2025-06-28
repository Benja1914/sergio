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
    <footer className="w-full bg-[#0e172c] py-4 px-6">
        <div className="grid grid-cols-2 items-center justify-between text-white text-sm">
          {/* Left Section */}
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

          {/* Right Section */}
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
    </footer>
  );
};

export default Footer;