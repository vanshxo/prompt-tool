import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "small" | "medium" | "large"; // Custom input size
  inputWidth?: string; // Custom width, e.g., "w-full", "w-1/2", "w-[300px]"
  positionClass?: string; // Optional positioning classes
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize = "medium", inputWidth = "w-full", positionClass = "", ...props }, ref) => {
    // Define size classes based on inputSize prop
    const sizeClasses = {
      small: "h-8 px-2 text-xs",   // Small height, padding, font size
      medium: "h-10 px-3 text-sm", // Medium height, padding, font size
      large: "h-12 px-4 text-md",  // Large height, padding, font size
    };

    return (
      <input
        type={type}
        className={cn(
          "rounded-md border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[inputSize], // Apply size class based on inputSize prop
          inputWidth,             // Apply custom width class
          positionClass,          // Apply positioning class
          className               // Merge with additional custom classes
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
