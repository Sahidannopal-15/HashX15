import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative w-full bg-black border-t border-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            Built with 
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            by Hash-X15 Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;