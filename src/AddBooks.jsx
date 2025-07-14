import { useState, useEffect } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function AddBooks({ onCreated }) {
  const [myBooks, setMyBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    download_link: "",
    cover_image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setMyBooks(storedBooks);
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(myBooks));
  }, [myBooks]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://bookappapi-5smm.onrender.com/api/get/post/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      setMyBooks((prev) => [...prev, data]);

      setForm({
        title: "",
        author: "",
        description: "",
        download_link: "",
        cover_image: "",
      });

      onCreated();
    } catch (error) {
      setError(error.message || "Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (deleteIndex) => {
    try {
      const updatedBooks = myBooks.filter((_, index) => index !== deleteIndex);
      setMyBooks(updatedBooks);
    } catch (error) {
      setError(error.message || "Failed to delete book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="p-4 mb-5 shadow-sm">
            <h1 className="text-center mb-4">Add Your Book</h1>
            <form onSubmit={handleSubmit}>
              <Row>
                {["title", "author", "cover_image", "download_link"].map((field) => (
                  <Col md={6} key={field} className="mb-3">
                    <label htmlFor={field} className="form-label">
                      {field.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === "download_link" ? "url" : "text"}
                      onChange={handleChange}
                      value={form[field]}
                      required
                      className="form-control"
                      placeholder={`Enter ${field.replace("_", " ")}`}
                    />
                  </Col>
                ))}
              </Row>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="form-control"
                  placeholder="Enter a description"
                />
              </div>
              <div className="d-grid">
                <Button variant="primary" type="submit" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Adding...
                    </>
                  ) : (
                    "Add Book"
                  )}
                </Button>
              </div>
            </form>
          </Card>

          <h1 className="text-center mb-4">Your Books</h1>

          {myBooks.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {myBooks.map((book, index) => (
                <Col key={index}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={book.cover_image}
                      alt={book.title}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {book.author}
                      </Card.Subtitle>
                      <Card.Text className="flex-grow-1">
                        {book.description.length > 100
                          ? `${book.description.substring(0, 50)}...`
                          : book.description}
                      </Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(index)}
                        className="mt-auto"
                        disabled={loading}
                      >
                        {loading ? "Deleting..." : "Delete Book"}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5 bg-light rounded">
              <p className="fs-5 text-muted">No books added yet. Add your first book above!</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
