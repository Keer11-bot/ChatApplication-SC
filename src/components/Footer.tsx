import { MessageCircle, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start items-center mb-6 md:mb-0">
            <MessageCircle className="h-6 w-6 text-indigo-500" />
            <span className="ml-2 text-xl font-bold">StudentConnect</span>
          </div>
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} StudentConnect. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center md:text-right">
              <Link to="/" className="text-sm text-gray-400 hover:text-white">
                Home
              </Link>
              <Link to="/countries" className="text-sm text-gray-400 hover:text-white">
                Chat Rooms
              </Link>
              <Link to="/subscribe" className="text-sm text-gray-400 hover:text-white">
                Subscription
              </Link>
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;