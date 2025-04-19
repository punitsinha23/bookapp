import React, { useRef, useEffect } from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  // Creating a reference for the input element
  const inputRef = useRef(null);

  // Keeping the input focused after every render
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchTerm]); // Only trigger focus when searchTerm changes

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "20px 0",
        marginLeft: "100px",
        backgroundColor: "#f5f5f5",
        borderRadius: "25px",
        padding: "10px 15px",
        width: "fit-content",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <input
        ref={inputRef} // Attach the ref to the input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          fontSize: "16px",
          padding: "8px",
          width: "200px",
        }}
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
