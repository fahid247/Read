import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router";
import "animate.css";
import useAxios from "../../Hooks/UseAxios";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const Axios = useAxios();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await Axios.get("/public/books");
        const sortedBooks = response.data.slice(0, 6);
        setBooks(sortedBooks);
      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    };

    fetchBooks();
  }, [Axios]);

  //console.log(books);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "animate__animated",
              "animate__fadeInUp"
            );
            entry.target.style.opacity = 1;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.opacity = 0;
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [books]);

  const handleShowAll = () => {
    navigate("/allbooks");
  };

  return (
    <section className="py-16 bg-base-300">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary text-[clamp(2rem,3vw,3.25rem)]">Latest Books</h2>
          <button
            onClick={handleShowAll}
            className="bg-primary hover:bg-secondary-content text-white font-semibold px-4 py-2 rounded transition"
          >
            Show All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <div
              key={book._id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition  hover:scale-105 transform duration-300"
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-48 object-cover hover:scale-110 transition duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{book.name}</h3>
                <p className="text-gray-600 mb-1">Category : {book.category}</p>
                <p className="text-gray-600 mb-1">Pages : {book.pages}</p>
                <p className="text-gray-800 font-medium mb-2">
                  Author: {book.author}
                </p>
                <p className="text-gray-600 font-medium mb-4">
                  Rating: {book.rating}
                </p>
                <button
                  onClick={() => {
                    navigate(`/book-details/${book._id}`);
                  }}
                  className="bg-primary hover:bg-secondary-content text-white font-semibold px-4 py-2 rounded transition hover:scale-110  duration-500 cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBooks;
