# Task Manager Application

🌍 **Live Demo**: [https://task-based-web-app.vercel.app/](https://task-based-web-app.vercel.app/)
🔗 **Backend API**: [https://task-based-web-app.onrender.com](https://taskmanager-api-zalh.onrender.com/)

A full-stack task management web application built with React.js, Node.js, Express.js, and MongoDB.

## Features

- 🔐 **User Authentication**: JWT-based registration and login
- ✅ **Task Management**: Create, read, update, and delete tasks
- 🔍 **Search & Filter**: Search tasks by title/description, filter by status and priority
- 📊 **Sort Options**: Sort tasks by date, title, or priority
- 🎨 **Modern UI**: Responsive design with glassmorphism effects and Tailwind CSS
- � **Custom Modals**: Professional confirmation dialogs for critical actions
- �🧪 **Comprehensive Testing**: Unit tests for both frontend and backend components
- 🔒 **Secure**: Input validation, authentication middleware, and error handling
- 🚀 **Production Ready**: Docker support, error boundaries, and optimized builds
- 📝 **Well Documented**: Comprehensive code comments and clear documentation

## Tech Stack

### Frontend

- React.js 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Hot Toast for notifications
- Lucide React for icons

### Backend

- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- Express Validator for input validation
- Helmet for security headers
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn

## Installation & Setup

### Option 1: Quick Start (Recommended)

1. **Clone and setup everything with one command**

   ```bash
   git clone https://github.com/anjaya02/task-based-web-app.git
   cd task-based-web-app
   npm install  # Installs dependencies for both client and server
   npm run dev  # Starts both client and server concurrently
   ```

2. **Set up MongoDB**
   You can use MongoDB Atlas or install MongoDB locally.
   Update the MONGODB_URI in server/.env accordingly.

### Option 2: Manual Setup

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
   Update the MONGODB_URI in server/.env accordingly.

### Option 3: Docker Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/anjaya02/task-based-web-app.git
   cd task-based-web-app
   ```

2. **Run with Docker Compose**

   ```bash
   docker-compose up --build
   # Or use the npm script: npm run docker:up
   ```

This will start:

- MongoDB on port 27017
- Server on port 5000
- Client on port 3000

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

## Testing

### Root-Level Testing (Recommended)

```bash
# Test everything at once
npm test              # Run all tests (client + server)
npm run test:client   # Run only client tests
npm run test:server   # Run only server tests
```

### Client-Side Tests

```bash
cd client
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Server-Side Tests

```bash
cd server
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Test Coverage

- **Frontend**: TaskItem component, utility functions, and error boundaries
- **Backend**: Helper functions, authentication logic, and API validation

## Development Scripts

The root package.json provides convenient scripts for development:

```bash
npm install          # Install all dependencies (client + server)
npm run dev          # Start both client and server in development
npm test             # Run all tests
npm run docker:up    # Start with Docker Compose
npm run docker:down  # Stop Docker containers
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Tasks

- `GET /api/tasks` - Get all tasks (with filtering and sorting)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/stats` - Get task statistics

## Usage

1. **Registration**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Dashboard**: View all your tasks in a clean interface
4. **Create Tasks**: Add new tasks with title, description, priority, and status
5. **Manage Tasks**: Edit or delete existing tasks
6. **Filter & Search**: Use the filter bar to find specific tasks

## Features in Detail

### User Interface

- **Modern Design**: Glassmorphism effects with backdrop blur and gradient overlays
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Hover animations, loading states, and smooth transitions
- **Custom Modals**: Professional confirmation dialogs for delete operations
- **Toast Notifications**: Real-time feedback for user actions

### Task Properties

- **Title**: Required, up to 100 characters
- **Description**: Optional, up to 500 characters
- **Status**: Pending, In Progress, or Completed
- **Priority**: Low, Medium, or High
- **Timestamps**: Automatic creation and update tracking

### Filtering Options

- Search by title or description
- Filter by status
- Filter by priority
- Sort by date, title, or priority

### Performance Features

- **Optimistic UI Updates**: Immediate feedback before server confirmation
- **Error Boundaries**: Graceful error handling in React components
- **Lazy Loading**: Efficient component loading strategies
- **Database Indexing**: Optimized queries for fast task retrieval

## Security Features

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Stateless authentication with configurable expiration
- **Input Validation**: Server-side validation using express-validator
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Security Headers**: Helmet.js for security headers
- **Error Handling**: Global error middleware that doesn't expose sensitive data
- **Code Comments**: Comprehensive documentation for security-critical sections

## Project Structure

```
task-based-web-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main application pages
│   │   ├── context/        # React context providers
│   │   ├── services/       # API service layer
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── tests/          # Frontend tests
│   └── Dockerfile
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── config/         # Database configuration
│   │   └── utils/          # Backend utilities
│   └── tests/              # Backend tests
├── docker-compose.yml      # Docker orchestration
├── package.json           # Root package with scripts
└── README.md              # Project documentation
```

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

### Quick Deploy with Docker (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd task-based-web-app

# Start with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

### Manual Deployment

#### Client (Vercel/Netlify)

```bash
cd client
npm install
npm run build
# Deploy the 'dist' folder to your hosting service
# Set environment variable: VITE_API_URL=https://your-backend-url/api
```

#### Server (Render/Railway/Heroku)

```bash
cd server
npm install
# Set environment variables:
# NODE_ENV=production
# MONGODB_URI=your-mongodb-connection-string
# JWT_SECRET=your-secure-jwt-secret
# PORT=5000
npm start
```

### Environment Variables for Production

**Server (.env):**

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your-256-bit-secret-key
JWT_EXPIRES_IN=7d
```

**Client (.env):**

```bash
VITE_API_URL=https://your-backend-domain.com/api
```

## Production Deployment

This application is currently deployed and live:

- **Frontend**: Deployed on Vercel at [https://task-based-web-app-nine.vercel.app](https://task-based-web-app-nine.vercel.app)
- **Backend**: Deployed on Render at [https://task-based-web-app.onrender.com](https://task-based-web-app.onrender.com)
- **Database**: MongoDB Atlas cloud database

### Deployment Architecture

- **Frontend (Vercel)**: 
  - Automatic deployments from GitHub
  - Environment variable: `VITE_API_URL=https://task-based-web-app.onrender.com/api`
  - Optimized builds with Vite
  - Global CDN distribution

- **Backend (Render)**:
  - Automatic deployments from GitHub
  - Environment variables configured for production
  - Health check endpoint at `/health`
  - Graceful shutdown handling

- **Database (MongoDB Atlas)**:
  - Cloud-hosted MongoDB cluster
  - Connection pooling and automatic scaling
  - Database indexes for optimal performance

### Deployment Files

- `render.yaml` - Render deployment configuration
- `client/vercel.json` - Vercel deployment configuration  
- `PRODUCTION_GUIDE.md` - Detailed production deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email [anjayainduwara@gmail.com](mailto:anjayainduwara@gmail.com) or create an issue in the repository.
