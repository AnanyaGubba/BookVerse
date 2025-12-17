import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ id: null, title: '', author: '', rating: '', review_text: '' });
  const [filterRating, setFilterRating] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    axios.get('http://localhost:5001/reviews')
      .then(response => setReviews(response.data))
      .catch(() => setError('Failed to load reviews'));
  };

  const filterReviews = () => {
    if (!filterRating) {
      fetchReviews();
      return;
    }

    axios.get(`http://localhost:5001/reviews/filter?rating=${filterRating}`)
      .then(response => setReviews(response.data))
      .catch(() => setError('Failed to filter reviews'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveReview = (e) => {
    e.preventDefault();
    const { id, title, author, rating, review_text } = form;

    if (!title || !author || !rating || rating < 1 || rating > 5 || !review_text) {
      setError('All fields required & rating must be 1-5');
      return;
    }

    if (id) {
      axios.put(`http://localhost:5001/reviews/${id}`, { title, author, rating, review_text })
        .then(response =>
          setReviews(reviews.map(r => (r.id === id ? response.data : r)))
        )
        .catch(err => setError('Failed to update review: ' + (err.response?.data?.error || err.message)));
    } else {
      axios.post('http://localhost:5001/reviews', { title, author, rating, review_text })
        .then(response => {
          setReviews([...reviews, response.data]);
          setError('');
        })
        .catch(err => setError('Failed to add review: ' + (err.response?.data?.error || err.message)));
    }

    resetForm();
  };

  const editReview = (review) => setForm(review);

  const deleteReview = (id) => {
    axios.delete(`http://localhost:5001/reviews/${id}`)
      .then(() => setReviews(reviews.filter(r => r.id !== id)));
  };

  const resetForm = () =>
    setForm({ id: null, title: '', author: '', rating: '', review_text: '' });

  return (
    <div className="App">
      <h1>Book Review Hub</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={saveReview} className="review-form">
        <input type="text" name="title" value={form.title} placeholder="Book Title" onChange={handleInputChange} />
        <input type="text" name="author" value={form.author} placeholder="Author" onChange={handleInputChange} />
        <input type="number" name="rating" value={form.rating} placeholder="Rating (1-5)" min="1" max="5" onChange={handleInputChange} />
        <textarea name="review_text" value={form.review_text} placeholder="Your Review" onChange={handleInputChange} />

        <button type="submit">{form.id ? 'Update Review' : 'Add Review'}</button>
        {form.id && <button onClick={resetForm}>Cancel</button>}
      </form>

      <div className="filter">
        <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r} Stars</option>
          ))}
        </select>
        <button onClick={filterReviews}>Filter</button>
      </div>

      <div className="reviews">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <h3>{review.title}</h3>
            <p><strong>Author:</strong> {review.author}</p>
            <p><strong>Rating:</strong> {'★'.repeat(review.rating)}</p>
            <p>{review.review_text}</p>

            <div className="review-actions">
              <button onClick={() => editReview(review)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteReview(review.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
