import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../config/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryId: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, countryId }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [suggestedUsernames, setSuggestedUsernames] = useState<string[]>([]);
  const { login, signUp, loginWithGoogle, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const checkUsername = async (username: string) => {
    if (!username) return;
    
    const usernameRef = ref(database, `usernames/${username}`);
    const snapshot = await get(usernameRef);
    
    if (snapshot.exists()) {
      setUsernameError('Username already taken');
      generateSuggestedUsernames(username);
    } else {
      setUsernameError('');
      setSuggestedUsernames([]);
    }
  };

  const generateSuggestedUsernames = (baseUsername: string) => {
    const suggestions = [
      `${baseUsername}${Math.floor(Math.random() * 1000)}`,
      `${baseUsername}_${Math.floor(Math.random() * 100)}`,
      `${baseUsername}${new Date().getFullYear()}`,
    ];
    setSuggestedUsernames(suggestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp && usernameError) {
      return;
    }

    try {
      if (isSignUp) {
        await signUp(email, password, username);
      } else {
        await login(email, password);
      }
      onClose();
      navigate(`/chat/${countryId}`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
      navigate(`/chat/${countryId}`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGuestAccess = () => {
    loginAsGuest();
    onClose();
    navigate(`/chat/${countryId}`);
  };

  useEffect(() => {
    if (username) {
      const debounceTimer = setTimeout(() => {
        checkUsername(username);
      }, 500);

      return () => clearTimeout(debounceTimer);
    }
  }, [username]);

  if (!isOpen) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      onClick={onClose}
    >
      <motion.div 
        className="bg-gray-800 rounded-lg p-6 shadow-xl w-full max-w-md"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400"
                required
              />
              {usernameError && (
                <div className="mt-2">
                  <p className="text-red-400 text-sm mb-2">{usernameError}</p>
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Suggested usernames:</p>
                    {suggestedUsernames.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setUsername(suggestion)}
                        className="block w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-white"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-300"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="my-4 flex items-center">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-3 text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg transition duration-300 mb-3"
        >
          Continue with Google
        </button>

        <button
          onClick={handleGuestAccess}
          className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-300"
        >
          Continue as Guest
        </button>

        <p className="mt-4 text-center text-gray-400">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-400 hover:text-indigo-300"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;