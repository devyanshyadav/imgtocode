"use client";
import React from "react";
import DevLaserInput from "../dev-components/dev-laser-input";
import DevButton from "../dev-components/dev-button";
import useZustStore from "@/lib/zust-store";
import { TxtModal } from "@/lib/txt-modal";
import { RiLoader4Line } from "react-icons/ri";

const PromptInput = () => {
  const { setCode, setLoading, File,isLoading } = useZustStore();
  const ref = React.useRef<HTMLInputElement>(null);

  const handlePrompt = async () => {
    const Prompt = `user-prompt:${ref.current?.value}.  
    -You are an expert UI developer specializing in React and Tailwind CSS. Your task is to transform the provided requirements into precise, production-ready JSX code.

**Requirements:**
1. **Component Structure**:
   - Use semantic JSX components and follow best practices for React.
   - Organize code for clarity and maintainability.
   - Do not split into subcomponents; the code should be a single, self-contained JSX file.

2. **Styling**:
   - Use only Tailwind CSS utilities; avoid custom CSS.
   - Match colors, spacing, and typography exactly as specified.
   - Implement responsive breakpoints for mobile-first design (e.g., sm for mobile, md for desktop).

3. **Layout and Alignment**:
   - Accurately implement Flexbox/Grid structures.
   - Ensure all elements are correctly positioned and aligned.
   - Maintain consistent spacing and padding across components.

4. **Responsive Design**:
   - Ensure the layout is responsive at all screen sizes.
   - Add mobile-first breakpoints to adapt layouts appropriately.

5. **Interactive Elements**:
   - If specified, add interactive states, animations, and transitions using Tailwind's utility classes.
   - Use appropriate ARIA roles for accessibility.

6. **Code Quality**:
   - Write clean, readable, and maintainable JSX code.
   - Avoid unnecessary comments and documentation text.

7. **Testing Requirements**:
   - Ensure that all interactive elements work as expected.
   - Test responsiveness to ensure layout integrity across devices.

**Asset Handling**:
   - For icons: Use Lucide React icons as specified.
   - For images: Use placeholders with the exact dimensions ('https://placehold.co/{width}x{height}').

**Final Deliverable**:
Provide pixel-perfect, production-ready JSX code with Tailwind CSS styling that precisely follows the specified requirements. 

**Output**:
Generate only the final working JSX code—no comments, explanations, or additional documentation.
`;
setLoading(true);
    const result = await TxtModal(Prompt);
    setCode(result as string);
    setLoading(false);
  };
  return (
    <DevLaserInput
      scale="lg"
      disabled={File ? true : false}
      type="text"
      ref={ref}
      className="pr-1 pl-4"
      reverseIcon
      icon={
        <DevButton  onClick={handlePrompt} rounded="full" ripple>
          Do Magic{isLoading && <RiLoader4Line className="animate-spin text-xl"/>}
        </DevButton>
      }
    />
  );
};

export default PromptInput;
