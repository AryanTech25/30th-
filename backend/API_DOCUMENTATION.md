# Course Management API Documentation

## Base URL
```
http://localhost:5000/api/courses
```

## Authentication
Most endpoints are public, but admin operations (POST, PUT, DELETE) will require authentication in future updates.

## Endpoints

### 1. Get All Courses
**GET** `/api/courses`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `level` (optional): Filter by level (Beginner, Intermediate, Advanced)
- `category` (optional): Filter by category
- `search` (optional): Search in title, description, instructor, tags
- `featured` (optional): Filter featured courses (true/false)
- `sortBy` (optional): Sort field (default: createdAt)
- `sortOrder` (optional): Sort order (asc/desc, default: desc)

**Example Request:**
```
GET /api/courses?page=1&limit=5&level=Beginner&featured=true
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "course_id",
      "title": "Machine Learning Fundamentals",
      "instructor": "Dr. Sarah Johnson",
      "description": "Master the fundamentals of machine learning...",
      "level": "Beginner",
      "duration": "8 weeks",
      "students": 1250,
      "rating": 4.8,
      "reviews": 89,
      "price": "Free",
      "thumbnail": "/ml.jpeg",
      "tags": ["Machine Learning", "AI", "Python"],
      "featured": true,
      "category": "AI/ML",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 5
  }
}
```

### 2. Get Course by ID
**GET** `/api/courses/:id`

**Example Request:**
```
GET /api/courses/64f1a2b3c4d5e6f7g8h9i0j1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "course_id",
    "title": "Machine Learning Fundamentals",
    "instructor": "Dr. Sarah Johnson",
    "description": "Master the fundamentals of machine learning...",
    "level": "Beginner",
    "duration": "8 weeks",
    "students": 1251,
    "rating": 4.8,
    "reviews": 89,
    "price": "Free",
    "thumbnail": "/ml.jpeg",
    "tags": ["Machine Learning", "AI", "Python"],
    "instructorBio": "Dr. Sarah Johnson is a leading expert...",
    "instructorAvatar": "/placeholder-user.jpg",
    "learningObjectives": [
      "Understand core ML algorithms",
      "Implement supervised and unsupervised learning"
    ],
    "prerequisites": [
      "Basic Python programming",
      "Fundamental mathematics"
    ],
    "certificate": true,
    "featured": true,
    "category": "AI/ML",
    "modules": [
      {
        "_id": "module_id",
        "courseId": "course_id",
        "moduleId": "introduction",
        "title": "Introduction to Machine Learning",
        "description": "Overview of ML concepts and applications",
        "videoContent": {
          "title": "What is Machine Learning?",
          "duration": "15:30",
          "videoUrl": "https://example.com/ml-intro-video",
          "transcript": "Machine learning is a subset of artificial intelligence..."
        },
        "documentation": {
          "title": "ML Fundamentals Guide",
          "content": "This comprehensive guide covers the basics..."
        },
        "order": 1,
        "estimatedTime": 45,
        "difficulty": "Easy",
        "isActive": true
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Get Featured Courses
**GET** `/api/courses/featured`

**Query Parameters:**
- `limit` (optional): Number of featured courses (default: 6)

**Example Request:**
```
GET /api/courses/featured?limit=3
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "course_id",
      "title": "Machine Learning Fundamentals",
      "instructor": "Dr. Sarah Johnson",
      "featured": true,
      "thumbnail": "/ml.jpeg",
      "rating": 4.8,
      "students": 1250
    }
  ]
}
```

### 4. Search Courses
**GET** `/api/courses/search`

**Query Parameters:**
- `q` (required): Search query
- `limit` (optional): Number of results (default: 10)

**Example Request:**
```
GET /api/courses/search?q=machine learning&limit=5
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "course_id",
      "title": "Machine Learning Fundamentals",
      "instructor": "Dr. Sarah Johnson",
      "description": "Master the fundamentals of machine learning...",
      "rating": 4.8,
      "students": 1250
    }
  ]
}
```

### 5. Get Course Statistics
**GET** `/api/courses/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCourses": 25,
    "totalStudents": 15000,
    "averageRating": 4.6,
    "totalReviews": 1200,
    "coursesByLevel": {
      "Beginner": 10,
      "Intermediate": 8,
      "Advanced": 7
    }
  }
}
```

### 6. Create Course (Admin)
**POST** `/api/courses`

**Request Body:**
```json
{
  "title": "New Course Title",
  "instructor": "Instructor Name",
  "description": "Course description...",
  "level": "Beginner",
  "duration": "6 weeks",
  "price": "Free",
  "thumbnail": "/course-thumbnail.jpg",
  "tags": ["AI", "Machine Learning"],
  "instructorBio": "Instructor biography...",
  "learningObjectives": [
    "Objective 1",
    "Objective 2"
  ],
  "prerequisites": [
    "Prerequisite 1",
    "Prerequisite 2"
  ],
  "certificate": true,
  "featured": false,
  "category": "AI/ML",
  "modules": [
    {
      "id": "module-1",
      "title": "Module 1 Title",
      "description": "Module 1 description"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "_id": "new_course_id",
    "title": "New Course Title",
    "instructor": "Instructor Name",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 7. Update Course (Admin)
**PUT** `/api/courses/:id`

**Request Body:** Same as create course (all fields optional)

**Response:**
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "_id": "course_id",
    "title": "Updated Course Title",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 8. Delete Course (Admin)
**DELETE** `/api/courses/:id`

**Response:**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message",
  "error": "Detailed error information"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Course not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to fetch courses",
  "error": "Error details"
}
```

## Data Models

### Course Schema
```javascript
{
  title: String (required, max 200 chars),
  instructor: String (required, max 100 chars),
  description: String (required, max 1000 chars),
  level: String (enum: Beginner, Intermediate, Advanced),
  duration: String (required),
  students: Number (default: 0),
  rating: Number (default: 0, min: 0, max: 5),
  reviews: Number (default: 0),
  price: String (default: "Free"),
  thumbnail: String,
  tags: [String],
  instructorBio: String (max 500 chars),
  instructorAvatar: String,
  learningObjectives: [String],
  prerequisites: [String],
  certificate: Boolean (default: true),
  modules: [{
    id: String (required),
    title: String (required),
    description: String
  }],
  isActive: Boolean (default: true),
  featured: Boolean (default: false),
  category: String (default: 'AI/ML'),
  createdAt: Date,
  updatedAt: Date
}
```

### Module Schema
```javascript
{
  courseId: ObjectId (ref: Course, required),
  moduleId: String (required, unique within course),
  title: String (required, max 200 chars),
  description: String (max 500 chars),
  videoContent: {
    title: String,
    duration: String,
    videoUrl: String,
    transcript: String
  },
  documentation: {
    title: String,
    content: String
  },
  order: Number (required, min: 1),
  isActive: Boolean (default: true),
  estimatedTime: Number (default: 0, minutes),
  difficulty: String (enum: Easy, Medium, Hard),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Examples

### Frontend Integration
```javascript
// Fetch all courses
const response = await fetch('/api/courses?page=1&limit=10');
const data = await response.json();

// Fetch specific course
const courseResponse = await fetch(`/api/courses/${courseId}`);
const courseData = await courseResponse.json();

// Search courses
const searchResponse = await fetch('/api/courses/search?q=machine learning');
const searchData = await searchResponse.json();
```

### Testing with cURL
```bash
# Get all courses
curl -X GET "http://localhost:5000/api/courses"

# Get featured courses
curl -X GET "http://localhost:5000/api/courses/featured?limit=3"

# Search courses
curl -X GET "http://localhost:5000/api/courses/search?q=python"

# Get course by ID
curl -X GET "http://localhost:5000/api/courses/64f1a2b3c4d5e6f7g8h9i0j1"
```
