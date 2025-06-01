import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Lock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { chatRooms } from '../data/chatData';
import ChatMessage from '../components/ChatMessage';
import SubscriptionModal from '../components/SubscriptionModal';
import { countries } from '../data/countries';

const ChatRoomPage = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();
  const { authStatus, subscriptionStatus } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const [currentChatRooms, setCurrentChatRooms] = useState(
    chatRooms.filter(room => room.country === countryId)
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const country = countries.find(c => c.id === countryId);

  useEffect(() => {
    if (!countryId || !countries.some(c => c.id === countryId)) {
      navigate('/countries');
    }
  }, [countryId, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [currentChatRooms]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    if (subscriptionStatus === 'free') {
      setShowSubscriptionModal(true);
      return;
    }

    // Add the message to the first chat room
    if (currentChatRooms.length > 0) {
      const updatedRooms = [...currentChatRooms];
      const firstRoom = { ...updatedRooms[0] };

      firstRoom.messages = [
        ...firstRoom.messages,
        {
          id: `new-${Date.now()}`,
          sender: "You",
          content: message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isBot: false
        }
      ];

      updatedRooms[0] = firstRoom;
      setCurrentChatRooms(updatedRooms);
      setMessage('');

      // Simulate bot response after 1 second
      setTimeout(() => {
        const botResponses = [
          "That's interesting! Tell me more.",
          "I agree with your point.",
          "Have you considered looking into this further?",
          "That's helpful information, thanks for sharing!",
          "I had a similar experience as well."
        ];

        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

        const responseRooms = [...updatedRooms];
        const responseRoom = { ...responseRooms[0] };

        responseRoom.messages = [
          ...responseRoom.messages,
          {
            id: `new-bot-${Date.now()}`,
            sender: "ChatBot",
            content: randomResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isBot: true
          }
        ];

        responseRooms[0] = responseRoom;
        setCurrentChatRooms(responseRooms);
      }, 1000);
    }
  };

  const handleRoomClick = () => {
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
                  {currentChatRooms.length === 0
                    ? "No active chat rooms"
                    : `${currentChatRooms[0].participants} students online`}
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
                {currentChatRooms.length === 0 ? (
                  <p className="text-gray-500 text-sm">No chat rooms available</p>
                ) : (
                  <ul>
                    {currentChatRooms.map((room) => (
                      <li key={room.id} className="mb-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                            handleRoomClick();
                          }}
                          className="w-full text-left p-2 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition-colors"
                        >
                          <div className="font-medium">{room.title}</div>
                          <div className="text-xs text-gray-400">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                            {room.participants} Online
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                            handleRoomClick();
                          }}
                          className="w-full text-left p-2 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition-colors"
                        >
                          <div className="font-medium">{room.country} Residence Student</div>
                          <div className="text-xs text-gray-400">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                            {room.participants} Online
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                            handleRoomClick();
                          }}
                          className="w-full text-left p-2 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition-colors"
                        >
                          <div className="font-medium">{room.sub2}</div>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRoomClick();
                          }}
                          className="w-full text-left p-2 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition-colors"
                        >
                          <div className="font-medium">{room.sub1}</div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Chat messages */}
            <div className={`
              flex-1 flex flex-col bg-gray-900
              ${showChatList ? 'hidden md:flex' : 'flex'}
            `}>
              <div className="flex-1 p-4 overflow-y-auto">
                {currentChatRooms.length > 0 ? (
                  <div className="space-y-4">
                    {currentChatRooms[0].messages.map((message, index) => (
                      <ChatMessage key={message.id} message={message} index={index} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No messages to display</p>
                  </div>
                )}
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-700">
                {subscriptionStatus === 'free' ? (
                  <div className="bg-gray-800 rounded-md p-4 text-center">
                    <Lock className="h-5 w-5 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-300 mb-2">You need a subscription to send messages</p>
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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-white">
            <h3 className="text-lg font-semibold mb-4">Upgrade Required</h3>
            <p className="text-gray-300 mb-6">You need to upgrade to use this feature.</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-white font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoomPage;