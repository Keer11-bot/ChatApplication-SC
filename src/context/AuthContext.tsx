import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { ref, set, get, onValue, off } from 'firebase/database';
import { auth, googleProvider, database } from '../config/firebase';
import { connectSocket, disconnectSocket } from '../config/socket';

type AuthStatus = 'guest' | 'authenticated' | 'none';
type SubscriptionStatus = 'free' | 'premium';

interface AuthContextType {
  user: User | null;
  authStatus: AuthStatus;
  subscriptionStatus: SubscriptionStatus;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
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
        
        // Update online status
        const userStatusRef = ref(database, `status/${currentUser.uid}`);
        await set(userStatusRef, {
          state: 'online',
          last_changed: new Date().toISOString()
        });
      } else {
        setAuthStatus('none');
        setSubscriptionStatus('free');
        disconnectSocket();
      }
    });

    return () => {
      unsubscribe();
      if (user) {
        const userStatusRef = ref(database, `status/${user.uid}`);
        set(userStatusRef, {
          state: 'offline',
          last_changed: new Date().toISOString()
        });
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      // Check if username exists
      const usernameRef = ref(database, `usernames/${username}`);
      const snapshot = await get(usernameRef);
      
      if (snapshot.exists()) {
        throw new Error('Username already taken');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save username
      await set(usernameRef, userCredential.user.uid);
      
      // Update profile
      await updateProfile(userCredential.user, {
        displayName: username
      });
      
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const username = result.user.email?.split('@')[0] || '';
      
      // Save username if it doesn't exist
      const usernameRef = ref(database, `usernames/${username}`);
      const snapshot = await get(usernameRef);
      
      if (!snapshot.exists()) {
        await set(usernameRef, result.user.uid);
      }
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
      if (user) {
        const userStatusRef = ref(database, `status/${user.uid}`);
        await set(userStatusRef, {
          state: 'offline',
          last_changed: new Date().toISOString()
        });
      }
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