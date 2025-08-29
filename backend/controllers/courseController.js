const Course = require('../models/courseModel');
const Module = require('../models/moduleModel');

// Get all courses with filtering and pagination
const getAllCourses = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      level, 
      category, 
      search, 
      featured,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (level) filter.level = level;
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;
    
    const courses = await Course.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Course.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: courses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error.message
    });
  }
};

// Get course by ID with modules
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id).select('-__v');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Get modules for this course
    const modules = await Module.find({ 
      courseId: id, 
      isActive: true 
    })
    .sort({ order: 1 })
    .select('-__v');

    // Increment students count (view count)
    await Course.findByIdAndUpdate(id, { $inc: { students: 1 } });

    res.status(200).json({
      success: true,
      data: {
        ...course.toObject(),
        modules
      }
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
      error: error.message
    });
  }
};

// Create new course
const createCourse = async (req, res) => {
  try {
    const courseData = req.body;

    // Validate required fields
    const requiredFields = ['title', 'instructor', 'description', 'level', 'duration'];
    for (const field of requiredFields) {
      if (!courseData[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    const course = new Course(courseData);
    await course.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create course',
      error: error.message
    });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const course = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update course',
      error: error.message
    });
  }
};

// Delete course (soft delete)
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete course',
      error: error.message
    });
  }
};

// Get featured courses
const getFeaturedCourses = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const courses = await Course.find({ 
      featured: true, 
      isActive: true 
    })
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .select('-__v');

    res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Error fetching featured courses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured courses',
      error: error.message
    });
  }
};

// Get course statistics
const getCourseStats = async (req, res) => {
  try {
    const stats = await Course.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalCourses: { $sum: 1 },
          totalStudents: { $sum: '$students' },
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: '$reviews' },
          coursesByLevel: {
            $push: {
              level: '$level',
              count: 1
            }
          }
        }
      }
    ]);

    // Process level statistics
    const levelStats = {};
    if (stats[0]?.coursesByLevel) {
      stats[0].coursesByLevel.forEach(item => {
        levelStats[item.level] = (levelStats[item.level] || 0) + item.count;
      });
    }

    const result = {
      totalCourses: stats[0]?.totalCourses || 0,
      totalStudents: stats[0]?.totalStudents || 0,
      averageRating: stats[0]?.averageRating || 0,
      totalReviews: stats[0]?.totalReviews || 0,
      coursesByLevel: levelStats
    };

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching course stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course statistics',
      error: error.message
    });
  }
};

// Search courses
const searchCourses = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const courses = await Course.find({
      isActive: true,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { instructor: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    })
    .sort({ rating: -1, students: -1 })
    .limit(parseInt(limit))
    .select('-__v');

    res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search courses',
      error: error.message
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getFeaturedCourses,
  getCourseStats,
  searchCourses
};
