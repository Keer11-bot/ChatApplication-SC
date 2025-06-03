import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Lock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { chatRooms } from '../data/chatData';
import ChatMessage from '../components/ChatMessage';
import SubscriptionModal from '../components/SubscriptionModal';
import { countries } from '../data/countries';
import { useChat } from '../hooks/useChat';

const ChatRoomPage = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();
  const { authStatus, subscriptionStatus } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const [currentRoom, setCurrentRoom] = useState(`${countryId}-general`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useChat(currentRoom);

  const country = countries.find(c => c.id === countryId);
  const currentChatRooms = chatRooms.filter(room => room.country === countryId);

  useEffect(() => {
    if (!countryId || !countries.some(c => c.id === countryId)) {
      navigate('/countries');
    }
  }, [countryId, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    if (subscriptionStatus === 'free' && !currentRoom.includes('general')) {
      setShowSubscriptionModal(true);
      return;
    }

    try {
      await sendMessage(message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleRoomClick = (roomId: string) => {
    setCurrentRoom(roomId);
    setShowChatList(false);
  };

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container-custom py-8">
        <motion.div
          className="bg-gray-800 rounded-lg overflow-hidden shadow-xl relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Chat header */}
          <div className="bg-gray-700 p-4 flex items-center justify-between">
            <div className="flex items-center">
              {!showChatList && (
                <button
                  onClick={() => setShowChatList(true)}
                  className="mr-3 text-gray-300 hover:text-white md:hidden"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                <img src={country.flag} alt={country.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h2 className="font-semibold">{country.name} Student Chat</h2>
                <p className="text-xs text-gray-400">
                  {country.activeUsers} students online
                </p>
              </div>
            </div>
            <div>
              {subscriptionStatus === 'free' && (
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-1 px-3 rounded-full flex items-center"
                  onClick={() => setShowSubscriptionModal(true)}
                >
                  <Lock className="h-3 w-3 mr-1" /> Upgrade
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-[600px] relative">
            {/* Chat room list */}
            <div 
              className={`
                absolute md:relative w-full md:w-1/4 bg-gray-800 border-r border-gray-700 
                overflow-y-auto h-full z-10 transition-transform duration-300 ease-in-out
                ${showChatList ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
              `}
            >
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">CHAT ROOMS</h3>
                {currentChatRooms.map((room) => (
                  <div key={room.id} className="mb-4">
                    <button
                      onClick={() => handleRoomClick(`${countryId}-general`)}
                      className={`w-full text-left p-2 rounded hover:bg-gray-700 transition-colors ${
                        currentRoom === `${countryId}-general` ? 'bg-gray-700' : ''
                      }`}
                    >
                      <div className="font-medium">General Discussion</div>
                      <div className="text-xs text-gray-400">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        Open to all
                      </div>
                    </button>

                    {/* Premium rooms */}
                    {['study', 'jobs', 'social'].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleRoomClick(`${countryId}-${type}`)}
                        className={`w-full text-left p-2 rounded hover:bg-gray-700 transition-colors ${
                          currentRoom === `${countryId}-${type}` ? 'bg-gray-700' : ''
                        }`}
                      >
                        <div className="font-medium flex items-center">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                          {subscriptionStatus === 'free' && (
                            <Lock className="h-3 w-3 ml-2 text-gray-400" />
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                          Premium
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat messages */}
            <div className={`
              flex-1 flex flex-col bg-gray-900
              ${showChatList ? 'hidden md:flex' : 'flex'}
            `}>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <ChatMessage key={message.id} message={message} index={index} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-700">
                {subscriptionStatus === 'free' && !currentRoom.includes('general') ? (
                  <div className="bg-gray-800 rounded-md p-4 text-center">
                    <Lock className="h-5 w-5 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-300 mb-2">You need a subscription to send messages in premium rooms</p>
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 px-4 rounded"
                      onClick={() => setShowSubscriptionModal(true)}
                    >
                      Upgrade Now
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 input"
                    />
                    <button
                      type="submit"
                      className="ml-2 p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        countryId={countryId || ''}
      />
    </div>
  );
};

export default ChatRoomPage;