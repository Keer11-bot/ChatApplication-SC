import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Users, Globe, Zap, CheckCircle, ShieldCheck, Clock } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      icon: <Globe className="h-12 w-12 text-indigo-500" />,
      title: "Global Connections",
      description: "Connect with students from countries all around the world."
    },
    {
      icon: <MessageCircle className="h-12 w-12 text-indigo-500" />,
      title: "Real-time Chat",
      description: "Instant messaging with other students interested in the same topics."
    },
    {
      icon: <Users className="h-12 w-12 text-indigo-500" />,
      title: "Study Groups",
      description: "Join country-specific chat rooms for focused discussions."
    },
    {
      icon: <Zap className="h-12 w-12 text-indigo-500" />,
      title: "Fast & Reliable",
      description: "Our platform ensures your messages are delivered instantly."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      country: "United States",
      content: "StudentConnect helped me find study partners from my university even before I arrived on campus. This platform is incredible!"
    },
    {
      name: "Rahul Patel",
      country: "India",
      content: "I got to chat with students already attending the university I applied to. Their insights were invaluable for my preparation."
    },
    {
      name: "Emma Watson",
      country: "United Kingdom",
      content: "Made so many international friends through StudentConnect. Now I have places to visit all around the world!"
    }
  ];

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-gray-900/90"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5553050/pexels-photo-5553050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Connect with students worldwide
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join our global student community and chat with peers from around the world. Share experiences, get advice, and make international connections.
            </motion.p>
            <motion.div 
              className="space-x-4 flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.button 
                className="btn btn-primary flex items-center"
                onClick={() => navigate('/countries')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chatting
              </motion.button>
              <motion.button 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" } }}
          >
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        className="section bg-gradient-to-b from-gray-900 to-gray-800"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose StudentConnect?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our platform offers unique features designed specifically for students looking to connect globally.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Countries Preview Section */}
      <motion.section 
        className="section bg-gradient-to-b from-gray-800 to-gray-900"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect Across Borders</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Join chat rooms dedicated to specific countries and connect with local students.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            variants={containerVariants}
          >
            {['UK', 'USA', 'Canada', 'Australia', 'Germany', 'France'].map((country, index) => (
              <motion.div 
                key={index}
                className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors duration-300 text-center p-4"
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <span className="text-lg font-medium">{country}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-10 text-center"
            variants={itemVariants}
          >
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/countries')}
            >
              View All Countries
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="section bg-gradient-to-b from-gray-900 to-gray-800"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Stories</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Hear from students who have connected through our platform.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-800 rounded-lg p-6 shadow-lg"
                variants={itemVariants}
              >
                <div className="mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.country}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Subscription Section */}
      <motion.section 
        className="section bg-gradient-to-b from-gray-800 to-indigo-900"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container-custom">
          <div className="lg:flex items-center justify-between">
            <motion.div className="lg:w-1/2 mb-10 lg:mb-0" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Upgrade to Premium</h2>
              <p className="text-gray-300 mb-6">Get full access to all chat rooms and advanced features with our premium subscription.</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited messaging in all country rooms",
                  "Access to exclusive study resources",
                  "Direct messaging with other members",
                  "Ad-free experience",
                  "Priority support"
                ].map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.button 
                className="btn btn-primary"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/subscribe')}
              >
                Get Premium - ₹55/month
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="lg:w-2/5"
              variants={itemVariants}
            >
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-6 border border-indigo-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Premium Plan</h3>
                  <span className="bg-indigo-600 text-white text-xs font-bold py-1 px-2 rounded">MOST POPULAR</span>
                </div>
                <div className="mb-6">
                  <p className="text-3xl font-bold">₹55<span className="text-gray-400 text-sm">/month</span></p>
                  <p className="text-gray-400 text-sm">Billed monthly, cancel anytime</p>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    "All Countries Access",
                    "Unlimited Messaging",
                    "Study Resources",
                    "No Ads",
                    "Priority Support"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <button 
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition duration-300 font-medium"
                  onClick={() => navigate('/subscribe')}
                >
                  Subscribe Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call To Action */}
      <motion.section 
        className="section bg-indigo-900"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container-custom text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Ready to Connect with Students Worldwide?
          </motion.h2>
          <motion.p 
            className="text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join thousands of students already using StudentConnect to make global connections and share knowledge.
          </motion.p>
          <motion.button 
            className="btn btn-primary"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/countries')}
          >
            Get Started Now
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;