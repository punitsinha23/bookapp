import React, { useEffect, useState } from "react";

function FavoritePage({ favorites }) {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("https://bookappapi-production-e3f8.up.railway.app/get/")
      .then((res) => res.json())
      .then((data) => setAllBooks(data));
  }, []);

  const favoriteBooks = allBooks.filter((book) =>
    favorites.includes(book.id)
  );

  const styles = {
    container: {
      padding: "30px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    heading: {
      fontSize: "2.5rem",
      textAlign: "center",
      marginBottom: "30px",
      color: "#343a40",
    },
    gridContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
    },
    bookCard: {
      backgroundColor: "#ffffff",
      border: "1px solid #dee2e6",
      borderRadius: "10px",
      padding: "15px",
      width: "22%", // ~4 cards in a row with some spacing
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    bookCover: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
      borderRadius: "6px",
      marginBottom: "10px",
    },
    title: {
      fontSize: "1.2rem",
      marginBottom: "8px",
      textAlign: "center",
      color: "#212529",
    },
    author: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "8px",
      textAlign: "center",
      color: "#495057",
    },
    description: {
      fontSize: "0.9rem",
      color: "#6c757d",
      textAlign: "center",
      marginBottom: "10px",
    },
    button: {
      padding: "8px 12px",
      backgroundColor: "#007bff",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Favourites</h1>
      {favoriteBooks.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>No favorites added yet.</p>
      ) : (
        <div style={styles.gridContainer}>
          {favoriteBooks.map((book, index) => (
            <div key={index} style={styles.bookCard}>
              <img src={book.cover_image} style={styles.bookCover} alt={book.title} />
              <h2 style={styles.title}>{book.title}</h2>
              <p style={styles.author}>Author: {book.author}</p>
              <p style={styles.description}>{book.description.slice(0, 100)}...</p>
              <button style={styles.button} onClick={() => window.open(book.download_link)}>Download</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritePage;
