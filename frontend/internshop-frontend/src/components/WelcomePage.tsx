import React from "react";
import homeImage from "../assets/home.jpg";
import Button from "../components/Buttons";

const WelcomePage: React.FC = () => {
  return (
    <div className="max-w-[900px] mx-auto my-[60px] p-5 flex items-center gap-[40px] font-sans rounded-[12px]">
      <img
        src={homeImage}
        alt="Marketplace"
        className="w-[500px] h-auto object-cover flex-shrink-0"
      />
      <div className="flex-1 text-left text-[#5C533F]">
        <h1 className="text-[3rem] mb-[20px] font-bold text-[#BDB395]">Sell&Buy</h1>
        <p className="text-[1.8rem] mb-[25px] font-semibold text-[#D5C7A3]">
          Your trusted marketplace
        </p>
        <p className="text-[1.2rem] leading-[1.6] mb-[30px] text-[#8C7B55]">
          Welcome to Sell&Buy! Find amazing deals or sell your items easily and
          securely. Join thousands of satisfied users and start trading today!
        </p>
        <Button
          variant="primary"
          size="medium"
          onClick={() => (window.location.href = "/register")}
          className="bg-[#BDB395] text-[#F6F0F0] border-none px-7 py-[14px] rounded-[8px] text-[1.1rem] cursor-pointer shadow-[0_4px_10px_rgba(189,179,149,0.6)] transition-colors duration-300 hover:bg-[#D5C7A3]"
        >
          Sign Up Now
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
