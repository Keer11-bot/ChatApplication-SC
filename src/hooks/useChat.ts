import { useEffect, useState, useCallback } from 'react';
import { socket } from '../config/socket';
import { ref, push, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isBot: boolean;
  userId?: string;
}

export const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { user, subscriptionStatus } = useAuth();

  useEffect(() => {
    const messagesRef = ref(database, `messages/${roomId}`);
    
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          ...value
        }));
        setMessages(messageList);
      }
    });

    socket.on('message', (message: ChatMessage) => {
      if (message.userId !== user?.uid) {
        setMessages(prev => [...prev, message]);
      }
    });

    return () => {
      off(messagesRef);
      socket.off('message');
    };
  }, [roomId, user?.uid]);

  const sendMessage = useCallback(async (content: string) => {
    if (!user || !content.trim()) return;

    if (subscriptionStatus === 'free' && !roomId.includes('general')) {
      throw new Error('Subscription required');
    }

    const newMessage: Omit<ChatMessage, 'id'> = {
      sender: user.email?.split('@')[0] || 'Anonymous',
      content: content.trim(),
      timestamp: format(new Date(), 'h:mm a'),
      isBot: false,
      userId: user.uid
    };

    try {
      const messagesRef = ref(database, `messages/${roomId}`);
      await push(messagesRef, newMessage);
      socket.emit('message', { ...newMessage, roomId });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }, [roomId, user, subscriptionStatus]);

  return { messages, sendMessage };
};