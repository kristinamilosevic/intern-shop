import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "success";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; 
  size?: ButtonSize;      
  children: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary", 
  size = "medium",    
  children,            
  className = "",     
  ...props             
}) => {

  let baseStyles =
    "font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-200";

    switch (variant) {
        case "primary":
          baseStyles += " bg-[#D5C7A3] text-[#F6F0F0] hover:bg-[#BDB395] focus:ring-[#D5C7A3]";
          break;
        case "secondary":
          baseStyles += " bg-[#F2E2B1] text-[#5C533F] hover:bg-[#D5C7A3] focus:ring-[#F2E2B1]";
          break;
        case "danger":
          baseStyles += " bg-red-300 text-[#F6F0F0] hover:bg-red-400 focus:ring-red-500";
          break;
        case "success":
          baseStyles += " bg-green-500 text-white hover:bg-green-600 focus:ring-green-700";
          break;
        default:
          break;
      }
    
  switch (size) {
    case "small":
      baseStyles += " text-sm py-1 px-2";
      break;
    case "medium":
      baseStyles += " text-base py-2 px-4"; 
      break;
    case "large":
      baseStyles += " text-lg py-3 px-6"; 
      break;
    default:
      break;
  }

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;