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

// theme={{
//   colors: {
//     surface1: "#011627",
//     surface2: "#243b4c",
//     surface3: "#112331",
//     clickable: "#6988a1",
//     base: "#808080",
//     disabled: "#4D4D4D",
//     hover: "#c5e4fd",
//     accent: "#c5e4fd",
//     error: "#ffcdca",
//     errorSurface: "#811e18",
//   },
//   syntax: {
//     plain: "#d6deeb",
//     comment: {
//       color: "#999999",
//       fontStyle: "italic",
//     },
//     keyword: {
//       color: "#c792ea",
//       fontStyle: "italic",
//     },
//     tag: "#7fdbca",
//     punctuation: "#7fdbca",
//     definition: "#82aaff",
//     property: {
//       color: "#addb67",
//       fontStyle: "italic",
//     },
//     static: "#f78c6c",
//     string: "#ecc48d",
//   },
//   font: {
//     body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
//     mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
//     size: "13px",
//     lineHeight: "20px",
//   },
// }}