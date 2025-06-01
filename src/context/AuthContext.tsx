import React, { createContext, useState, useContext } from 'react';

type AuthStatus = 'guest' | 'authenticated' | 'none';
type SubscriptionStatus = 'free' | 'premium';

interface AuthContextType {
  authStatus: AuthStatus;
  subscriptionStatus: SubscriptionStatus;
  login: () => void;
  signUp: () => void;
  loginAsGuest: () => void;
  logout: () => void;
  subscribe: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('none');
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('free');

  const login = () => {
    setAuthStatus('authenticated');
  };

  const signUp = () => {
    setAuthStatus('authenticated');
  };

  const loginAsGuest = () => {
    setAuthStatus('guest');
  };

  const logout = () => {
    setAuthStatus('none');
    setSubscriptionStatus('free');
  };

  const subscribe = () => {
    setSubscriptionStatus('premium');
  };

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        subscriptionStatus,
        login,
        signUp,
        loginAsGuest,
        logout,
        subscribe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};