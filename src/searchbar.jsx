import React, { useState, useEffect } from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Conditional styles based on window width
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    margin: "20px 0",
    backgroundColor: "#f5f5f5",
    borderRadius: "25px",
    padding: "5px 10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    justifyContent: "center", // Center content horizontally
    marginLeft: windowWidth <= 600 ? "0px" : "120px", // No margin for mobile
    marginRight: windowWidth <= 600 ? "0px" : "120px", // No margin for mobile
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: windowWidth <= 600 ? "14px" : "16px", // Adjust font size on mobile
    padding: "8px",
    width: windowWidth <= 600 ? "100%" : "200px", // Full width on mobile, fixed width on desktop
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search books..."
        value={searchTerm}
        style={inputStyle}
        autoFocus
      />
      <img
        src="https://img.icons8.com/?size=100&id=7695&format=png&color=000000"
        alt="search icon"
        style={{ width: "24px", marginLeft: "10px", cursor: "pointer" }}
      />
    </div>
  );
}

export default SearchBar;
