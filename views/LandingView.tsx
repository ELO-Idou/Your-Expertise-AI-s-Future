import React from 'react';
import { Route } from '../App';
import { BrainCircuitIcon } from '../components/icons';
import Footer from '../components/Footer';

interface LandingViewProps {
  navigate: (route: Route) => void;
}

const LandingView: React.FC<LandingViewProps> = ({ navigate }) => {
  return (
    <div className="bg-gray-900 text-white font-sans">
      <header className="p-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <BrainCircuitIcon className="w-8 h-8 text-indigo-400" />
          <h1 className="text-xl font-bold text-gray-100">Your Expertise, AI's Future</h1>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors"
        >
          Login / Sign Up
        </button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="text-center py-20 px-4 bg-gray-800/50">
          <h2 className="text-5xl font-extrabold text-white mb-4">Your Knowledge is AI's Missing Piece.</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            You don't need to be a coder to shape the future of artificial intelligence. AI labs need your real-world experience to build smarter, safer, and more useful models. We'll show you how.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
          >
            Start Your Journey
          </button>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Turn Your Experience Into Opportunity in 3 Steps</h3>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                    <div className="text-indigo-400 font-bold text-6xl mb-4">1</div>
                    <h4 className="text-xl font-semibold mb-2">Define Your Expertise</h4>
                    <p className="text-gray-400">Our AI coach helps you structure your unique knowledge—from your job, hobbies, or life experience—into a clear, compelling profile.</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                    <div className="text-indigo-400 font-bold text-6xl mb-4">2</div>
                    <h4 className="text-xl font-semibold mb-2">Get Your Contribution Plan</h4>
                    <p className="text-gray-400">Receive a personalized plan that explains exactly how your skills are vital for AI training tasks like RLHF and data annotation.</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                    <div className="text-indigo-400 font-bold text-6xl mb-4">3</div>
                    <h4 className="text-xl font-semibold mb-2">Find Paid Opportunities</h4>
                    <p className="text-gray-400">Get recommendations for top platforms like Mercor, Outlier.ai, and Scale AI where you can apply for paid roles and start contributing.</p>
                </div>
            </div>
        </section>
        
        {/* FAQ Mini Section */}
        <section className="bg-gray-800/50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-12">Common Questions</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-semibold text-indigo-400">Do I need a technical background?</h4>
                        <p className="text-gray-300 mt-1">Absolutely not. This platform is designed specifically for domain experts without a background in programming. Your value is your real-world knowledge, not your coding skills.</p>
                    </div>
                     <div>
                        <h4 className="text-xl font-semibold text-indigo-400">What is RLHF?</h4>
                        <p className="text-gray-300 mt-1">RLHF (Reinforcement Learning from Human Feedback) is a process where experts teach AI by ranking its responses. It's a key area where your judgment and expertise are essential to guide the AI's learning.</p>
                    </div>
                     <div>
                        <h4 className="text-xl font-semibold text-indigo-400">How much can I earn?</h4>
                        <p className="text-gray-300 mt-1">Compensation varies by platform and the specialization of your expertise. Roles on platforms like Outlier.ai can pay from $20 to over $100 per hour for highly specialized knowledge.</p>
                    </div>
                </div>
                 <div className="text-center mt-10">
                    <button onClick={() => navigate('/faq')} className="text-indigo-400 font-semibold hover:underline">
                        See More FAQs
                    </button>
                </div>
            </div>
        </section>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

export default LandingView;
