import React from 'react';
import { Route } from '../App';
import Footer from '../components/Footer';
import { BrainCircuitIcon } from '../components/icons';

interface TermsOfServiceViewProps {
  navigate: (route: Route) => void;
}

const TermsOfServiceView: React.FC<TermsOfServiceViewProps> = ({ navigate }) => {
  return (
    <div className="bg-gray-900 text-gray-300 font-sans min-h-screen">
       <header className="p-4 flex items-center justify-between border-b border-gray-800 sticky top-0 bg-gray-900/80 backdrop-blur-md z-10">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center space-x-3">
            <BrainCircuitIcon className="w-8 h-8 text-indigo-400" />
            <h1 className="text-xl font-bold text-gray-100">Your Expertise, AI's Future</h1>
            </a>
            <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors"
            >
            Login / Sign Up
            </button>
      </header>
      
      <main className="max-w-4xl mx-auto py-16 px-4 prose prose-invert prose-lg">
        <h1 className="text-white">Terms of Service</h1>
        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>Please read these terms and conditions carefully before using Our Service.</p>
        
        <h2 className="text-white">Acknowledgment</h2>
        <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
        <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
        
        <h2 className="text-white">User Accounts</h2>
        <p>When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.</p>
        <p>You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password. This is a demonstration application and does not implement production-level security for passwords.</p>
        
        <h2 className="text-white">Intellectual Property</h2>
        <p>The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors.</p>

        <h2 className="text-white">Termination</h2>
        <p>We may terminate or suspend Your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>

        <h2 className="text-white">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
        <p>The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. This service is for demonstration purposes only.</p>

        <h2 className="text-white">Governing Law</h2>
        <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.</p>
        
        <h2 className="text-white">Contact Us</h2>
        <p>If you have any questions about these Terms, You can contact us by email: contact@example.com</p>
      </main>

      <Footer navigate={navigate} />
    </div>
  );
};

export default TermsOfServiceView;
