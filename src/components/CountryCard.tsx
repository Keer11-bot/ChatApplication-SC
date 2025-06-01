import { useState } from 'react';
import AuthModal from './AuthModal';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface CountryCardProps {
  id: string;
  name: string;
  flag: string;
  activeUsers: number;
}

const CountryCard = ({ id, name, flag, activeUsers }: CountryCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <motion.div 
        className="country-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img 
            src={flag} 
            alt={`${name} flag`} 
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between p-4">
            <span className="text-white font-medium text-lg">{name}</span>
            <div className="flex items-center bg-black/50 px-2 py-1 rounded-full">
              <Users className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">{activeUsers}</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded-b-lg">
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition duration-300 font-medium flex items-center justify-center"
          >
            <span>Join Chat Room</span>
          </button>
        </div>
      </motion.div>

      <AuthModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        countryId={id} 
      />
    </>
  );
};

export default CountryCard;