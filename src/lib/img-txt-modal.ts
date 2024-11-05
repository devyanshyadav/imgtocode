import { GoogleGenerativeAI } from "@google/generative-ai";

// Utility function to convert file to generative part
const fileToGenerativePart = (file: File): Promise<{ inlineData: { data: string, mimeType: string } }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve({
      inlineData: {
        data: (reader.result as string).split(',')[1],
        mimeType: file.type
      },
    });
    reader.readAsDataURL(file);
  });
};

// Utility function to run image text analysis
export const ImageTxtModal = async (
  image: File, 
  prompt: string, 
): Promise<string> => {
  if (!image) {
    return 'Please upload an image before analyzing.';
  }
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const imagePart = await fileToGenerativePart(image);
    const response = await model.generateContent([prompt, imagePart]);
    return await response.response.text();
  } catch (error: any) {
    return `Error: ${error.message}`;
  }
};

