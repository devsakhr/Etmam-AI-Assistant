import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';
import { Message, Product } from './types';
import { sendMessageToGemini } from './services/geminiService';
import { searchProducts } from './services/productService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (text: string, image: string | null) => {
    // 1. Create User Message Object
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      image: image || undefined,
      timestamp: new Date(),
    };

    // 2. Update UI immediately with user message
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 3. Search for products related to query (Async)
      const foundProducts: Product[] = await searchProducts(text);

      // 4. Call API (passing history, text, image, AND context products)
      const responseText = await sendMessageToGemini(messages, text, image, foundProducts);

      // 5. Create AI Response Object
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
        suggestedProducts: foundProducts, // Attach products to the message
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to get response", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'عذرًا، حدث خطأ أثناء الاتصال بالخادم. حاول مرة أخرى لاحقًا.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden">
      <Header />
      <MessageList 
        messages={messages} 
        isTyping={isLoading} 
        onSuggestionClick={(text) => handleSendMessage(text, null)}
      />
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;