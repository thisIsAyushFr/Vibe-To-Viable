import { useEffect, useState } from 'react';

const STORAGE_KEY = 'caresync_messages';
const EVENT_NAME = 'caresync-messages-updated';

const DEFAULT_CONVERSATIONS = {
  'P001-D001': {
    conversationId: 'P001-D001',
    patientId: 'P001',
    patientName: 'Ravi Mehta',
    doctorId: 'D001',
    doctorName: 'Dr. Arjun Sharma'
  }
};

const DEFAULT_MESSAGES = [
  {
    id: 'MSG001',
    conversationId: 'P001-D001',
    senderId: 'P001',
    senderRole: 'patient',
    receiverId: 'D001',
    text: 'Hello Doctor, I wanted to ask about my prescription.',
    timestamp: '10:05 AM',
    read: true
  },
  {
    id: 'MSG002',
    conversationId: 'P001-D001',
    senderId: 'D001',
    senderRole: 'doctor',
    receiverId: 'P001',
    text: 'Hi Ravi, sure. What seems to be the issue?',
    timestamp: '10:12 AM',
    read: true
  }
];

function readState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to defaults
  }
  const initial = { conversations: DEFAULT_CONVERSATIONS, messages: DEFAULT_MESSAGES };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function writeState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function getConversations() {
  return Object.values(readState().conversations);
}

export function getMessages(conversationId) {
  const { messages } = readState();
  return conversationId ? messages.filter((m) => m.conversationId === conversationId) : messages;
}

export function sendMessage({ conversationId, senderId, senderRole, receiverId, text }) {
  const state = readState();
  const message = {
    id: `MSG${Date.now()}`,
    conversationId,
    senderId,
    senderRole,
    receiverId,
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    read: false
  };
  state.messages = [...state.messages, message];
  writeState(state);
  return message;
}

export function markAsRead(conversationId, readerId) {
  const state = readState();
  state.messages = state.messages.map((m) => (
    m.conversationId === conversationId && m.receiverId === readerId ? { ...m, read: true } : m
  ));
  writeState(state);
}

export function getUnreadCount(receiverId) {
  return readState().messages.filter((m) => m.receiverId === receiverId && !m.read).length;
}

export function useMessages(conversationId) {
  const [messages, setMessages] = useState(getMessages(conversationId));
  useEffect(() => {
    const refresh = () => setMessages(getMessages(conversationId));
    window.addEventListener('storage', refresh);
    window.addEventListener(EVENT_NAME, refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener(EVENT_NAME, refresh);
    };
  }, [conversationId]);
  return messages;
}

export const MESSAGES_EVENT = EVENT_NAME;

export function useUnreadCount(receiverId) {
  const [count, setCount] = useState(getUnreadCount(receiverId));
  useEffect(() => {
    const refresh = () => setCount(getUnreadCount(receiverId));
    window.addEventListener('storage', refresh);
    window.addEventListener(EVENT_NAME, refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener(EVENT_NAME, refresh);
    };
  }, [receiverId]);
  return count;
}
