import React from 'react';
import { Route } from '../App';
import Footer from '../components/Footer';
import { BrainCircuitIcon } from '../components/icons';

interface FAQViewProps {
  navigate: (route: Route) => void;
}

const faqs = [
    {
        q: "What exactly is a 'domain expert'?",
        a: "A domain expert is anyone with deep knowledge or experience in a specific field, regardless of formal education. This could be a nurse with 15 years of clinical experience, a lawyer specializing in intellectual property, a master plumber, a seasoned HR manager, a financial analyst, or even a passionate hobbyist who is an expert on a specific historical period. If you know a subject inside and out, you're a domain expert."
    },
    {
        q: "Why do AI labs need non-technical experts?",
        a: "AI models learn from data. If they only learn from generic internet data, they make mistakes, show biases, and lack true understanding. AI labs need your domain expertise to provide high-quality, nuanced, and accurate data to train their models. You help them create 'expert AI' that is safe, helpful, and reliable in specific areas."
    },
    {
        q: "What does an 'AI Trainer' or 'RLHF Specialist' actually do?",
        a: "The work typically involves two main tasks: 1) **Writing Examples:** You create high-quality, 'gold standard' examples of text in your domain (e.g., writing the perfect, empathetic customer support response). 2) **Ranking and Reviewing:** You are shown multiple AI-generated responses to a prompt and use your expertise to rank them from best to worst. This feedback teaches a 'reward model' to understand what quality looks like in your field."
    },
    {
        q: "Do I need any special equipment or software?",
        a: "No. The vast majority of these roles are web-based. All you need is a computer, a reliable internet connection, and your brain. The platforms provide all the necessary tools and interfaces for you to complete the tasks."
    },
    {
        q: "How much time do I need to commit?",
        a: "This is one of the biggest benefits. Most platforms offer flexible, freelance work. You can often choose your own hours and work as much or as little as you want, making it an excellent option for supplemental income or part-time engagement."
    },
    {
        q: "Is my data and profile information secure?",
        a: "We take your privacy seriously. All personal information is handled securely. When you work on AI training platforms, you are typically bound by a Non-Disclosure Agreement (NDA) to protect the confidentiality of the AI lab's projects. For more details, please review our Privacy Policy."
    },
    {
        q: "How do I get paid?",
        a: "Each platform has its own payment system. Most use common methods like direct deposit or PayPal. Payments are typically made on a regular schedule (e.g., weekly or monthly) based on the hours you've worked or the tasks you've completed."
    }
];


const FAQView: React.FC<FAQViewProps> = ({ navigate }) => {
  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen">
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

      <main className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-extrabold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-400 text-center mb-12">Answers to common questions about leveraging your expertise for AI.</p>
        <div className="space-y-8">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-semibold text-indigo-400 mb-2">{faq.q}</h3>
                    <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                </div>
            ))}
        </div>
      </main>

      <Footer navigate={navigate} />
    </div>
  );
};

export default FAQView;
