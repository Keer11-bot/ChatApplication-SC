import { motion } from 'framer-motion';
import { Message } from '../data/chatData';

interface ChatMessageProps {
  message: Message;
  index: number;
}

const ChatMessage = ({ message, index }: ChatMessageProps) => {
  const messageVariants = {
    hidden: { opacity: 0, x: message.isBot ? -20 : 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-4`}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col max-w-[75%]">
        <div className={`flex items-center mb-1 ${message.isBot ? '' : 'justify-end'}`}>
          <span className="text-xs text-gray-400 mr-2">{message.sender}</span>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
        </div>
        <div
          className={`message-bubble ${message.isBot ? 'received' : 'sent'}`}
        >
          {message.content}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;