
import React, { useState } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import ResultDisplay from './components/ResultDisplay';
import { PromptInput, GeneratedResult } from './types';
import { generateEduPrompts } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (input: PromptInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateEduPrompts(input);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Sidebar Area: Forms */}
          <aside className="xl:col-span-4 space-y-6">
            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl overflow-hidden relative">
              <i className="fas fa-sparkles absolute -right-4 -top-4 text-8xl opacity-10"></i>
              <h2 className="text-2xl font-bold mb-2">Tạo tài liệu học tập</h2>
              <p className="text-indigo-100 text-sm opacity-90">
                Điền thông tin chủ đề để AI thiết kế cho bạn một bộ tài liệu giáo dục trực quan và hiệu quả nhất.
              </p>
            </div>
            
            <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                <i className="fas fa-exclamation-triangle"></i>
                <p className="text-sm">{error}</p>
              </div>
            )}
          </aside>

          {/* Main Area: Results */}
          <section className="xl:col-span-8">
            {!result && !isLoading && (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-6 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50 p-12">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center">
                  <i className="fas fa-wand-magic-sparkles text-4xl text-indigo-400"></i>
                </div>
                <div className="max-w-md">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Chưa có dữ liệu prompt</h3>
                  <p className="text-slate-500">
                    Hãy nhập chủ đề bài học ở khung bên trái và nhấn nút "Tạo Prompt" để nhận kết quả thiết kế và nội dung chi tiết.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                    <i className="fas fa-check-circle text-indigo-500 mb-2"></i>
                    <p className="text-xs font-medium text-slate-600">Prompt Thiết Kế</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                    <i className="fas fa-check-circle text-indigo-500 mb-2"></i>
                    <p className="text-xs font-medium text-slate-600">Phác Thảo Nội Dung</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                    <i className="fas fa-check-circle text-indigo-500 mb-2"></i>
                    <p className="text-xs font-medium text-slate-600">Gợi Ý Mỹ Thuật</p>
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                  <i className="fas fa-brain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 text-xl animate-pulse"></i>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-800">Đang tổng hợp tri thức...</h3>
                  <p className="text-slate-500 animate-pulse italic">AI đang phân tích chương trình học và lên ý tưởng thiết kế...</p>
                </div>
              </div>
            )}

            {result && !isLoading && <ResultDisplay result={result} />}
          </section>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            Phát triển bởi <strong>EduPrompt Architect</strong> <span className="h-4 w-[1px] bg-slate-300"></span> 2024
          </p>
          <div className="mt-4 flex justify-center gap-4 text-slate-400">
            <a href="#" className="hover:text-indigo-600"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-indigo-600"><i className="fab fa-github"></i></a>
            <a href="#" className="hover:text-indigo-600"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
