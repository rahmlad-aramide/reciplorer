// import { ReactElement } from "react";

// Format recipe instructions
export const FormatInstructions: React.FC<{instructions: string}> = ({instructions}) => {
    if (!instructions) {
      return (
        <p className="text-neutral-800 mt-2">No instruction(s) available</p>
      ); 
    }
  
    // Split and clean the instructions
    const steps = instructions
      .split("\r\n") // Split by line breaks
      .map((line) => line.trim()) // Remove extra spaces
      .filter((line) => line !== ""); // Remove empty lines
  
    // Map each line into JSX
    return steps.map((step, index) => {
      const isStep =
        step.toUpperCase().startsWith("STEP") ||
        step.toUpperCase().startsWith("NSTEP");
      return isStep ? (
        <h5 key={index} className="text-neutral-400 mt-2">
          {step}
        </h5>
      ) : (
        <p key={index} className="text-neutral-800 text-sm">
          {step}
        </p>
      );
    });
  };