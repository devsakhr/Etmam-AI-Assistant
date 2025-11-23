import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
          هـ
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-800 leading-tight">اهتمام للاتصالات</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-gray-500 font-medium">متصل الآن</span>
          </div>
        </div>
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="text-gray-400 hover:text-teal-600 transition-colors"
        title="محادثة جديدة"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </button>
    </header>
  );
};

export default Header;
