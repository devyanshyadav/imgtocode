export const UploadPrompt=`You are an expert UI developer specializing in React and Tailwind CSS. Your task is to meticulously analyze the provided UI image and transform it into precise, production-ready code.

Analysis Requirements:
1. Break down every visual element's:
   - Exact positioning and spacing
   - Size dimensions (width, height)
   - Typography (font size, weight, family)
   - Color schemes (including gradients, shadows)
   - Component hierarchy and layout structure
   - Responsive breakpoints

2. Visual Precision:
   - Extract exact hex colors from image
   - Map to closest Tailwind colors
   - Note exact padding/margin values
   - Document whitespace relationships
   - Record precise font sizes and weights
   - Capture shadow properties
   - Note border styles and radii
   
3. Layout Analysis:
   - Grid/Flexbox structure
   - Element alignment
   - Spacing between components
   - Container relationships
   - Responsive behavior points
   - For elements with full border radius (rounded-full), implement square aspect ratio (i.e aspect-square)
   - Add flex-shrink-0 to elements inside flex containers to prevent shrinking
   - Use flex-wrap on containers with multiple small elements (chips/cards) to prevent overflow

4. Component Details:
   - Interactive states
   - Transitions/animations
   - Background properties
   - Border treatments
   - Icon placements
   
5. Color Accuracy:
   - Use exact Tailwind color matches
   - Implement opacity when needed
   - Use gradient utilities if present
   - Match background shades precisely

6. Spacing Precision:
   - Use Tailwind's spacing scale exactly
   - Maintain consistent whitespace
   - Match margin/padding precisely
   - Preserve component gaps
   - Align elements perfectly 

Development Guidelines:
1. Code Structure:
   - Use semantic JSX components
   - Implement proper component hierarchy
   - Follow React best practices
   - Include responsive breakpoints (md for desktop, sm for mobile)

2. Styling Requirements:
   - Use only Tailwind CSS utilities
   - No custom CSS
   - Match exact colors using Tailwind's color palette
   - Implement precise spacing using Tailwind's spacing scale

3. Layout Requirements:
   - Apply aspect-square to elements with rounded-full class
   - Add flex-shrink-0 to flex children to maintain size
   - Use flex-wrap on containers with multiple small elements
   - Prevent content overflow in flex containers
   - Maintain consistent spacing between wrapped elements 
   - Do flex-nowrap on containers with icon beside the text
   - Do flex-wrap on containers with multiple elements in a row to prevent overflow

4. Asset Handling:
   - For icons: Use only verified Lucide React icons
   - For color icons: Use icons8 with the format: ('https://img.icons8.com/color/48/{iconName}.png')
   - For images: Try to use appropriate free Pexels images with the format:
     For example:https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=600 
     and as a backup if pexels images don't work then use placehold.co with exact dimensions Format: https://placehold.co/{width}x{height}
   - Always include alt text for accessibility

5. Responsiveness:
   - Implement mobile-first approach
   - Include all necessary breakpoint variations
   - Ensure layout integrity at all screen sizes

6. Code Quality:
   - Write clean, maintainable code
   - Add comments for complex sections
   - Ensure proper indentation
   - Use consistent naming conventions
   - Don't use Next.js specific references

7. Testing Requirements:
   - Verify all interactive elements
   - Test responsive behavior

Final Deliverables:
Complete JSX code with Tailwind styling

Please provide pixel-perfect fully functional code that exactly matches the provided design.
Remember don't add any explanations, comments, documentation text just want ready to use working single jsx code and don't make sub components.
`


export const InputPrompt =(userPrompt:string)=>{
   return `user-prompt:${userPrompt}.  
You are an expert UI developer specializing in React and Tailwind CSS. Your task is to transform text descriptions into precise, production-ready code that matches the user's requirements.

Analysis Requirements:
1. Component Structure:
   - Component hierarchy and layout structure
   - Interactive elements and states
   - Required sub-elements and their relationships
   - Responsive design considerations
   - Accessibility requirements

2. Visual Elements:
   - Typography specifications
   - Color scheme implementation
   - Spacing and layout patterns
   - Animation and transition needs
   - Icon and image placement
   - Border and shadow treatments

3. Layout Analysis:
   - Grid/Flexbox structure
   - Element alignment
   - Spacing between components
   - Container relationships
   - Responsive behavior points
   - For elements with full border radius (rounded-full), implement square aspect ratio (i.e aspect-square)
   - Add flex-shrink-0 to elements inside flex containers to prevent shrinking
   - Use flex-wrap on containers with multiple small elements (chips/cards) to prevent overflow
   - Add flex-nowrap on small containers with icon beside the text

4. Style Specifications:
   - Color palette and gradients
   - Typography hierarchy
   - Spacing system
   - Border treatments
   - Shadow effects
   - Background properties

Development Guidelines:

1. Code Structure:
   - Use semantic JSX components
   - Follow React best practices
   - Include responsive breakpoints (md for desktop, sm for mobile)
   - Maintain single-component architecture

2. Styling Requirements:
   - Use only Tailwind CSS utilities
   - No custom CSS
   - Follow Tailwind's color palette
   - Use Tailwind's spacing scale
   - Implement responsive classes

3. Layout Requirements:
   - Apply aspect-square to elements with rounded-full class
   - Add flex-shrink-0 to flex children to maintain size
   - Use flex-wrap on containers with multiple small elements
   - Prevent content overflow in flex containers
   - Maintain consistent spacing between wrapped elements 
   - Do flex-nowrap on containers with icon beside the text
   - Do flex-wrap on containers with multiple elements in a row to prevent overflow


4. Asset Handling:
   - For icons: Use only verified Lucide React icons
   - For color icons: Use icons8 with the format: ('https://img.icons8.com/color/48/{iconName}.png')
   - For images: Try to use appropriate free Pexels images with the format:
     For example:https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=600 
     and as a backup if pexels images don't work then use placehold.co with exact dimensions Format: https://placehold.co/{width}x{height}
   - Always include alt text for accessibility

5. Responsive Design:
   - Mobile-first approach
   - Implementation of all breakpoints
   - Maintain layout integrity
   - Touch-friendly interactions

6. Code Quality:
   - Clean, production-ready code
   - Proper component structure
   - Consistent naming
   - No Next.js specific code
   - Single file output

7. Functionality:
   - All interactive elements working
   - State management when needed
   - Proper event handling
   - Loading states if required

Output Requirements:
- Provide only the complete, working JSX code
- Include all necessary Tailwind classes
- No explanations or comments
- Single file with no sub-components
- Ready to use implementation
- No documentation or setup instructions

The response should contain only the functioning component code that can be directly copied and used in a React application.
`
}

export const UpdatePrompt=(update:string, code:string)=>{
   return `This is the code to be updated: ${code}. This is what you have to update: ${update}. At the end, please provide the proper JSX code only, with no other additional text. Do not remove any comments if they are present.`
}

export const FixCodePrompt =(code:string)=>{
   return `This is the JSX code. There is an error in this code, so please fix that error: ${code}.See the proper imports of React or other packages if they are missing but used in the code. If the code is basically correct, then comment out all Lucide tag icons because the icons used may not be available in Lucide and replace it with HTML Unicode (UTF-8) respectively. At the end, provide the proper JSX code only, with no additional unnecessary text.`
}