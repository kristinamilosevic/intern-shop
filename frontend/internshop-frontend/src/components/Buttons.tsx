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
    "font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-200";

  switch (variant) {
    case "primary":
      baseStyles += " bg-[#C3B091] text-white hover:bg-[#8E806A] focus:ring-[#A08439]";
      break;
    case "secondary":
      baseStyles += " bg-[#F2E2B1] text-[#8E806A] hover:bg-[#e1d09a] focus:ring-[#F2E2B1]";
      break;
      case "danger":
        baseStyles += " bg-[#E57373] text-white hover:bg-[#d16060] focus:ring-red-600";
        break;       
    case "success":
      baseStyles += " bg-[#5CB85C] text-white hover:bg-[#4cae4c] focus:ring-green-600";
      break;
    default:
      break;
  }

  switch (size) {
    case "small":
      baseStyles += " text-sm py-1 px-3";
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