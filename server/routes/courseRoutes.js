import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Course from "../models/courseModel.js";

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const courses = await Course.find({});

    res.json(courses);
  })
);

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  })
);

export default router;
