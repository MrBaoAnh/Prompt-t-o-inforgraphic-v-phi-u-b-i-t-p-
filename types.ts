
export enum GraphicType {
  INFOGRAPHIC = 'Đồ họa thông tin (Infographic)',
  FLOWCHART = 'Sơ đồ dòng chảy',
  TIMELINE = 'Dòng thời gian',
  DIAGRAM = 'Sơ đồ',
  PROCESS_DIAGRAM = 'Sơ đồ quy trình',
  COMPARISON_CHART = 'Biểu đồ so sánh',
  MIND_MAP = 'Sơ đồ tư duy',
  COMIC_SUMMARY = 'Tóm tắt truyện tranh',
  WORKSHEET = 'Phiếu bài tập'
}

export type OutputLanguage = 'Vietnamese' | 'English';
export type DifficultyLevel = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';

export interface PromptInput {
  topic: string;
  gradeLevel: string;
  subject: string;
  learningObjectives: string;
  stylePreference: string;
  graphicType: GraphicType;
  outputLanguage: OutputLanguage;
  difficulty: DifficultyLevel;
}

export interface GeneratedResult {
  title: string;
  visualPrompt: string;
  contentPrompt: string;
  contentPlan: string;
  designSuggestions: string;
  previewImageUrl?: string;
  bloomTaxonomyLevel: string;
}
