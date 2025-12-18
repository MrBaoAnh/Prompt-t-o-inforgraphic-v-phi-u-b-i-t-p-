
import React from 'react';
import { GeneratedResult } from '../types';

interface ResultDisplayProps {
  result: GeneratedResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Đã sao chép!');
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      {/* Title & Badge */}
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-indigo-200">
            {result.bloomTaxonomyLevel.split(' ')[0]}
          </span>
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">{result.title}</h2>
        <p className="text-slate-500 text-sm italic">{result.bloomTaxonomyLevel}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Prompts & Plan */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-md space-y-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <i className="fas fa-terminal text-indigo-500"></i>
              Magic Prompts cho AI
            </h3>
            
            <div className="group relative bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Prompt Hình ảnh / Layout (Tiếng Anh)</p>
              <p className="text-sm text-slate-700 line-clamp-3 group-hover:line-clamp-none transition-all">
                {result.visualPrompt}
              </p>
              <button 
                onClick={() => copyToClipboard(result.visualPrompt)}
                className="mt-3 w-full py-2 bg-white text-indigo-600 text-xs font-bold rounded-xl border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
              >
                <i className="far fa-copy mr-2"></i> Sao chép Prompt Layout
              </button>
            </div>

            <div className="group relative bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Prompt Chi tiết Nội dung</p>
              <p className="text-sm text-slate-700 line-clamp-3 group-hover:line-clamp-none transition-all">
                {result.contentPrompt}
              </p>
              <button 
                onClick={() => copyToClipboard(result.contentPrompt)}
                className="mt-3 w-full py-2 bg-white text-violet-600 text-xs font-bold rounded-xl border border-violet-100 hover:bg-violet-600 hover:text-white transition-all shadow-sm"
              >
                <i className="far fa-copy mr-2"></i> Sao chép Prompt Nội dung
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fas fa-list-ol text-green-500"></i>
              Cấu trúc & Dữ liệu chi tiết
            </h3>
            <div className="bg-slate-50 p-5 rounded-2xl text-sm text-slate-600 leading-relaxed max-h-[400px] overflow-y-auto custom-scrollbar">
              <pre className="whitespace-pre-wrap font-sans">{result.contentPlan}</pre>
            </div>
          </div>
        </div>

        {/* Right: Preview & Aesthetics */}
        <div className="lg:col-span-5 space-y-6">
          {result.previewImageUrl && (
            <div className="bg-white p-4 rounded-3xl shadow-md">
              <h3 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
                <i className="fas fa-eye text-amber-500"></i>
                Bản vẽ Gợi ý từ AI
              </h3>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img src={result.previewImageUrl} alt="Concept" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 text-center italic">Minh họa bố cục tham khảo</p>
            </div>
          )}

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
            <h3 className="font-bold text-amber-800 mb-3 text-sm flex items-center gap-2">
              <i className="fas fa-palette"></i>
              Gợi ý Thẩm mỹ & Màu sắc
            </h3>
            <div className="text-xs text-amber-900 leading-relaxed space-y-2">
              {result.designSuggestions.split('\n').map((s, i) => (
                <p key={i} className="flex gap-2"><span className="opacity-50 font-bold">•</span> {s}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
