import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "./App.css";
import AddBooks from "./AddBooks";

import NavBar from "./NavBar";
import SearchBar from "./searchbar";
import FavoritePage from "./FavoritePage";
import About from "./about";

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
    async function fetchBooks() {
      try {
        const response = await fetch("https://bookappapi-5smm.onrender.com/api/get");
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
  }, []);

 
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favorites));
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
          <h2>Welcome to MyOpenLibrary</h2>
          <p>Discover your next favorite book here.</p>
          <SearchBar  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <ul>
            <strong><li>A PERFECT PLACE FOR BOOK LOVERS</li></strong>
            <li>Find Trending Books.</li>
            <li>Search Your Favourite Books.</li>
            <li>Share your books.</li>
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="book-container">
          {filteredBooks.map((book, index) => (
            <div className="bookcard" key={book.id}>
              <img className="bookcover" src={book.cover_image} alt={book.title} />
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p className="book-desc" key={index}>
                <span
                  onClick={() => toggleDescription(index)}
                  style={{ cursor: "pointer", color: "#444" }}
                >
                  <strong>Desc: </strong>
                  {expandedIndex === index
                    ? book.description
                    : book.description.slice(0, 50) + (book.description.length > 50 ? "..." : "")}
                </span>
              </p>
              <Button
                type="button"
                variant="primary"
                style={{
                  marginTop: "auto",
                  alignSelf: "center",
                  width: "90%",
                }}
                
                onClick={(e) => {
                  e.preventDefault();
                  window.open(book.download_link, '_blank');}}
              >
                Download ⬇️
              </Button>
              <Button
                type="button"
                style={{ marginTop: "10px", width: "90%", marginLeft: "10px" }}
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
        <Route path="/AddBooks" element={<AddBooks onCreated={() => alert("Book Added Successfully")} />}/>
        <Route path="/About" element={<About/>}/>
      </Routes>
    </>
  );
}

export default App;
