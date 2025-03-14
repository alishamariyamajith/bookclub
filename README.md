# BookClub Application

A web application for book enthusiasts to discover, track, and share their reading experiences.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bookclub.git
cd bookclub
```

2. Set up environment variables:

Create `.env` files in both frontend and backend directories using the provided templates:

**Backend (.env)**:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bookclubDB
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env)**:
```
REACT_APP_API_URL=http://localhost:5000
PORT=3000
```

3. Start the application:

#### Using the provided scripts:

**Windows**:
```bash
start-dev.bat
```

**Linux/Mac**:
```bash
chmod +x init-and-start.sh
./init-and-start.sh
```

#### Manual startup:

1. Start MongoDB:
```bash
mongod
```

2. Initialize database:
```bash
cd backend
mongosh "mongodb://127.0.0.1:27017/bookclubDB" init-db.mongodb.js
```

3. Start backend server:
```bash
cd backend
npm install
npm start
```

4. Start frontend server:
```bash
cd frontend
npm install
npm start
```

### Accessing the Application

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)
- API Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Available Features

1. Book Discovery
   - Browse top-rated books
   - View book recommendations
   - Search for books by title, author, or genre

2. Book Details
   - View detailed information about books
   - See ratings and reviews
   - View book cover images

### API Endpoints

- `GET /api/books` - Get all books with optional filtering
- `GET /api/books/top-rated` - Get top-rated books
- `GET /api/books/:id` - Get specific book details

### Troubleshooting

1. If you see "Failed to load recommendations":
   - Ensure MongoDB is running
   - Check if the database is initialized with sample data
   - Verify backend server is running on port 5000
   - Check browser console for specific error messages

2. Database Issues:
   - Run `mongosh "mongodb://127.0.0.1:27017/bookclubDB" init-db.mongodb.js` to reinitialize the database
   - Check MongoDB logs in `backend/logs/mongodb.log`

3. Connection Issues:
   - Verify environment variables are set correctly
   - Ensure no other services are using ports 3000 or 5000
   - Check CORS settings if using custom domains

### Stopping the Application

**Windows**:
```bash
stop-dev.bat
```

**Linux/Mac**:
```bash
# Press Ctrl+C in the terminal running init-and-start.sh
# Or kill the processes manually:
pkill -f node
pkill -f mongod
```

### Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Create a pull request

### License

This project is licensed under the MIT License - see the LICENSE file for details.
