import React, { useState } from "react";
import Input from "./ui/input"; // adjust the import path for your Input component
import { Button } from "./ui/button"; // adjust the import path for your Button component
import { ChevronRightIcon } from "@radix-ui/react-icons";

const FormComponent: React.FC = () => {
  // State to handle the input value
  const [inputValue, setInputValue] = useState("");

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents page reload
    console.log("Form submitted:", inputValue);
    alert(`form submitted with value ${inputValue}`);
    setInputValue("")
    // You can process the inputValue here or call an API
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {/* Input component for capturing user data */}
      <Input
      inputSize="medium" inputWidth="w-[70vw]" positionClass="absolute bottom-20 right-20" placeholder="Enter the text"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        
        
      />

      {/* Button component for submission */}
      <div className='absolute bottom-20 right-10'>
      <Button variant="default" type="submit" size="icon"><ChevronRightIcon className="h-4 w-4" /></Button>
          </div>
      
    </form>
  );
  
};

export default FormComponent;