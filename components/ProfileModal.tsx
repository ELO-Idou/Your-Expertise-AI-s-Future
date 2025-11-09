import React, { useState, useEffect, useContext } from 'react';
import { UserProfile } from '../types';
import { AuthContext } from '../contexts/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile>(user!.profile);

  useEffect(() => {
    if (user) {
      setProfile(user.profile);
    }
  }, [user, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, targetRoles: e.target.value.split(',').map(r => r.trim()) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile(profile);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 border border-gray-700 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Your Expert Profile</h2>
        <p className="text-gray-400 mb-6">This information helps the AI understand your unique background, allowing it to provide tailored guidance on how you can contribute to AI development.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="professionalBackground" className="block text-sm font-medium text-gray-300 mb-2">
              Professional Background or Experience Summary
            </label>
            <textarea
              id="professionalBackground"
              name="professionalBackground"
              rows={4}
              value={profile.professionalBackground}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="e.g., '10 years as a pediatric nurse', 'Lifelong hobbyist photographer specializing in wildlife', 'Software developer with expertise in financial systems'."
            />
          </div>

          <div>
            <label htmlFor="domainExpertise" className="block text-sm font-medium text-gray-300 mb-2">
              Core Domain Expertise
            </label>
            <textarea
              id="domainExpertise"
              name="domainExpertise"
              rows={4}
              value={profile.domainExpertise}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Describe your work, hobbies, or life experience. Think about times you've had to write a perfect example, create clear guidelines, or judge the quality of something based on your expertise. No formal titles needed!"
            />
          </div>

          <div>
            <label htmlFor="targetRoles" className="block text-sm font-medium text-gray-300 mb-2">
              Potential AI Lab Roles (comma-separated)
            </label>
            <input
              id="targetRoles"
              name="targetRoles"
              type="text"
              value={profile.targetRoles.join(', ')}
              onChange={handleRolesChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="e.g., RLHF Trainer, AI Content Specialist, Data Annotator"
            />
          </div>
          
          <div>
            <label htmlFor="careerAspirations" className="block text-sm font-medium text-gray-300 mb-2">
              Career Aspirations in AI
            </label>
            <textarea
              id="careerAspirations"
              name="careerAspirations"
              rows={3}
              value={profile.careerAspirations}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="e.g., 'Looking to transition into a full-time AI role', 'Interested in freelance opportunities', 'Curious to learn more about the field'."
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-5 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
      {/* A simple animation for modal appearance */}
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
