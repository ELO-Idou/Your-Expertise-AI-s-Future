import React from 'react';
import { Route } from '../App';
import Footer from '../components/Footer';
import { BrainCircuitIcon } from '../components/icons';

interface PrivacyPolicyViewProps {
  navigate: (route: Route) => void;
}

const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ navigate }) => {
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
        <h1 className="text-white">Privacy Policy</h1>
        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
        
        <h2 className="text-white">Interpretation and Definitions</h2>
        <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
        
        <h2 className="text-white">Collecting and Using Your Personal Data</h2>
        <h3>Types of Data Collected</h3>
        <h4>Personal Data</h4>
        <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to: Email address, Usage Data.</p>
        <h4>Usage Data</h4>
        <p>Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
        
        <h2 className="text-white">Use of Your Personal Data</h2>
        <p>The Company may use Personal Data for the following purposes:</p>
        <ul>
            <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
            <li>To manage Your Account: to manage Your registration as a user of the Service.</li>
            <li>To contact You: To contact You by email regarding updates or informative communications related to the functionalities.</li>
            <li>To manage Your requests: To attend and manage Your requests to Us.</li>
        </ul>

        <h2 className="text-white">Security of Your Personal Data</h2>
        <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security. Our simulated authentication system uses local storage for demonstration purposes; a production application would employ robust, server-side security measures.</p>

        <h2 className="text-white">Changes to this Privacy Policy</h2>
        <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
        
        <h2 className="text-white">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, You can contact us by email: contact@example.com</p>
      </main>

      <Footer navigate={navigate} />
    </div>
  );
};

export default PrivacyPolicyView;
