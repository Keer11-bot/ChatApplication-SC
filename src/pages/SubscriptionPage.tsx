import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const { subscribe } = useAuth();

  const handleSubscribe = () => {
    subscribe();
    navigate('/countries');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Basic access to chat rooms",
      features: [
        { text: "Read-only access to all chat rooms", included: true },
        { text: "View country-specific discussions", included: true },
        { text: "Limited profile customization", included: true },
        { text: "Send messages in chat rooms", included: false },
        { text: "Direct messaging with other users", included: false },
        { text: "Ad-free experience", included: false },
        { text: "Access to premium study resources", included: false },
        { text: "Priority support", included: false }
      ],
      buttonText: "Current Plan",
      isPremium: false
    },
    {
      name: "Premium",
      price: "₹55",
      period: "per month",
      description: "Full access to all features",
      features: [
        { text: "Read-only access to all chat rooms", included: true },
        { text: "View country-specific discussions", included: true },
        { text: "Full profile customization", included: true },
        { text: "Send unlimited messages in chat rooms", included: true },
        { text: "Direct messaging with other users", included: true },
        { text: "Ad-free experience", included: true },
        { text: "Access to premium study resources", included: true },
        { text: "Priority support", included: true }
      ],
      buttonText: "Subscribe Now",
      isPremium: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the subscription that works best for you and start connecting with students worldwide.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`rounded-lg overflow-hidden ${
                plan.isPremium 
                  ? 'bg-gradient-to-b from-indigo-900 to-indigo-800 border-2 border-indigo-500' 
                  : 'bg-gray-800'
              }`}
              variants={itemVariants}
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 text-sm"> {plan.period}</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "text-gray-300" : "text-gray-500"}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  className={`w-full py-3 px-4 rounded-lg font-medium ${
                    plan.isPremium
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-gray-700 text-gray-300 cursor-not-allowed'
                  }`}
                  onClick={plan.isPremium ? handleSubscribe : undefined}
                  whileHover={plan.isPremium ? { scale: 1.03 } : {}}
                  whileTap={plan.isPremium ? { scale: 0.98 } : {}}
                  disabled={!plan.isPremium}
                >
                  {plan.buttonText}
                </motion.button>
              </div>
              
              {plan.isPremium && (
                <div className="bg-indigo-700 py-2 text-center">
                  <span className="text-sm font-medium">Recommended</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-gray-400 mb-4">
            All plans include secure payments and a 30-day money-back guarantee.
          </p>
          <p className="text-sm text-gray-500">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionPage;