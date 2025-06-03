import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, googleProvider, database } from '../config/firebase';
import { connectSocket, disconnectSocket } from '../config/socket';

type AuthStatus = 'guest' | 'authenticated' | 'none';
type SubscriptionStatus = 'free' | 'premium';

interface AuthContextType {
  user: User | null;
  authStatus: AuthStatus;
  subscriptionStatus: SubscriptionStatus;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsGuest: () => void;
  logout: () => Promise<void>;
  subscribe: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('none');
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('free');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setAuthStatus('authenticated');
        // Connect socket
        connectSocket(currentUser.uid);
        // Get subscription status
        const subscriptionRef = ref(database, `subscriptions/${currentUser.uid}`);
        const snapshot = await get(subscriptionRef);
        if (snapshot.exists()) {
          setSubscriptionStatus(snapshot.val().status);
        }
      } else {
        setAuthStatus('none');
        setSubscriptionStatus('free');
        disconnectSocket();
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const loginAsGuest = () => {
    setAuthStatus('guest');
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setAuthStatus('none');
      setSubscriptionStatus('free');
      disconnectSocket();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const subscribe = async () => {
    if (!user) return;
    
    try {
      await set(ref(database, `subscriptions/${user.uid}`), {
        status: 'premium',
        updatedAt: new Date().toISOString()
      });
      setSubscriptionStatus('premium');
    } catch (error) {
      console.error('Subscription error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authStatus,
        subscriptionStatus,
        login,
        signUp,
        loginWithGoogle,
        loginAsGuest,
        logout,
        subscribe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};