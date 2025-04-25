import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "20px 0",
        marginLeft: "120px",
        backgroundColor: "#f5f5f5",
        borderRadius: "25px",
        padding: "5px 10px",
        width: "fit-content",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search books..."
        value={searchTerm}
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          fontSize: "16px",
          padding: "8px",
          width: "200px",
        }}
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
