import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';

export const Assistant = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hi there! I am VoteSathi, your AI election assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // New features state
  const [language, setLanguage] = useState('English');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  
  // Supported Indian Languages for TTS and STT
  const LANGUAGES = {
    'English': 'en-IN',
    'Hindi': 'hi-IN',
    'Bengali': 'bn-IN',
    'Marathi': 'mr-IN',
    'Telugu': 'te-IN',
    'Tamil': 'ta-IN',
    'Gujarati': 'gu-IN',
    'Kannada': 'kn-IN',
    'Malayalam': 'ml-IN',
    'Punjabi': 'pa-IN',
    'Urdu': 'ur-IN'
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Read text aloud using Web Speech API
  const speak = (text) => {
    if (!isAudioEnabled) return;
    window.speechSynthesis.cancel(); // Stop any current speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = LANGUAGES[language] || 'en-IN';
    utterance.lang = targetLang;
    
    // Find the best available voice for the selected language
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(v => v.lang === targetLang || v.lang.replace('_', '-') === targetLang);
    
    if (!selectedVoice) {
      // Try finding just the language prefix (e.g., 'mr' for 'mr-IN')
      const shortLang = targetLang.split('-')[0];
      selectedVoice = voices.find(v => v.lang.startsWith(shortLang));
    }
    
    if (!selectedVoice) {
      // Fallback: If regional voice is missing, try Hindi (good for Devanagari script like Marathi), else English
      selectedVoice = voices.find(v => v.lang.startsWith('hi')) || voices.find(v => v.lang.startsWith('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  // Voice Input using SpeechRecognition API
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input. Please use Chrome or Edge.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    
    // Set language for Speech Recognition
    recognition.lang = LANGUAGES[language] || 'en-IN';
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // Auto-send after voice recognition completes
      handleSendWithText(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSendWithText(input.trim());
  };

  const handleSendWithText = async (userText) => {
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: 'I need my AI brain! Please add VITE_GEMINI_API_KEY to your .env file.' 
        }]);
        setIsLoading(false);
        return;
      }

      const systemPrompt = `
        You are VoteSathi, a friendly and simple AI assistant for Indian voters.
        Your goal is to help citizens understand how to vote, how to register, what documents are needed, and general election facts.
        Keep your answers short, simple, and very easy to understand (max 2-3 sentences).
        IMPORTANT: You MUST reply entirely in ${language}.
        Do not answer questions completely unrelated to voting, elections, or Indian democracy.
      `;

      const prompt = `${systemPrompt}\n\nUser: ${userText}\nVoteSathi:`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Gemini API Error:", errorData);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.candidates[0].content.parts[0].text;

      setMessages(prev => [...prev, { role: 'ai', content: replyText }]);
      speak(replyText); // Read out the response

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'Sorry, I am having trouble connecting right now. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '0 1rem',
    height: 'calc(100vh - 12rem)',
    display: 'flex',
    flexDirection: 'column',
  };

  const chatBoxStyle = {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const messagesAreaStyle = {
    flex: 1,
    padding: '1.5rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const inputAreaStyle = {
    padding: '1rem',
    borderTop: '1px solid var(--border)',
    backgroundColor: '#F8FAFC',
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Bot color="var(--primary)" size={32} /> AI Assistant
        </h1>
        <p style={{ color: '#64748B', marginBottom: '1rem' }}>Ask me anything about voting in India!</p>
        
        {/* Multilingual and Audio Controls */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <select 
            value={language} 
            onChange={e => setLanguage(e.target.value)} 
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border)',
              outline: 'none',
              fontWeight: 600,
              backgroundColor: 'white'
            }}
          >
            {Object.keys(LANGUAGES).map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

          <Button 
            variant={isAudioEnabled ? "primary" : "outline"} 
            size="sm"
            onClick={() => {
              setIsAudioEnabled(!isAudioEnabled);
              if (isAudioEnabled) window.speechSynthesis.cancel();
            }} 
            icon={isAudioEnabled ? Volume2 : VolumeX}
          >
            {isAudioEnabled ? "Voice Output ON" : "Voice Output OFF"}
          </Button>
        </div>
      </div>

      <div style={chatBoxStyle}>
        <div style={messagesAreaStyle}>
          {messages.map((msg, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={index} 
              style={{ 
                display: 'flex', 
                gap: '1rem', 
                alignItems: 'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' 
              }}
            >
              <div style={{ 
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                backgroundColor: msg.role === 'user' ? '#E2E8F0' : '#FFEDD5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: msg.role === 'user' ? '#64748B' : 'var(--primary)'
              }}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div style={{ 
                backgroundColor: msg.role === 'user' ? 'var(--primary)' : '#F1F5F9',
                color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                maxWidth: '80%',
                lineHeight: 1.5
              }}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Bot size={20} />
              </div>
              <div style={{ backgroundColor: '#F1F5F9', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  Thinking...
                </motion.span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form style={inputAreaStyle} onSubmit={handleSend}>
          {/* Voice Input Button */}
          <button 
            type="button" 
            onClick={startListening}
            style={{ 
              borderRadius: '50%', 
              width: '48px', 
              height: '48px', 
              border: 'none',
              backgroundColor: isListening ? '#FEE2E2' : '#F1F5F9', 
              color: isListening ? '#EF4444' : '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title="Click to Speak"
          >
            <Mic size={24} />
          </button>

          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "Type your question..."}
            style={{ 
              flex: 1, padding: '0.75rem 1rem', borderRadius: 'var(--radius-full)', 
              border: '1px solid var(--border)', outline: 'none', fontSize: '1rem' 
            }}
          />
          <Button type="submit" variant="primary" style={{ borderRadius: 'var(--radius-full)', width: '48px', height: '48px', padding: 0 }}>
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
};
