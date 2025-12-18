
import { GoogleGenAI, Type } from "@google/genai";
import { PromptInput, GeneratedResult, GraphicType } from "../types";

export const generateEduPrompts = async (input: PromptInput): Promise<GeneratedResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const langDisplay = input.outputLanguage === 'Vietnamese' ? 'TIẾNG VIỆT' : 'TIẾNG ANH (ENGLISH)';

  const systemInstruction = `Bạn là một chuyên gia cao cấp về thiết kế giáo dục (Instructional Designer) và kỹ sư viết prompt.
  Nhiệm vụ: Tạo tài liệu giáo dục chất lượng cao dạng: ${input.graphicType}.
  Mức độ tư duy mục tiêu: ${input.difficulty}.
  Ngôn ngữ trả về cho người dùng: ${langDisplay}.
  
  Yêu cầu đặc biệt cho loại hình "${input.graphicType}":
  - Nếu là Sơ đồ/Flowchart: Chú trọng tính logic, thứ tự các bước.
  - Nếu là Truyện tranh: Chú trọng phân cảnh (panels) và lời thoại.
  - Nếu là Infographic: Chú trọng số liệu và phân vùng thông tin.
  - Nếu là Phiếu bài tập: Chú trọng cấu trúc câu hỏi.
  
  'visualPrompt' (dành cho AI tạo ảnh): Phải là tiếng Anh chuyên sâu, mô tả chi tiết bố cục (layout), phong cách nghệ thuật, và các thành phần thị giác đặc trưng của loại hình "${input.graphicType}".`;

  const promptText = `Hãy tạo nội dung giáo dục chuyên sâu cho loại hình: ${input.graphicType}.
  Chủ đề: "${input.topic}".
  Môn học: ${input.subject}. Lớp: ${input.gradeLevel}.
  Mục tiêu học tập: ${input.learningObjectives}.
  Phong cách mong muốn: ${input.stylePreference}.
  Độ khó: ${input.difficulty}.

  Cấu trúc JSON bắt buộc:
  - title: Tiêu đề hấp dẫn.
  - visualPrompt: Prompt tiếng Anh chi tiết để tạo layout/hình ảnh (DALL-E/Midjourney style).
  - contentPrompt: Prompt để AI tạo ra nội dung văn bản chi tiết (ChatGPT style).
  - contentPlan: Kế hoạch nội dung chi tiết (phân chia các phần, danh sách câu hỏi, hoặc các node trong sơ đồ).
  - designSuggestions: Gợi ý màu sắc (Hex codes), Font chữ, và các loại Icons phù hợp.
  - bloomTaxonomyLevel: Giải thích ngắn gọn tại sao thiết kế này đạt mức ${input.difficulty}.`;

  // 1. Generate Content
  const textResponse = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: promptText,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          visualPrompt: { type: Type.STRING },
          contentPrompt: { type: Type.STRING },
          contentPlan: { type: Type.STRING },
          designSuggestions: { type: Type.STRING },
          bloomTaxonomyLevel: { type: Type.STRING }
        },
        required: ["title", "contentPlan", "designSuggestions"]
      }
    }
  });

  const resultData = JSON.parse(textResponse.text || '{}');

  // 2. Generate Concept Preview Image
  let previewImageUrl = undefined;
  try {
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A professional educational ${input.graphicType} layout about ${input.topic}. Style: ${input.stylePreference}. Clean, organized, instructional design, high quality.` }]
      },
      config: {
        imageConfig: { aspectRatio: "3:4" }
      }
    });

    for (const part of imageResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        previewImageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  } catch (e) {
    console.warn("Image generation failed", e);
  }

  return { ...resultData, previewImageUrl };
};
