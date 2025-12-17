const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5001; // different port

app.use(cors());
app.use(express.json());

// In-memory fallback database
let reviews = [
  { id: 1, title: 'Sample Book', author: 'Sample Author', rating: 5, review_text: 'Great book!' }
];
let nextId = 2;
let dbConnected = false;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // change if using another user
    password: 'your_password', // <--- REPLACE WITH YOUR MYSQL PASSWORD
    database: 'book_reviews_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        console.log('Using in-memory database instead');
        dbConnected = false;
        return;
    }
    dbConnected = true;
    console.log('Connected to MySQL');
});

// Get all reviews
app.get('/reviews', (req, res) => {
    if (dbConnected) {
        db.query('SELECT * FROM reviews', (err, results) => {
            if (err) {
                console.error('Error fetching reviews:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json(results);
        });
    } else {
        res.json(reviews);
    }
});

// Filter reviews by rating
app.get('/reviews/filter', (req, res) => {
    const { rating } = req.query;
    if (rating) {
        if (dbConnected) {
            db.query('SELECT * FROM reviews WHERE rating = ?', [rating], (err, results) => {
                if (err) {
                    console.error('Error filtering reviews:', err);
                    res.status(500).json({ error: 'Database error' });
                    return;
                }
                res.json(results);
            });
        } else {
            res.json(reviews.filter(r => r.rating == rating));
        }
    } else {
        res.json([]);
    }
});

// Add a new review
app.post('/reviews', (req, res) => {
    const { title, author, rating, review_text } = req.body;
    if (!title || !author || !rating || !review_text || rating < 1 || rating > 5) {
        res.status(400).json({ error: 'All fields are required, and rating must be between 1 and 5' });
        return;
    }

    if (dbConnected) {
        const query = 'INSERT INTO reviews (title, author, rating, review_text) VALUES (?, ?, ?, ?)';
        db.query(query, [title, author, rating, review_text], (err, result) => {
            if (err) {
                console.error('Error adding review:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ id: result.insertId, title, author, rating, review_text });
        });
    } else {
        const newReview = { id: nextId++, title, author, rating: parseInt(rating), review_text };
        reviews.push(newReview);
        res.json(newReview);
    }
});

// Update an existing review
app.put('/reviews/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, rating, review_text } = req.body;
    if (!title || !author || !rating || !review_text || rating < 1 || rating > 5) {
        res.status(400).json({ error: 'All fields are required, and rating must be between 1 and 5' });
        return;
    }

    if (dbConnected) {
        const query = 'UPDATE reviews SET title = ?, author = ?, rating = ?, review_text = ? WHERE id = ?';
        db.query(query, [title, author, rating, review_text, id], (err) => {
            if (err) {
                console.error('Error updating review:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ id, title, author, rating, review_text });
        });
    } else {
        const review = reviews.find(r => r.id == id);
        if (review) {
            review.title = title;
            review.author = author;
            review.rating = parseInt(rating);
            review.review_text = review_text;
            res.json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    }
});

// Delete review
app.delete('/reviews/:id', (req, res) => {
    const { id } = req.params;
    if (dbConnected) {
        db.query('DELETE FROM reviews WHERE id = ?', [id], (err) => {
            if (err) {
                console.error('Error deleting review:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Review deleted' });
        });
    } else {
        reviews = reviews.filter(r => r.id != id);
        res.json({ message: 'Review deleted' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

