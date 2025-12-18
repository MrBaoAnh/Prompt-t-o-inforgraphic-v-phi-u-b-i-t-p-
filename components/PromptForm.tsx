
import React, { useState } from 'react';
import { GraphicType, PromptInput, DifficultyLevel } from '../types';

interface PromptFormProps {
  onSubmit: (data: PromptInput) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PromptInput>({
    topic: '',
    gradeLevel: 'Lớp 6',
    subject: 'Toán học',
    learningObjectives: '',
    stylePreference: 'Modern Professional',
    graphicType: GraphicType.INFOGRAPHIC,
    outputLanguage: 'Vietnamese',
    difficulty: 'Thông hiểu'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const styles = [
    { id: 'Modern Professional', label: 'Hiện đại', icon: 'fa-briefcase' },
    { id: 'Playful & Colorful', label: 'Vui vẻ', icon: 'fa-child' },
    { id: 'Academic Minimalist', label: 'Hàn lâm', icon: 'fa-book' },
    { id: 'Comic Style', label: 'Truyện tranh', icon: 'fa-mask' }
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20 space-y-5">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Chủ đề bài học</label>
            <input
              required
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Vd: Chu trình nước, Robot..."
              className="w-full px-4 py-2.5 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/50"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Môn học</label>
            <input
              required
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Vd: Khoa học, Sử..."
              className="w-full px-4 py-2.5 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/50"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Loại hình muốn tạo</label>
          <select
            name="graphicType"
            value={formData.graphicType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/50 font-medium text-indigo-700"
          >
            {Object.values(GraphicType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Độ khó (Bloom)</label>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full px-3 py-2 rounded-xl border-slate-200 text-sm">
              <option value="Nhận biết">Nhận biết</option>
              <option value="Thông hiểu">Thông hiểu</option>
              <option value="Vận dụng">Vận dụng</option>
              <option value="Vận dụng cao">Vận dụng cao</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Ngôn ngữ</label>
            <select name="outputLanguage" value={formData.outputLanguage} onChange={handleChange} className="w-full px-3 py-2 rounded-xl border-slate-200 text-sm">
              <option value="Vietnamese">Tiếng Việt</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Phong cách</label>
          <div className="grid grid-cols-2 gap-2">
            {styles.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => setFormData(p => ({ ...p, stylePreference: s.id }))}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-[11px] transition-all ${
                  formData.stylePreference === s.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                }`}
              >
                <i className={`fas ${s.icon}`}></i>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Khối lớp</label>
          <select name="gradeLevel" value={formData.gradeLevel} onChange={handleChange} className="w-full px-3 py-2 rounded-xl border-slate-200 text-sm">
            {[...Array(12)].map((_, i) => <option key={i} value={`Lớp ${i + 1}`}>Lớp {i + 1}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all relative overflow-hidden group ${
          isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
          TẠO PHÁC THẢO
        </span>
        {!isLoading && <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
      </button>
    </form>
  );
};

export default PromptForm;
