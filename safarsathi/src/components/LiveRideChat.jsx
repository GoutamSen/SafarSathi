import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, CheckCheck, User, Car, Sparkles } from 'lucide-react';
import { realtimeSync } from '../services/realtimeSync';

export default function LiveRideChat({ journey, currentRole = 'passenger' }) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      senderRole: 'driver',
      senderName: journey?.driverName || 'Rajesh (Driver Host)',
      text: 'Hi! Ride request accepted. I will be at the pickup location shortly.',
      time: '08:31 AM',
    },
    {
      id: 'msg-2',
      senderRole: 'passenger',
      senderName: 'Rahul (Passenger)',
      text: 'Great! I am waiting near Vijay Nagar Circle.',
      time: '08:32 AM',
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Subscribe to real-time chat messages across browser tabs
  useEffect(() => {
    const unsubscribe = realtimeSync.subscribe((event) => {
      if (event.type === 'CHAT_MESSAGE_SENT' && event.payload) {
        setMessages((prev) => {
          // Avoid duplicate messages
          if (prev.some((m) => m.id === event.payload.id)) return prev;
          return [...prev, event.payload];
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSendMessage = (textToSend) => {
    const content = textToSend || inputText;
    if (!content.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: `chat-${Date.now()}`,
      senderRole: currentRole,
      senderName: currentRole === 'driver' ? `${journey?.driverName || 'Driver Host'} (You)` : 'Rahul Passenger (You)',
      text: content.trim(),
      time: timeStr,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Broadcast across browser tabs
    realtimeSync.broadcast('CHAT_MESSAGE_SENT', newMsg);
  };

  const quickChips = currentRole === 'driver'
    ? [
        '🚗 On my way! Reaching in 3 minutes',
        '📍 Reached pickup location',
        '🚦 Stuck in mild traffic (2 mins delay)',
        '📞 Please call me when outside'
      ]
    : [
        '📍 Waiting near the pickup landmark',
        '⏱️ How many minutes away are you?',
        '👍 Wearing a white shirt & backpack',
        '📞 Call me upon arrival'
      ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E5E7EB',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '380px',
        overflow: 'hidden',
        marginBottom: '1.5rem',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '0.85rem 1.15rem',
          backgroundColor: '#111827',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <MessageSquare size={18} style={{ color: '#E6A700' }} />
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>
              Live Direct Chat ({currentRole === 'driver' ? 'Passenger Rahul' : `Driver ${journey?.driverName || 'Host'}`})
            </h4>
            <span style={{ fontSize: '0.725rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '700' }}>
              <span className="pulse-indicator" style={{ backgroundColor: '#10B981', width: '6px', height: '6px' }} />
              Real-time Cross-Tab Active
            </span>
          </div>
        </div>

        <div className="badge-pill" style={{ backgroundColor: 'rgba(230, 167, 0, 0.2)', color: '#E6A700', fontSize: '0.725rem', padding: '0.2rem 0.6rem' }}>
          <span>🔒 Encrypted</span>
        </div>
      </div>

      {/* Message Stream */}
      <div
        style={{
          flex: 1,
          padding: '1rem',
          overflowY: 'auto',
          backgroundColor: '#F9FAFB',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        {messages.map((msg) => {
          const isMine = msg.senderRole === currentRole;
          return (
            <div
              key={msg.id}
              style={{
                alignSelf: isMine ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
              }}
            >
              <div
                style={{
                  fontSize: '0.725rem',
                  fontWeight: '700',
                  color: isMine ? '#9CA3AF' : '#6B7280',
                  marginBottom: '0.2rem',
                  textAlign: isMine ? 'right' : 'left',
                }}
              >
                {msg.senderName}
              </div>

              <div
                style={{
                  backgroundColor: isMine ? '#111827' : '#FFFFFF',
                  color: isMine ? '#FFFFFF' : '#111827',
                  padding: '0.75rem 1rem',
                  borderRadius: isMine ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: isMine ? 'none' : '1px solid #E5E7EB',
                  fontSize: '0.875rem',
                  lineHeight: '1.4',
                  fontWeight: '500',
                }}
              >
                {msg.text}
                <div
                  style={{
                    fontSize: '0.675rem',
                    opacity: 0.75,
                    marginTop: '0.25rem',
                    textAlign: 'right',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.25rem',
                  }}
                >
                  <span>{msg.time}</span>
                  {isMine && <CheckCheck size={13} style={{ color: '#E6A700' }} />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Response Chips */}
      <div
        style={{
          padding: '0.5rem 0.85rem',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F3F4F6',
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(chip)}
            style={{
              padding: '0.35rem 0.65rem',
              backgroundColor: '#FFF4CC',
              border: '1px solid rgba(230, 167, 0, 0.3)',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: '#111827',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        style={{
          padding: '0.65rem 0.85rem',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={currentRole === 'driver' ? 'Message passenger Rahul...' : `Message driver ${journey?.driverName || 'host'}...`}
          style={{
            flex: 1,
            padding: '0.65rem 0.85rem',
            borderRadius: '12px',
            border: '1.5px solid #E5E7EB',
            outline: 'none',
            fontSize: '0.85rem',
            fontWeight: '600',
            backgroundColor: '#F9FAFB',
          }}
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          style={{
            padding: '0.65rem 0.95rem',
            backgroundColor: inputText.trim() ? '#E6A700' : '#E5E7EB',
            color: inputText.trim() ? '#111827' : '#9CA3AF',
            border: 'none',
            borderRadius: '12px',
            cursor: inputText.trim() ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            transition: 'all 0.2s ease',
          }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
