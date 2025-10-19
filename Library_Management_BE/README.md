# 📚 Library Management API

A Library Management System API built with Django REST Framework (DRF) and MySQL, containerized with Docker.
It allows users to browse, borrow, and return books, while administrators and librarians can manage the catalog.

## 🚀 Features
### 🔐 Authentication & Users

- Custom user model with email-based login and user roles (Admin, Librarian, Regular User).

- Token-based authentication using Django REST Framework.

- Registration, login, and logout endpoints.

### 📘 Book & Author Management

- CRUD operations for Books and Authors.

- Automatically track who added each book.

- Filter and search books by:

- Availability

- Title

- Author

- ISBN

### 📦 Borrowing System

- Users can check out available books.

- Only one copy per user at a time.

- Return system updates availability automatically.

- Borrow records log checkout and return dates.

### ⚙️ Permissions

- Only admins/librarians can create, update, or delete books.

- Authenticated users can borrow or return books.

- Unauthenticated users can view the catalog.

### 📄 Pagination & Filtering

- Built-in pagination for book listings.

- Filtering with django-filter integration.

## 🧱 Project Structure
library_project/
├── library_api/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   ├── permissions.py
│   └── tests/
├── library_project/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── docker-compose.yml
├── Dockerfile
└── README.md

## 🐳 Installation & Setup
### 1️⃣ Clone the repository
git clone https://github.com/your-username/library-management-api.git
cd library-management-api

### 2️⃣ Set up environment variables

Create a .env file in the project root, following .env.example

### 3️⃣ Run with Docker
docker-compose up --build


This will:

- Build the Django container.

- Start the MySQL database container.

- Run migrations automatically if configured.

## 🧰 Manual Setup (Without Docker)

If you prefer to run locally:

### 1️⃣ Create and activate a virtual environment
python -m venv venv
source venv/bin/activate

### 2️⃣ Install dependencies
pip install -r requirements.txt

### 3️⃣ Configure your database in settings.py

Example (for MySQL):

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'library_db',
        'USER': 'root',
        'PASSWORD': 'yourpassword',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

### 4️⃣ Run migrations and start the server
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

## 🔑 Authentication

Use Token Authentication.
Obtain a token by sending credentials to the login endpoint, then include it in requests:

Authorization: Token your_token_here

## 🧩 API Endpoints

### Endpoint	Method	Description	Permission
- /library/books/	GET	List all books (with filters, pagination)	Public
- /library/books/create/	POST	Add a new book	Admin / Librarian
- Example:
POST /library/books/create/
{
  "title": "Django for Beginners",
  "isbn": 9781492076305,
  "year_published": 2021,
  "author": 1,
  "total_copies": 3
}
/library/books/<id>/	GET	Get book details	Public
/library/books/<id>/update/	PUT	Update book details	Admin / Librarian
/library/books/<id>/delete/	DELETE	Delete a book	Admin 
/library/authors/	GET, POST	List or add authors	Public
/library/authors/<id>/	GET	Get book details	Public
/library/authors/create/	POST	Create a new Author	Admin / Librarian
- Example:
POST /library/authors/create/
{
  "name": "J.K. Rowling"
}
/library/authors/<id>/update/	PUT	Update book details	Admin / Librarian
/library/authors/<id>/delete/	DELETE	Delete a book	Admin
/library/books/book_checkout/	POST	Borrow a book	Authenticated user
/library/books/book_return/	POST	Return a borrowed book	Authenticated user
/auth/create_user	POST	Create a new user	Public
- Example: 
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword",
}
/auth/login/	POST	Log in and get token	Public
- Example:
{
  "username": "johndoe",
  "password": "securepassword"
}

## 🔍 Filtering
### Examples
GET /library/books/?title=django
GET /library/books/?author=1
GET /library/books/?available=True

<!-- 🧠 Models Overview
User

username

email

role (Admin, Librarian, Member)

date_joined

is_active

Author

name

(optionally linked to User)

Book

title

author

isbn

total_copies

available_copies

year_published

added_by (auto set to current user)

BorrowRecord

user

book

checkout_date

return_date

🧪 Running Tests

If you’ve written tests, run them inside Docker or locally:

docker exec -it library_container python manage.py test


or

python manage.py test -->

## 🧩 Useful Commands

- docker exec -it library_container bash	Open Django shell in container
- docker exec -it db_container mysql -u root -p	Open MySQL shell
- python manage.py createsuperuser	Create an admin user
- python manage.py shell	Open Django interactive shell

## 🛠️ Tech Stack

- kend: Django, Django REST Framework

- Database: MySQL

- Authentication: Token Authentication

- Containerization: Docker, Docker Compose

- Filtering: django-filter

- Pagination: DRF PageNumberPagination

## 📬 Future Improvements

- Add JWT authentication

- Add email verification and password reset

- Add user profile management

- Add automatic overdue reminders for borrowed books

- Add frontend (React or Vue) for UI

### 👨‍💻 Author - Sideeq Hammed