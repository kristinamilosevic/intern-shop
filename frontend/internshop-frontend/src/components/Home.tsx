import React, { useEffect, useState } from "react";
import AdsTable from "./AdsTable";
import WelcomePage from "./WelcomePage";
import { fetchUserIdByUsername } from "../services/userService";
import Loader from "../components/Loader";

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
        console.error("Error fetching user ID:", error);
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
    return <Loader />;
  }

  if (isLoggedIn && currentUserId !== null) {
    return (
      <div className="container mx-auto px-4 py-6">
        <AdsTable currentUserId={currentUserId} />
      </div>
    );
  }

  return <WelcomePage />;
};

export default Home;
