# Task Manager Application

🌍 **Live Demo**: [your-live-site-link]

A full-stack task management web application built with React.js, Node.js, Express.js, and MongoDB.

## Features

* 🔐 **User Authentication**: JWT-based registration and login
* ✅ **Task Management**: Create, read, update, and delete tasks
* 🔍 **Search & Filter**: Search tasks by title/description, filter by status and priority
* 📊 **Sort Options**: Sort tasks by date, title, or priority
* 🎨 **Clean UI**: Responsive design with Tailwind CSS
* 🔒 **Secure**: Input validation, authentication middleware, and error handling

## Tech Stack

### Frontend

* React.js 18 with Vite
* Tailwind CSS for styling
* React Router for navigation
* Axios for API calls
* React Hot Toast for notifications
* Lucide React for icons

### Backend

* Node.js with Express.js
* MongoDB with Mongoose
* JWT authentication
* bcrypt for password hashing
* Express Validator for input validation
* Helmet for security headers
* CORS enabled

## Prerequisites

* Node.js (v16 or higher)
* MongoDB (v5.0 or higher)
* npm or yarn

## Installation & Setup

### Option 1: Manual Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/anjaya02/task-based-web-app.git
   cd task-based-web-app
   ```

2. **Set up the server**

   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env file with your configuration
   npm run dev
   ```

3. **Set up the client**

   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Set up MongoDB**
   You can use MongoDB Atlas or install MongoDB locally.
   Update the MONGODB\_URI in server/.env accordingly.

### Option 2: Docker Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/anjaya02/task-based-web-app.git
   cd task-based-web-app
   ```

2. **Run with Docker Compose**

   ```bash
   docker-compose up --build
   ```

This will start:

* MongoDB on port 27017
* Server on port 5000
* Client on port 3000

## Environment Variables

### Server (.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

### Client

Create a `.env` file in the client folder with the following:

```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication

* `POST /api/auth/register` - User registration
* `POST /api/auth/login` - User login
* `GET /api/auth/profile` - Get user profile

### Tasks

* `GET /api/tasks` - Get all tasks (with filtering and sorting)
* `POST /api/tasks` - Create a new task
* `PUT /api/tasks/:id` - Update a task
* `DELETE /api/tasks/:id` - Delete a task
* `GET /api/tasks/stats` - Get task statistics

## Usage

1. **Registration**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Dashboard**: View all your tasks in a clean interface
4. **Create Tasks**: Add new tasks with title, description, priority, and status
5. **Manage Tasks**: Edit or delete existing tasks
6. **Filter & Search**: Use the filter bar to find specific tasks

## Features in Detail

### Task Properties

* **Title**: Required, up to 100 characters
* **Description**: Optional, up to 500 characters
* **Status**: Pending, In Progress, or Completed
* **Priority**: Low, Medium, or High

### Filtering Options

* Search by title or description
* Filter by status
* Filter by priority
* Sort by date, title, or priority

## Security Features

* Password hashing with bcrypt
* JWT token authentication
* Input validation and sanitization
* Rate limiting
* CORS configuration
* Security headers with Helmet

## Testing

```bash
# Run server tests
cd server
npm test

# Run client tests
cd client
npm test
```

## Deployment

### Client (Vercel/Netlify)

1. Build the client: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set environment variables for production API URL

### Server (Render/Railway/Heroku)

1. Deploy the server folder to your hosting service
2. Set environment variables for production
3. Ensure MongoDB connection is configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

🌍 Live Demo: \[your-live-site-link]

## Support

For support, email [anjayainduwara@gmail.com](mailto:anjayainduwara@gmail.com) or create an issue in the repository.
