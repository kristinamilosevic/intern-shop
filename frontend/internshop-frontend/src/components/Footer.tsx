import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#F2E2B1",
      color: "#BDB395",
      textAlign: "center",
      padding: "10px 20px",
      boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
      fontSize: "14px",
      fontWeight: "500",
      zIndex: 1000,
      userSelect: "none"
    }}>
      <div>© {new Date().getFullYear()} Sell&Buy.</div>
      <div>All rights reserved.</div>
    </footer>
  );
};

export default Footer;
