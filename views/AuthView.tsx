import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Route } from '../App';
import { BrainCircuitIcon } from '../components/icons';

interface AuthViewProps {
  navigate: (route: Route) => void;
}

type AuthMode = 'login' | 'signup';

const AuthView: React.FC<AuthViewProps> = ({ navigate }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      // On success, the main App component will automatically render the main view
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="inline-block">
                <BrainCircuitIcon className="w-12 h-12 text-indigo-400 mx-auto" />
            </a>
            <h1 className="text-2xl font-bold mt-4">Your Expertise, AI's Future</h1>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8">
            <div className="flex border-b border-gray-600 mb-6">
                <button 
                    onClick={() => setMode('login')}
                    className={`flex-1 py-2 font-semibold transition-colors ${mode === 'login' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400'}`}
                >
                    Login
                </button>
                 <button 
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-2 font-semibold transition-colors ${mode === 'signup' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400'}`}
                >
                    Sign Up
                </button>
            </div>
          
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-300">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                    >
                        {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Create Account')}
                    </button>
                </div>
            </form>
             <p className="mt-6 text-xs text-gray-500 text-center">
                By continuing, you agree to our{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/terms'); }} className="underline hover:text-indigo-400">Terms of Service</a> and{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }} className="underline hover:text-indigo-400">Privacy Policy</a>.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
