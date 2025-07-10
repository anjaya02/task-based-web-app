import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

const app = express();

// Initialize database connection
connectDB();

// Security middleware stack
app.use(helmet()); // Set security headers
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:3000",
      "https://taskmanager-frontend.vercel.app", // Update this with your actual Vercel domain
      /\.vercel\.app$/, // Allow all Vercel preview deployments
    ],
    credentials: true, // Allow cookies for authentication
  })
);

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Body parsing middleware with size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// API route handlers
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check endpoint for monitoring
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Global error handling middleware (must be last)
app.use(errorHandler);

// Catch-all 404 handler for unmatched routes
// Health check endpoint for monitoring
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: "1.0.0"
  });
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

// Start the server with enhanced error handling
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
