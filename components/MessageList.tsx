import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import ProductList from './ProductList';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onSuggestionClick: (text: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, onSuggestionClick }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const suggestions = [
    "أرخص سماعة أذن عندكم؟",
    "أبغى باور بنك 20 ألف ملي أمبير",
    "وش أفضل جوال للألعاب بسعر معقول؟"
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#f0f2f5]">
      {/* Intro Message */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-80">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12.375m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">هلا فيك في اهتمام للاتصالات! 👋</h2>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                أنا مساعدك الذكي، موجود لخدمتك في أي وقت.
                </p>
            </div>
            
            <div className="w-full max-w-sm text-right space-y-2">
                <p className="text-xs font-bold text-gray-400 mb-2 mr-1">جرب تسألني:</p>
                {suggestions.map((text, index) => (
                  <div 
                    key={index}
                    onClick={() => onSuggestionClick(text)}
                    className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-sm text-gray-700 hover:border-teal-500 cursor-pointer transition-colors active:scale-95 transform duration-100"
                  >
                      "{text}"
                  </div>
                ))}
            </div>
        </div>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex flex-col w-full ${
            msg.role === 'user' ? 'items-start' : 'items-end'
          }`}
        >
          <div className={`flex w-full ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div
                className={`relative max-w-[90%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === 'user'
                    ? 'bg-teal-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}
            >
                {/* Display Image if present */}
                {msg.image && (
                <div className="mb-2">
                    <img 
                    src={msg.image} 
                    alt="User upload" 
                    className="rounded-lg max-h-48 object-cover w-full border border-white/20"
                    />
                </div>
                )}
                
                {/* Display Text */}
                <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                {msg.text}
                </p>

                {/* Time */}
                <div className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-teal-100' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
          </div>
          
          {/* Product Suggestions (Only for AI messages) */}
          {msg.role === 'model' && msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
            <div className="w-full max-w-[90%] sm:max-w-[80%] mt-1 self-end">
                <ProductList products={msg.suggestedProducts} />
            </div>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="flex w-full justify-end">
          <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
            <div className="flex space-x-1 space-x-reverse">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;