import React, { useEffect, useState } from "react";
import axios from "axios";

const BookDetails = () => {
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((response) => {
        setBookData(response.data.books);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Error: Not Found (404)");
        } else {
          setError("An error occurred while fetching data.");
        }
      });
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {bookData.map((book) => (
        <div key={book.id} className="container">
          <h2>{book.title}</h2>
          <div className="flex">
            <img src={book.imageLinks.thumbnail} alt={book.title} />
            <p className="desc">{book.description}</p>
            <p className="author">Authors: {book.authors.join(", ")}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BookDetails;
