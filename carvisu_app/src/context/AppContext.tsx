import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, Generation } from '../types';
import * as authService from '../service/auth.service';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  updateCredits: (amount: number) => void;
  addGeneration: (generation: Generation) => void;
  generations: Generation[];
}

const STORAGE_KEY = 'carvisu.auth';

interface StoredAuth {
  user: User;
  token: string;
  refreshToken: string;
}

const loadStoredAuth = (): StoredAuth | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredAuth) : null;
  } catch {
    return null;
  }
};

const persistAuth = (auth: StoredAuth) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
};

const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => loadStoredAuth()?.user ?? null);
  const [generations, setGenerations] = useState<Generation[]>([]);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    const mappedUser = authService.mapApiUser(data.user);
    persistAuth({
      user: mappedUser,
      token: data.token,
      refreshToken: data.refresh_token,
    });
    setUser(mappedUser);
  };

  const signup = async (email: string, password: string) => {
    await authService.register({ email, password });
    await login(email, password);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  const updateCredits = (amount: number) => {
    if (user) {
      const updated = { ...user, credits: user.credits + amount };
      setUser(updated);
      const stored = loadStoredAuth();
      if (stored) persistAuth({ ...stored, user: updated });
    }
  };

  const addGeneration = (generation: Generation) => {
    setGenerations([generation, ...generations]);
    updateCredits(-generation.creditsUsed);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
        signup,
        updateCredits,
        addGeneration,
        generations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
