import React from "react";
import homeImage from "../assets/home.jpg";

const Home: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "60px auto",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        borderRadius: "12px",
      }}
    >
      <img
        src={homeImage}
        alt="Marketplace"
        style={{
          width: "500px",
          height: "auto",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, textAlign: "left", color: "#5C533F" }}>
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
            fontWeight: "700",
            color: "#BDB395",
          }}
        >
          Sell&Buy
        </h1>
        <p
          style={{
            fontSize: "1.8rem",
            marginBottom: "25px",
            fontWeight: "600",
            color: "#D5C7A3",
          }}
        >
          Your trusted marketplace
        </p>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.6",
            marginBottom: "30px",
            color: "#8C7B55",
          }}
        >
          Welcome to Sell&Buy! Find amazing deals or sell your items easily and
          securely. Join thousands of satisfied users and start trading today!
        </p>
        <button
          onClick={() => (window.location.href = "/register")}
          style={{
            backgroundColor: "#BDB395",
            color: "#F6F0F0",
            border: "none",
            padding: "14px 28px",
            borderRadius: "8px",
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(189,179,149,0.6)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D5C7A3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#BDB395")}
        >
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default Home;
