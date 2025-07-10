// Test script to verify priority sorting logic
import mongoose from "mongoose";
import Task from "./src/models/Task.js";

const testPrioritySorting = async () => {
  try {
    // Mock filter for testing
    const filter = { user: new mongoose.Types.ObjectId() };

    // Test the aggregation pipeline logic
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
      { $project: { priorityOrder: 0 } }, // Remove the temporary field
    ];

    console.log("Priority sorting aggregation pipeline:");
    console.log(JSON.stringify(aggregationPipeline, null, 2));

    // Test the switch logic with mock data
    const testData = [
      { priority: "low", title: "Low task" },
      { priority: "high", title: "High task" },
      { priority: "medium", title: "Medium task" },
    ];

    console.log("\nTest data before sorting:", testData);

    // Manual sort to verify logic
    const sorted = testData.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    console.log("Expected sorted order (high to low):", sorted);
  } catch (error) {
    console.error("Error testing priority sorting:", error);
  }
};

testPrioritySorting();
