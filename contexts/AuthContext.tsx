import React, { createContext, useState, useEffect } from 'react';
import { User, UserProfile } from '../types';

// In a real application, this would be a secure, HTTP-only cookie or a token from an auth provider.
// We use localStorage for this simulation.
const USER_STORAGE_KEY = 'ai_expert_user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (profile: UserProfile) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session on component mount
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password_DO_NOT_USE: string): Promise<void> => {
    // --- SECURITY NOTE ---
    // This is a MOCK login. In a real app, you would send the email and password
    // to a secure backend endpoint. The backend would verify the credentials
    // against a hashed password in the database and return a JWT token.
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate network delay
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          if (parsedUser.email === email) {
            setUser(parsedUser);
            resolve();
            return;
          }
        }
        reject(new Error("No account found with this email, please sign up."));
      }, 500);
    });
  };

  const signup = async (email: string, password_DO_NOT_USE: string): Promise<void> => {
    // --- SECURITY NOTE ---
    // This is a MOCK signup. In a real app, you would send the email and password
    // to a secure backend endpoint. The backend would hash the password
    // using an algorithm like bcrypt before storing it in the database.
     return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate network delay
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser && JSON.parse(storedUser).email === email) {
            reject(new Error("An account with this email already exists."));
            return;
        }

        const newUser: User = {
          id: `user_${Date.now()}`,
          email: email,
          profile: {
            professionalBackground: '',
            domainExpertise: '',
            targetRoles: [],
            careerAspirations: '',
          },
        };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
        setUser(newUser);
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const updateUserProfile = async (profile: UserProfile): Promise<void> => {
    // --- NOTE ---
    // In a real app, this would be a PATCH request to a secure backend endpoint.
    return new Promise((resolve) => {
      if (user) {
        const updatedUser = { ...user, profile };
        setUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
        resolve();
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
