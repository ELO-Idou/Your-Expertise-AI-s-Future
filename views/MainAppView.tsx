import React, { useState, useContext } from 'react';
import ChatInterface from '../components/ChatInterface';
import { BrainCircuitIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '../components/icons';
import { ProfileModal } from '../components/ProfileModal';
import { AuthContext } from '../contexts/AuthContext';

const MainAppView: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto flex flex-col h-[95vh] bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
          <header className="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-900/50 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <BrainCircuitIcon className="w-8 h-8 text-indigo-400" />
              <div>
                <h1 className="text-xl font-bold text-gray-100">Your Expertise, AI's Future</h1>
                <p className="text-sm text-gray-400">Turn your life experience into a valuable asset for AI labs.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                aria-label="Open user profile"
              >
                <UserCircleIcon className="w-7 h-7 text-gray-300" />
              </button>
              <button
                onClick={logout}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                aria-label="Logout"
              >
                <ArrowRightOnRectangleIcon className="w-7 h-7 text-gray-300" />
              </button>
            </div>
          </header>
          <ChatInterface />
        </div>
      </div>
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default MainAppView;
