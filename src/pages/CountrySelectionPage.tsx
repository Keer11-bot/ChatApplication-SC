import { motion } from 'framer-motion';
import CountryCard from '../components/CountryCard';
import { countries } from '../data/countries';
import { Globe } from 'lucide-react';

const CountrySelectionPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const totalActiveUsers = countries.reduce((sum, country) => sum + country.activeUsers, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">Global Chat Rooms</h1>
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
            <Globe className="h-5 w-5 text-indigo-500" />
            <p className="text-lg">
              <span className="text-indigo-400 font-semibold">{totalActiveUsers.toLocaleString()}</span> students online across <span className="text-indigo-400 font-semibold">{countries.length}</span> countries
            </p>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose a country to connect with students and join the conversation.
            Each room is moderated and focused on educational discussions.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {countries.map((country) => (
            <CountryCard
              key={country.id}
              id={country.id}
              name={country.name}
              flag={country.flag}
              activeUsers={country.activeUsers}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CountrySelectionPage;