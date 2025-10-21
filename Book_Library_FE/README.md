# 📚 Book Library — React + Open Library API

A modern, responsive web app built with React and Tailwind CSS, allowing users to search for books, explore trending titles, and view detailed information such as author, publication date, subjects, and number of pages — all powered by the Open Library API.

## 🌟 Features

🔍 **Search Books** — by title, author, or publication year

🧠 **Book Details** — view cover, description, author, subjects, number of pages, and publication date

📈 **Trending Books** — discover popular and trending titles from Open Library

📑 **Author Profiles** — view works by specific authors

💬 **Contact Page** — simple contact form for user messages or feedback

📱 **Responsive Design** — optimized for both mobile and desktop with Tailwind CSS

🎨 **Clean UI** — minimalist and visually appealing design with hover effects and smooth transitions


## 🧰 Tech Stack
Category	Technology
Frontend Framework	React
 (Vite setup)
Styling	Tailwind CSS

HTTP Client	Axios

Routing	React Router

## API Source	Open Library API
### ⚙️ Installation & Setup
1️⃣ **Clone the Repository**
git clone https://github.com/yourusername/book-library.git
cd book-library

2️⃣ **Install Dependencies**
npm install

3️⃣ **Run the Development Server**
npm run dev


Your app should now be live at:
👉 http://localhost:5173

## 🧭 Project Structure
book-library/
│
├── src/
│   ├── components/
│   │   ├── Homepage.jsx          # Main search and trending view
│   │   ├── BookDetail.jsx        # Detailed view for each book
│   │   ├── AuthorWorks.jsx       # Author's books and related info
│   │   ├── Trendings.jsx         # Displays trending or recommended books
│   │   ├── Contact.jsx           # Contact form component
│   │   ├── Header.jsx            # Navbar / hamburger menu
│   │   └── Loading.jsx           # Loading indicator
│   │
│   ├── App.jsx                   # App router and layout
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind CSS import
│
├── public/
│   └── favicon.ico
│
├── package.json
├── tailwind.config.js
└── README.md

## 🔑 Environment Variables (optional)

If you use any .env configuration (for example, future API keys or backend links):

Create a .env file in the root directory:

VITE_API_BASE_URL=https://openlibrary.org


And access it in code using:

const baseUrl = import.meta.env.VITE_API_BASE_URL

## 🧩 APIs Used

The project primarily integrates with the Open Library API, leveraging endpoints such as:

### Endpoint	Purpose
/search.json?title={title}	Search books by title
/search.json?author={author}	Search books by author
/works/{work_id}.json	Get detailed info about a specific book
/authors/{author_id}.json	Get author details
/authors/{author_id}/works.json	Get works by an author
/trending/daily.json or /lists	Fetch trending or recommended books

## 🧠 Key Concepts

- **Dynamic Routing:** Book and author pages use React Router’s useParams() to fetch data dynamically based on the URL.

- **Asynchronous Fetching:** Data is loaded from the Open Library API using Axios inside useEffect() hooks.

- **State Management:** Component-level state handled via React’s useState.

- **Conditional Rendering:** Handles loading, error, and data states gracefully.

- **Responsive Grid Layouts:** Tailwind’s grid and flex utilities create consistent layouts across screen sizes.

	
## 🚀 Future Improvements

🐻 Use Zustand for better state persistence

🧾 Add pagination to search results

💬 Connect contact form to backend or email service

❤️ Add “Favorites” feature (saved books)

🌙 Add light/dark mode toggle

📊 Improve recommendation algorithm

### 👨‍💻 Author - Sideeq Hammed