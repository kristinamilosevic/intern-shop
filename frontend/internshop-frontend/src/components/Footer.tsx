import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#F2E2B1] text-[#BDB395] text-center py-[10px] px-[20px] shadow-[0px_-2px_5px_rgba(0,0,0,0.1)] text-sm font-medium z-[1000] select-none">
      <div>© {new Date().getFullYear()} Sell&Buy.</div>
      <div>All rights reserved.</div>
    </footer>
  );
};

export default Footer;
