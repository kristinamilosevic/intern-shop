import React, { useEffect, useState } from "react";
import axios from "axios";
import homeImage from "../assets/home.jpg";
import AdTable from "./AdsTable";
import { fetchUserIdByUsername } from "../services/userService";

const Home: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!username) {
        setLoading(false);
        return;
      }
      try {
        const userId = await fetchUserIdByUsername(username); 
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Greška pri dohvatanju ID-ja korisnika:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserId();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-[#BDB395] font-semibold text-xl">
        Loading...
      </div>
    );
  }

  if (isLoggedIn && currentUserId !== null) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-[#BDB395]">All Ads</h1>
        <AdTable currentUserId={currentUserId} />
      </div>
    );
  }

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
        <button
          onClick={() => (window.location.href = "/register")}
          className="bg-[#BDB395] text-[#F6F0F0] border-none px-7 py-[14px] rounded-[8px] text-[1.1rem] cursor-pointer shadow-[0_4px_10px_rgba(189,179,149,0.6)] transition-colors duration-300 hover:bg-[#D5C7A3]"
        >
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default Home;
