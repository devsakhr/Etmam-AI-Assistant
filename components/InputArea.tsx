import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';

interface InputAreaProps {
  onSendMessage: (text: string, image: string | null) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    if ((inputText.trim() || selectedImage) && !isLoading) {
      onSendMessage(inputText, selectedImage);
      setInputText('');
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white border-t border-gray-200 p-3 sm:p-4 sticky bottom-0 z-20">
      {selectedImage && (
        <div className="flex items-center gap-2 mb-2 p-2 bg-gray-50 rounded-lg border border-gray-200 w-fit">
          <div className="relative">
            <img src={selectedImage} alt="Preview" className="w-12 h-12 rounded object-cover" />
            <button
              onClick={clearImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
          <span className="text-xs text-gray-500">تم إرفاق الصورة</span>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        {/* Attachment Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors focus:outline-none"
          title="إرفاق صورة"
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Text Input */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب رسالتك هنا..."
          disabled={isLoading}
          className="flex-1 bg-gray-100 border-0 text-gray-800 text-sm sm:text-base rounded-full px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={isLoading || (!inputText.trim() && !selectedImage)}
          className={`p-3 rounded-full transition-all duration-200 flex items-center justify-center ${
            isLoading || (!inputText.trim() && !selectedImage)
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
            {isLoading ? (
               <svg className="animate-spin w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -rotate-90 translate-x-0.5">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
            )}
        </button>
      </div>
    </div>
  );
};

export default InputArea;
