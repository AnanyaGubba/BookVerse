CREATE DATABASE book_reviews_db;
USE book_reviews_db;
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  review_text TEXT NOT NULL
);
