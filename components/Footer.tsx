import React from 'react';
import { Route } from '../App';
import { BrainCircuitIcon } from './icons';

interface FooterProps {
  navigate: (route: Route) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/faq'); }} className="hover:text-white">FAQ</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }} className="hover:text-white">Privacy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/terms'); }} className="hover:text-white">Terms</a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base">
              &copy; {new Date().getFullYear()} Your Expertise, AI's Future. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
