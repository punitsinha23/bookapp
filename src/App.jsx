import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "./App.css";

import NavBar from "./NavBar";
import SearchBar from "./searchbar";
import FavoritePage from "./FavoritePage";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("fav");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favorites));

    async function fetchBooks() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/get/");
        const data = await response.json();
        console.log("Fetched Books:", data);
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    }

    fetchBooks();
  }, [favorites]);

  const toggleFavorite = (bookId) => {
    setFavorites((prevFav) =>
      prevFav.includes(bookId)
        ? prevFav.filter((id) => id !== bookId)
        : [...prevFav, bookId]
    );
  };

  const toggleDescription = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const filteredBooks = books.filter((book) =>
    (book.title + book.author).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HomePage = () => (
    <>
      <div className="hero-section">
        <div className="hero-text">
          <h2>Welcome to the Library 📚</h2>
          <p>Discover your next favorite book here.</p>
          <ul>
            <strong><li>A PERFECT PLACE FOR BOOK LOVERS</li></strong>
            <li>Find Trending Books.</li>
            <li>Search Your Favourite Books.</li>
            <li>Filter By Genre.</li>
            <li>Make Your Library.</li>
            <li>Add Books To Your Favourite.</li>
            <li>Download PDF For Free.</li>
            <li>Thanks for visiting us!</li>
          </ul>
        </div>
        <div className="banner">
          <img
            src="/image/ChatGPT Image Apr 18, 2025, 08_41_01 PM.png"
            alt="Library Banner"
          />
        </div>
      </div>

      <h1>Top Books</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="book-container">
          {filteredBooks.map((book, index) => (
            <div className="bookcard" key={book.id}>
              <img className="bookcover" src={book.cover_image} alt={book.title} />
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p
                className="book-desc"
                onClick={() => toggleDescription(index)}
                style={{ cursor: "pointer", color: "#444" }}
              >
                <strong>Desc: </strong>
                {expandedIndex === index
                  ? book.description
                  : book.description.slice(0, 50) + (book.description.length > 50 ? "..." : "")}
              </p>
              <Button
                variant="primary"
                style={{
                  marginTop: "auto",
                  alignSelf: "center",
                  width: "90%",
                }}
                onClick={() => window.open(book.download_link)}
              >
                Download ⬇️
              </Button>
              <Button 
                style={{marginTop:"10px" , width:"90%" , marginLeft:"10px"}}
                variant={favorites.includes(book.id) ? "danger" : "outline-danger"}
                onClick={() => toggleFavorite(book.id)}
              >
                {favorites.includes(book.id) ? "❤️ Unfav" : "🤍 Fav"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritePage favorites={favorites} />} />
      </Routes>
    </>
  );
}

export default App;
