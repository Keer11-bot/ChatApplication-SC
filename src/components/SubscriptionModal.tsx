import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryId: string;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, countryId }) => {
  const { subscribe } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = () => {
    subscribe();
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

  const benefits = [
    "Send unlimited messages in all chat rooms",
    "Access to premium study resources",
    "Direct messaging with other members",
    "Ad-free experience",
    "Priority customer support"
  ];

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
          <h2 className="text-xl font-bold text-white">Upgrade Your Experience</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-indigo-900 bg-opacity-30 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-indigo-300 mb-2">StudentConnect Premium</h3>
          <p className="text-2xl font-bold text-white mb-1">₹55<span className="text-sm text-gray-300">/month</span></p>
          <p className="text-gray-300 text-sm">Unlock all features and connect without limits</p>
        </div>

        <div className="mb-6">
          <h4 className="text-white font-medium mb-3">Premium Benefits:</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.button
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
          onClick={handleSubscribe}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Subscribe Now
        </motion.button>
        
        <p className="mt-4 text-xs text-gray-400 text-center">
          Cancel anytime. No long-term commitment required.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SubscriptionModal;