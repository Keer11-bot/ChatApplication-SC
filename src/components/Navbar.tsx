import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MessageCircle, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authStatus, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/countries');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center">
                <MessageCircle className="h-8 w-8 text-indigo-500" />
                <span className="ml-2 text-xl font-bold text-white">StudentConnect</span>
              </Link>
            </motion.div>
          </div>
          
          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex md:items-center md:space-x-4"
            initial="hidden"
            animate="visible"
            variants={navAnimation}
          >
            <motion.div variants={itemAnimation}>
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Home
              </Link>
            </motion.div>
            <motion.div variants={itemAnimation}>
              <button
                onClick={handleChatClick}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
              >
                <MessageCircle className="mr-1 h-4 w-4" /> Chat
              </button>
            </motion.div>
            {authStatus === 'authenticated' || authStatus === 'guest' ? (
              <motion.div variants={itemAnimation}>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                >
                  <LogOut className="mr-1 h-4 w-4" /> Logout
                </button>
              </motion.div>
            ) : (
              <motion.div variants={itemAnimation}>
                <Link
                  to="/countries"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                >
                  <LogIn className="mr-1 h-4 w-4" /> Login/Sign Up
                </Link>
              </motion.div>
            )}
            {authStatus === 'authenticated' && (
              <motion.div variants={itemAnimation}>
                <div className="bg-gray-700 px-3 py-2 rounded-md">
                  <User className="h-5 w-5 text-indigo-400" />
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <button
            onClick={handleChatClick}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
          >
            <MessageCircle className="mr-2 h-5 w-5" /> Chat
          </button>
          {authStatus === 'authenticated' || authStatus === 'guest' ? (
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
            >
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </button>
          ) : (
            <Link
              to="/countries"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="mr-2 h-5 w-5" /> Login/Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;