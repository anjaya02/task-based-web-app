import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const {
      search,
      status,
      priority,
      sortBy = "createdAt",
      page = 1,
      limit = 10,
    } = req.query;

    // Build filter object
    const filter = { user: req.user._id };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    // Build sort object
    const sortOptions = {};
    switch (sortBy) {
      case "title":
        sortOptions.title = 1;
        break;
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        sortOptions.priority = 1;
        break;
      default:
        sortOptions.createdAt = -1;
    }

    const tasks = await Task.find(filter)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Task.countDocuments(filter);

    res.json({
      message: "Tasks retrieved successfully",
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, priority },
      { new: true, runValidators: true }
    );

    res.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(id);

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityStats = await Task.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      message: "Task statistics retrieved successfully",
      stats: {
        status: stats,
        priority: priorityStats,
      },
    });
  } catch (error) {
    console.error("Get task stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
