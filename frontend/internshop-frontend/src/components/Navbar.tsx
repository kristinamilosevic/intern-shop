import React, { useEffect, useState } from "react";
import CreateAd from "./CreateAd";
import { Ad } from "../models/Ad"; 

const Navbar: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const updateUserFromStorage = () => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername && storedUsername !== "undefined" && storedUsername !== "null") {
        setUser(storedUsername);
      } else {
        setUser(null);
      }
    };

    updateUserFromStorage();

    window.addEventListener("storage", updateUserFromStorage);

    return () => {
      window.removeEventListener("storage", updateUserFromStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUser(null);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveAd = (ad: Ad) => {
    console.log("Novi oglas:", ad);
   
    closeModal();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#F2E2B1] px-5 py-2 flex justify-between items-center z-[1000] shadow-md">
        <a href="/" className="text-[#BDB395] font-bold text-lg no-underline">
          Sell&Buy
        </a>

        <div className="pr-10">
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-[#BDB395]">loggedin: {user}</span>
                <button
                  onClick={openModal}
                  className="bg-[#D5C7A3] text-[#F6F0F0] px-3 py-1 rounded hover:bg-[#b0a67e] transition border-none"
                >
                  + New Listing
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-[#BDB395] text-[#F6F0F0] px-3 py-1 rounded cursor-pointer hover:bg-[#a09a73] transition border-none"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="bg-[#D5C7A3] text-[#F6F0F0] px-3 py-1 rounded no-underline hover:bg-[#b0a67e] transition"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-[#D5C7A3] text-[#F6F0F0] px-3 py-1 rounded no-underline hover:bg-[#b0a67e] transition"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      <CreateAd
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveAd}
      />
    </>
  );
};

export default Navbar;
