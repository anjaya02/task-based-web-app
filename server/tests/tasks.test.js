import request from "supertest";
import app from "../src/app.js";

describe("Task Management Endpoints", () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    // Register and login a test user
    const userData = {
      username: `tasktest_${Date.now()}`,
      email: `tasktest_${Date.now()}@example.com`,
      password: "TestPassword123!",
    };

    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send(userData);

    authToken = registerResponse.body.token;
    userId = registerResponse.body.user.id;
  });

  describe("POST /api/tasks", () => {
    it("should create a new task successfully", async () => {
      const taskData = {
        title: "Test Task",
        description: "This is a test task",
        priority: "high",
        status: "pending",
      };

      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send(taskData)
        .expect(201);

      expect(response.body).toHaveProperty(
        "message",
        "Task created successfully"
      );
      expect(response.body.task).toHaveProperty("title", taskData.title);
      expect(response.body.task).toHaveProperty(
        "description",
        taskData.description
      );
      expect(response.body.task).toHaveProperty("priority", taskData.priority);
      expect(response.body.task).toHaveProperty("status", taskData.status);
      expect(response.body.task).toHaveProperty("user", userId);
    });

    it("should fail to create task without authentication", async () => {
      const taskData = {
        title: "Test Task",
        description: "This is a test task",
      };

      const response = await request(app)
        .post("/api/tasks")
        .send(taskData)
        .expect(401);

      expect(response.body).toHaveProperty(
        "message",
        "Access denied. No token provided."
      );
    });

    it("should fail to create task with invalid data", async () => {
      const taskData = {
        description: "Task without title",
      };

      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send(taskData)
        .expect(400);

      expect(response.body).toHaveProperty("message");
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "title",
          }),
        ])
      );
    });
  });

  describe("GET /api/tasks", () => {
    let taskId;

    beforeAll(async () => {
      // Create a test task
      const taskData = {
        title: "Get Test Task",
        description: "Task for GET endpoint testing",
        priority: "medium",
        status: "pending",
      };

      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send(taskData);

      taskId = response.body.task._id;
    });

    it("should get all tasks for authenticated user", async () => {
      const response = await request(app)
        .get("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("tasks");
      expect(Array.isArray(response.body.tasks)).toBe(true);
      expect(response.body.tasks.length).toBeGreaterThan(0);

      // Check that all tasks belong to the authenticated user
      response.body.tasks.forEach((task) => {
        expect(task.user).toBe(userId);
      });
    });

    it("should filter tasks by status", async () => {
      const response = await request(app)
        .get("/api/tasks?status=pending")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("tasks");
      response.body.tasks.forEach((task) => {
        expect(task.status).toBe("pending");
      });
    });

    it("should search tasks by title", async () => {
      const response = await request(app)
        .get("/api/tasks?search=Get Test")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("tasks");
      expect(response.body.tasks.length).toBeGreaterThan(0);

      const foundTask = response.body.tasks.find((task) =>
        task.title.includes("Get Test")
      );
      expect(foundTask).toBeDefined();
    });

    it("should sort tasks by priority correctly (high -> medium -> low)", async () => {
      // Create tasks with different priorities
      const taskData = [
        { title: "Low Priority Task", priority: "low" },
        { title: "High Priority Task", priority: "high" },
        { title: "Medium Priority Task", priority: "medium" },
      ];

      // Create the tasks
      for (const task of taskData) {
        await request(app)
          .post("/api/tasks")
          .set("Authorization", `Bearer ${authToken}`)
          .send(task);
      }

      // Get tasks sorted by priority
      const response = await request(app)
        .get("/api/tasks?sortBy=priority")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("tasks");
      expect(response.body.tasks.length).toBeGreaterThan(0);

      // Find our test tasks in the response
      const sortedTasks = response.body.tasks.filter((task) =>
        task.title.includes("Priority Task")
      );

      // Verify they are sorted correctly: high -> medium -> low
      expect(sortedTasks.length).toBe(3);

      // Check the order of priorities
      const priorities = sortedTasks.map((task) => task.priority);
      let highIndex = priorities.indexOf("high");
      let mediumIndex = priorities.indexOf("medium");
      let lowIndex = priorities.indexOf("low");

      // High should come before medium, medium should come before low
      expect(highIndex).toBeLessThan(mediumIndex);
      expect(mediumIndex).toBeLessThan(lowIndex);
    });
  });

  describe("PUT /api/tasks/:id", () => {
    let taskId;

    beforeAll(async () => {
      // Create a test task to update
      const taskData = {
        title: "Update Test Task",
        description: "Task for update testing",
        priority: "low",
        status: "pending",
      };

      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send(taskData);

      taskId = response.body.task._id;
    });

    it("should update task successfully", async () => {
      const updateData = {
        title: "Updated Task Title",
        status: "completed",
        priority: "high",
      };

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Task updated successfully"
      );
      expect(response.body.task).toHaveProperty("title", updateData.title);
      expect(response.body.task).toHaveProperty("status", updateData.status);
      expect(response.body.task).toHaveProperty(
        "priority",
        updateData.priority
      );
    });

    it("should fail to update non-existent task", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const updateData = {
        title: "Updated Title",
      };

      const response = await request(app)
        .put(`/api/tasks/${fakeId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData)
        .expect(404);

      expect(response.body).toHaveProperty("message", "Task not found");
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    let taskId;

    beforeAll(async () => {
      // Create a test task to delete
      const taskData = {
        title: "Delete Test Task",
        description: "Task for delete testing",
      };

      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send(taskData);

      taskId = response.body.task._id;
    });

    it("should delete task successfully", async () => {
      const response = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Task deleted successfully"
      );
    });

    it("should fail to delete non-existent task", async () => {
      const fakeId = "507f1f77bcf86cd799439011";

      const response = await request(app)
        .delete(`/api/tasks/${fakeId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(404);

      expect(response.body).toHaveProperty("message", "Task not found");
    });
  });
});
