
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <i className="fas fa-graduation-cap text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                EduPrompt Architect
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">AI Assistant for Teachers</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Trang chủ</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Mẫu thiết kế</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Hướng dẫn</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
