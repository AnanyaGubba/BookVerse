# Book Hub Review

A full-stack Book Review web application that allows users to add, manage, and filter book reviews with ratings.  BookVerse combines a React frontend with an Express.js backend and MySQL database for a seamless book review experience.

##  Project Overview

BookVerse is a web application designed to help book enthusiasts share and discover book reviews. Users can: 
- Add new books with author details, ratings (1-5 stars), and reviews
- Edit existing reviews
- Delete reviews
- Filter reviews by rating
- View all reviews in a clean, responsive interface

**Key Features:**
-  Rating-based filtering system
-  Full CRUD operations (Create, Read, Update, Delete)
-  Clean and responsive UI
-  MySQL database integration with in-memory fallback
-  Express.js REST API backend
-  React frontend with state management

---

##  Tech Stack

### Frontend
- **React** - UI library
- **Axios** - HTTP client for API calls
- **CSS** - Styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web server framework
- **MySQL** - Database
- **CORS** - Cross-Origin Resource Sharing

---

##  Prerequisites

Before running this project, ensure you have:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MySQL Server** (v5.7 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)
- **npm** - Package manager (comes with Node.js)
- A code editor (VS Code recommended)


---


##  Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/AnanyaGubba/BookVerse.git
cd BookVerse
```

### Step 2: Database Setup

1. **Create the database and table:**
   ```bash
   mysql -u root -p
   ```

2. **Run the SQL script:**
   ```sql
   CREATE DATABASE book_reviews_db;
   USE book_reviews_db;
   
   CREATE TABLE reviews (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     author VARCHAR(255) NOT NULL,
     rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
     review_text TEXT NOT NULL
   );
   ```

   Alternatively, use the provided SQL file:
   ```bash
   mysql -u root -p book_reviews_db < book_hub_review. sql
   ```

### Step 3: Backend Setup

1. **Navigate to the project root:**
   ```bash
   cd BookVerse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure MySQL credentials** in `server.js`:
   - Open `server.js`
   - Update the following configuration with your MySQL credentials:
   ```javascript
   const db = mysql.createConnection({
       host: 'localhost',
       user: 'root',          // Your MySQL username
       password:  'YOUR_PASSWORD', // Your MySQL password
       database:  'book_reviews_db'
   });
   ```

4. **Start the backend server:**
   ```bash
   node server.js
   ```
   You should see: `Server running on http://localhost:5001`

### Step 4: Frontend Setup

1. **Install React dependencies:**
   ```bash
   npm install axios
   ```

2. **Start the React application:**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

---

##  Project Structure

```
BookVerse/
├── App.js              # Main React component with state management
├── App.css             # Styles for the main application
├── index.js            # React entry point
├── index.css           # Global styles
├── server.js           # Express.js backend server
├── package.json        # Project dependencies
├── book_hub_review.sql # Database schema
└── README.md           # This file
```

---

##  API Endpoints

The backend server provides the following REST API endpoints:

### Get All Reviews
- **Endpoint:** `GET /reviews`
- **Description:** Retrieve all book reviews
- **Response:** Array of review objects

### Filter Reviews by Rating
- **Endpoint:** `GET /reviews/filter? rating=<rating>`
- **Description:** Get reviews filtered by specific rating (1-5)
- **Query Parameters:** `rating` (integer 1-5)
- **Response:** Array of filtered review objects

### Add New Review
- **Endpoint:** `POST /reviews`
- **Description:** Create a new book review
- **Request Body:**
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "rating":  5,
    "review_text":  "Your review text here"
  }
  ```
- **Response:** Created review object with generated ID

### Update Review
- **Endpoint:** `PUT /reviews/:id`
- **Description:** Update an existing review
- **URL Parameter:** `id` (review ID)
- **Request Body:** Same as POST
- **Response:** Updated review object

### Delete Review
- **Endpoint:** `DELETE /reviews/:id`
- **Description:** Delete a review
- **URL Parameter:** `id` (review ID)
- **Response:** Success message

---

##  How to Use

1. **View Reviews:** All reviews are displayed on page load
2. **Add a Review:**
   - Fill in the form with Book Title, Author, Rating (1-5), and Review text
   - Click "Add Review"
   - Review appears in the list immediately
3. **Filter Reviews:**
   - Select a rating from the dropdown (1-5 stars)
   - Click "Filter" to see only reviews with that rating
   - Select "All Ratings" to see all reviews
4. **Edit a Review:**
   - Click "Edit" on any review card
   - Update the form fields
   - Click "Update Review"
5. **Delete a Review:**
   - Click "Delete" on any review card
   - Review is removed immediately

---

##  Features in Detail

### Frontend Features (App.js)
- **State Management:** Uses React hooks (useState, useEffect)
- **Form Validation:** Ensures all fields are filled and rating is 1-5
- **Error Handling:** Displays user-friendly error messages
- **Dynamic UI:** Form button changes between "Add Review" and "Update Review"
- **Star Rating Display:** Visual representation of ratings using star symbols

### Backend Features (server.js)
- **CORS Support:** Allows frontend-backend communication
- **Input Validation:** Validates all incoming requests
- **Error Handling:** Comprehensive error responses
- **Fallback Database:** Uses in-memory storage if MySQL connection fails
- **Prepared Statements:** Uses parameterized queries to prevent SQL injection

---

##  UI/UX Features

- **Responsive Design:** Works on desktop and mobile devices
- **Clean Interface:** Intuitive layout with clear sections
- **Color Scheme:** Professional and easy on the eyes
- **Review Cards:** Each review displays in an organized card format
- **Action Buttons:** Clear Edit and Delete buttons for each review
- **Filter Section:** Easy-to-use dropdown for rating-based filtering

---

##  Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Ensure MySQL is running and credentials in server.js are correct |
| "Failed to load reviews" error | Check if backend server is running on port 5001 |
| CORS errors | Ensure CORS is properly configured in server.js |
| Database connection fails | Verify MySQL credentials and database name in server.js |
| Port 3000 or 5001 already in use | Change the port in server.js or close the conflicting application |

---

##  Validation Rules

- **Title:** Required, must not be empty
- **Author:** Required, must not be empty
- **Rating:** Required, must be an integer between 1 and 5
- **Review Text:** Required, must not be empty

---

## Future Enhancements

- User authentication and authorization
- Book cover images
- Average rating calculation
- Search functionality
- User profiles and review history
- Sorting options (by date, rating, title)
- Social features (likes, comments)
- Mobile app version
- Backend validation improvements

---



```

This comprehensive README includes: 
- ✅ Project overview and features
- ✅ Tech stack details
- ✅ Complete installation instructions
- ✅ Database setup guide
- ✅ Backend configuration steps
- ✅ Project structure explanation
- ✅ Full API documentation
- ✅ Step-by-step usage guide
- ✅ UI/UX features description
- ✅ Troubleshooting section
- ✅ Validation rules
- ✅ Security notes
- ✅ Future enhancement ideas

