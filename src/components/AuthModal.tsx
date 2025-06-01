import React from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryId: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, countryId }) => {
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleLoginOrSignup = () => {
    login();
    onClose();
    navigate(`/chat/${countryId}`);
  };

  const handleGuestAccess = () => {
    loginAsGuest();
    onClose();
    navigate(`/chat/${countryId}`);
  };

  if (!isOpen) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
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
          <h2 className="text-xl font-bold text-white">Access Chat Room</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 mb-4">Choose how you would like to access the chat room:</p>
        </div>

        <div className="space-y-4">
          <motion.button
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center justify-center"
            onClick={handleLoginOrSignup}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Login / Sign Up
          </motion.button>

          <motion.button
            className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium flex items-center justify-center"
            onClick={handleGuestAccess}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Continue as Guest
          </motion.button>
        </div>
        
        <p className="mt-4 text-xs text-gray-400 text-center">
          Guest access provides limited functionality. Sign up for full access.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;