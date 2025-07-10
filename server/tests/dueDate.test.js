const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/User");
const Task = require("../src/models/Task");

describe("Due Date API Tests", () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(
      process.env.MONGODB_TEST_URI ||
        "mongodb://localhost:27017/taskmanager-test"
    );

    // Create test user
    const user = await User.create({
      name: "Test User",
      email: "test@test.com",
      password: "password123",
    });
    userId = user._id;

    // Get auth token
    const response = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "password123",
    });

    authToken = response.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Task.deleteMany({});
  });

  describe("POST /api/tasks - Due Date Validation", () => {
    it("should accept valid future due date", async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Test Task",
          description: "Test Description",
          dueDate: tomorrow.toISOString(),
        });

      expect(response.status).toBe(201);
      expect(response.body.task).toBeDefined();
      expect(response.body.task.dueDate).toBeDefined();
    });

    it("should accept due date for today", async () => {
      const today = new Date();

      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Test Task",
          description: "Test Description",
          dueDate: today.toISOString(),
        });

      expect(response.status).toBe(201);
      expect(response.body.task).toBeDefined();
    });

    it("should reject past due dates", async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Test Task",
          description: "Test Description",
          dueDate: yesterday.toISOString(),
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Due date cannot be in the past");
    });

    it("should accept task without due date", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Test Task",
          description: "Test Description",
        });

      expect(response.status).toBe(201);
      expect(response.body.task).toBeDefined();
      expect(response.body.task.dueDate).toBeUndefined();
    });

    it("should handle null due date", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Test Task",
          description: "Test Description",
          dueDate: null,
        });

      expect(response.status).toBe(201);
      expect(response.body.task).toBeDefined();
    });

    it("should handle empty string due date", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Test Task",
          description: "Test Description",
          dueDate: "",
        });

      expect(response.status).toBe(201);
      expect(response.body.task).toBeDefined();
    });
  });

  describe("PUT /api/tasks/:id - Due Date Updates", () => {
    let taskId;

    beforeEach(async () => {
      const task = await Task.create({
        title: "Original Task",
        description: "Original Description",
        user: userId,
      });
      taskId = task._id;
    });

    it("should allow updating to valid future due date", async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Updated Task",
          dueDate: tomorrow.toISOString(),
        });

      expect(response.status).toBe(200);
      expect(response.body.task.dueDate).toBeDefined();
    });

    it("should reject updating to past due date", async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Updated Task",
          dueDate: yesterday.toISOString(),
        });

      expect(response.status).toBe(400);
    });

    it("should allow removing due date", async () => {
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Updated Task",
          dueDate: null,
        });

      expect(response.status).toBe(200);
    });
  });
});

module.exports = {};
