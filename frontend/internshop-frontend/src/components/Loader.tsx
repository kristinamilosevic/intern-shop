import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="w-12 h-12 border-4 border-[#BDB395] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
