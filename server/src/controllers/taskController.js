import Task from "../models/Task.js";

// Get tasks with filtering, sorting, and pagination
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

    // Base filter - only user's tasks
    const filter = { user: req.user._id };

    // Add search filters if provided
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Add status filter
    if (status) {
      filter.status = status;
    }

    // Add priority filter
    if (priority) {
      filter.priority = priority;
    }

    // Configure sorting options
    const sortOptions = {};
    let customPrioritySort = false;

    switch (sortBy) {
      case "title":
        sortOptions.title = 1;
        break;
      case "priority":
        // Use custom priority sorting logic for proper high -> medium -> low order
        customPrioritySort = true;
        break;
      default:
        sortOptions.createdAt = -1; // Newest first
    }

    // Execute query with pagination
    let tasks;
    if (customPrioritySort) {
      // For priority sorting, use aggregation pipeline to create custom sort order
      const aggregationPipeline = [
        { $match: filter },
        {
          $addFields: {
            priorityOrder: {
              $switch: {
                branches: [
                  { case: { $eq: ["$priority", "high"] }, then: 3 },
                  { case: { $eq: ["$priority", "medium"] }, then: 2 },
                  { case: { $eq: ["$priority", "low"] }, then: 1 },
                ],
                default: 0,
              },
            },
          },
        },
        { $sort: { priorityOrder: -1 } }, // Sort by priority order descending (high to low)
        { $skip: (page - 1) * limit },
        { $limit: limit * 1 },
        { $project: { priorityOrder: 0 } }, // Remove the temporary field
      ];

      tasks = await Task.aggregate(aggregationPipeline);
    } else {
      tasks = await Task.find(filter)
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit);
    }

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
