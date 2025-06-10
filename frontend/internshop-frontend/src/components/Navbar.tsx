import React, { useEffect, useState } from "react";
import CreateAd from "./CreateAd";
import { Ad } from "../models/Ad"; 
import Button from "../components/Buttons";

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
    window.location.reload();
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveAd = (ad: Ad) => {
    closeModal();
    window.location.reload();
  };

  return (
    <>
      <nav className="absolute relative top-0 left-0 w-full bg-[#F2E2B1] px-5 py-2 flex justify-between items-center z-[1000] shadow-md">
        <a href="/" className="text-[#BDB395] font-bold text-lg no-underline">
          Sell&Buy
        </a>

        <div className="pr-10">
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="flex items-center text-[#BDB395] space-x-2">
                <svg
                  className="w-6 h-6 text-[#A08439]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                  <path d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
                </svg>
                <span>{user}</span>
                </span>
                <Button
                  onClick={openModal}
                  variant="primary"
                  size="small"
                >
                  + New Listing
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="primary"
                  size="small"
                >
                  Logout
                </Button>
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
