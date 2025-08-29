const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Public routes (no authentication required)
router.get('/', courseController.getAllCourses);
router.get('/featured', courseController.getFeaturedCourses);
router.get('/stats', courseController.getCourseStats);
router.get('/search', courseController.searchCourses);
router.get('/:id', courseController.getCourseById);

// Protected routes (authentication required)
// Note: You'll need to add authentication middleware here later
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
