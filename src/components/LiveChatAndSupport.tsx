/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, Phone } from 'lucide-react';

export default function LiveChatAndSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'artisan' | 'guest'; text: string; time: string }>>([
    {
      sender: 'artisan',
      text: "Welcome, Darling. I am Aura, your virtual aesthetic curator for Mari Boutique Salon. How may I customize your beauty journey today?",
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const guideTopics = [
    { question: 'Do you have bridal openings?', answer: 'Yes, absolutely, Darling. Our executive bridal suite has selected openings remaining for this summer and upcoming fall. If you request a consultation on our dedicated Bridal tab, a personal coordinate manager will schedule a trial session within 12 hours.' },
    { question: 'What is your return policy?', answer: 'Our Capsule Boutique items are incredibly rare and limited. We accept exchanges within 14 days of purchase. Items must be in absolute, unworn conditions with original gold security tags fully attached.' },
    { question: 'Where is the salon located?', answer: 'Mari Boutique Salon is nestled nestled on Madison Avenue, Suite 400. Private, secured underground valet parking is complementary for all clients holding premium service reservations.' }
  ];

  const handleSendMessage = (text: string, isGuest: boolean = true) => {
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const newMsg = { sender: isGuest ? 'guest' : ('artisan' as any), text, time: currentTime };
    setMessages(prev => [...prev, newMsg]);

    if (isGuest) {
      setInputValue('');
      setIsTyping(true);

      // Simulate tailored smart response
      setTimeout(() => {
        setIsTyping(false);
        let reply = "I would be absolutely thrilled to assist you with that. If you need secure dates scheduled immediately, please click our 'Reserve Ritual' button at the header. Alternatively, standard lines can reach our concierge on WhatsApp!";
        
        // simple match check
        const normalized = text.toLowerCase();
        if (normalized.includes('bridal') || normalized.includes('wedding')) {
          reply = "The Bridal Sanctuary is our crown jewel! Our packages are fully customized. I highly recommend completing the Bridal Inquiry on our Bridal page so we can match you with appropriate color palettes.";
        } else if (normalized.includes('price') || normalized.includes('pricing') || normalized.includes('cost')) {
          reply = "All our prices are entirely transparent. Our signature hair sculpt is $150, Russian manicure is $95, and French balayage starts at $320. Detailed benefits are visible on the Salon Services menu!";
        } else if (normalized.includes('boutique') || normalized.includes('dress') || normalized.includes('clothes')) {
          reply = "The Capsule Boutique specializes in pure silk gowns and virgin Italian cashmere. You can browse individual items on the Boutique tab and add them to your luxury shopping bag inside this portal!";
        }

        setMessages(prev => [...prev, {
          sender: 'artisan',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  return (
    <div id="assist-chat-service" className="fixed bottom-6 right-6 z-55 font-sans select-none text-left">
      
      {/* Floating Buttons: WhatsApp & Chat Bubble trigger stack */}
      <div className="flex flex-col space-y-3 items-end">
        
        {/* Floating WhatsApp Quick link */}
        <a
          id="whatsapp-floater"
          href="https://wa.me/15550192?text=Hello%20Mari%20Salon!%20I%20would%20love%20to%20schedule%20an%20exclusive%20appointment."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white hover:bg-[#25D366] text-[#25D366] hover:text-white p-3.5 shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-[#25D366]/40 group hover:-translate-y-1 rounded-none cursor-pointer"
          aria-label="Contact us on WhatsApp"
        >
          {/* Custom vector phone/message look web */}
          <Phone className="w-5 h-5 stroke-[2.5]" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-[10px] tracking-widest uppercase font-bold whitespace-nowrap">
            WhatsApp Concierge
          </span>
        </a>

        {/* Dynamic Main Chat trigger */}
        <button
          id="chat-assistance-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-luxury-neutral hover:bg-[#D4AF37] text-[#D4AF37] hover:text-luxury-neutral p-4 shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center border border-[#D4AF37]/50 rounded-none cursor-pointer"
          aria-label="Open virtual advisor"
        >
          <MessageSquare className="w-6 h-6 stroke-[2]" />
        </button>
      </div>

      {/* Main Luxury Assist Container dialog */}
      {isOpen && (
        <div
          id="assistant-chat-panel"
          className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white border border-[#D4AF37]/40 overflow-hidden shadow-2xl flex flex-col h-[500px] rounded-none"
        >
          {/* Header */}
          <div className="bg-[#1C1C1C] p-5 text-white flex justify-between items-center border-b border-[#D4AF37]/35 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-none flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-5 h-5 text-[#D4AF37] animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase font-bold text-[#D4AF37]">Madame Aura</p>
                <p className="text-[9px] uppercase tracking-wider text-gray-400">Executive Virtual Curator</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-none text-gray-400 hover:text-[#D4AF37] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Notice */}
          <div className="bg-luxury-ivory px-4 py-2 border-b border-[#D4AF37]/20 text-[9px] tracking-widest text-luxury-neutral/60 uppercase font-bold text-center flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> Salon coordinate agents are live online
          </div>

          {/* Message List area */}
          <div className="p-4 flex-grow overflow-y-auto space-y-4 bg-luxury-cream/15">
            {messages.map((m, idx) => {
              const isArtisan = m.sender === 'artisan';
              return (
                <div key={idx} className={`flex ${isArtisan ? 'justify-start' : 'justify-end'} text-left`}>
                  <div className={`max-w-[80%] p-3.5 rounded-none ${
                    isArtisan
                      ? 'bg-luxury-ivory text-black border-l-2 border-[#D4AF37] text-xs'
                      : 'bg-luxury-neutral text-white border border-[#D4AF37]/30 text-xs'
                  } space-y-1.5 shadow-sm`}>
                    <p className="leading-relaxed font-light">{m.text}</p>
                    <span className="block text-[8px] opacity-65 text-right font-light tracking-wider uppercase">{m.time}</span>
                  </div>
                </div>
              );
            })}

            {/* Aura is typing simulator */}
            {isTyping && (
              <div className="flex justify-start text-left">
                <div className="bg-luxury-ivory text-luxury-neutral border-l-2 border-[#D4AF37] px-4 py-3 text-xs w-max flex items-center gap-2 rounded-none">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-gold-600">Aura is tailoring response</span>
                  <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Suggested helper questions tab-guide */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-3 border-t border-gray-100 bg-white space-y-2 text-left">
              <span className="text-[8px] uppercase font-bold tracking-widest text-[#D4AF37] block">Select Guided Topic:</span>
              <div className="flex flex-col gap-1.5">
                {guideTopics.map((topic, tIdx) => (
                  <button
                    key={tIdx}
                    onClick={() => {
                       handleSendMessage(topic.question, true);
                       setTimeout(() => {
                         handleSendMessage(topic.answer, false);
                       }, 500);
                    }}
                    className="text-[10px] tracking-wide text-left text-luxury-neutral/80 bg-luxury-ivory hover:text-[#D4AF37] hover:bg-luxury-neutral px-3 py-2 border border-[#D4AF37]/20 cursor-pointer rounded-none duration-300"
                  >
                    "{topic.question}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input control row */}
          <div className="p-4 border-t border-gold-400/15 bg-white flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask anything beautiful..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow border border-[#D4AF37]/30 bg-luxury-ivory/40 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-luxury-neutral rounded-none font-medium"
            />
            <button
              id="chat-send-message"
              onClick={() => handleSendMessage(inputValue)}
              className="bg-luxury-neutral hover:bg-[#D4AF37] border border-[#D4AF37]/30 p-3 text-[#D4AF37] hover:text-luxury-neutral transition-colors duration-300 cursor-pointer rounded-none"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
