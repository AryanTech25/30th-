const mongoose = require('mongoose');
const Course = require('../models/courseModel');
const Module = require('../models/moduleModel');
require('dotenv').config();

// Sample course data
const sampleCourses = [
  {
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Sarah Johnson",
    description: "Master the fundamentals of machine learning with hands-on projects and real-world applications. Learn algorithms, data preprocessing, and model evaluation.",
    level: "Beginner",
    duration: "8 weeks",
    students: 1250,
    rating: 4.8,
    reviews: 89,
    price: "Free",
    thumbnail: "/ml.jpeg",
    tags: ["Machine Learning", "AI", "Python", "Data Science"],
    instructorBio: "Dr. Sarah Johnson is a leading expert in machine learning with over 10 years of experience in AI research and development.",
    instructorAvatar: "/placeholder-user.jpg",
    learningObjectives: [
      "Understand core ML algorithms",
      "Implement supervised and unsupervised learning",
      "Build and evaluate ML models",
      "Apply ML to real-world problems"
    ],
    prerequisites: [
      "Basic Python programming",
      "Fundamental mathematics",
      "Basic statistics knowledge"
    ],
    certificate: true,
    featured: true,
    category: "AI/ML",
    modules: [
      {
        id: "introduction",
        title: "Introduction to Machine Learning",
        description: "Overview of ML concepts and applications"
      },
      {
        id: "supervised-learning",
        title: "Supervised Learning Algorithms",
        description: "Learn regression and classification techniques"
      },
      {
        id: "practice-labs",
        title: "Practice Labs",
        description: "Hands-on exercises and projects"
      }
    ]
  },
  {
    title: "Natural Language Processing",
    instructor: "Prof. Michael Chen",
    description: "Explore the fascinating world of NLP and learn how to build intelligent text processing systems. From basic text analysis to advanced language models.",
    level: "Intermediate",
    duration: "10 weeks",
    students: 890,
    rating: 4.7,
    reviews: 67,
    price: "Free",
    thumbnail: "/npl.jpeg",
    tags: ["NLP", "Text Processing", "AI", "Python"],
    instructorBio: "Prof. Michael Chen specializes in natural language processing and computational linguistics with extensive research in language models.",
    instructorAvatar: "/placeholder-user.jpg",
    learningObjectives: [
      "Understand NLP fundamentals",
      "Build text processing pipelines",
      "Implement language models",
      "Create conversational AI systems"
    ],
    prerequisites: [
      "Machine Learning basics",
      "Python programming",
      "Understanding of linguistics"
    ],
    certificate: true,
    featured: true,
    category: "AI/ML",
    modules: [
      {
        id: "text-processing",
        title: "Text Processing Fundamentals",
        description: "Learn basic text preprocessing techniques"
      },
      {
        id: "language-models",
        title: "Language Models",
        description: "Understanding and building language models"
      },
      {
        id: "practice-labs",
        title: "Practice Labs",
        description: "Hands-on NLP projects"
      }
    ]
  },
  {
    title: "AI Agent Development",
    instructor: "Dr. Emily Rodriguez",
    description: "Learn to build intelligent AI agents that can perform complex tasks autonomously. From simple rule-based agents to advanced autonomous systems.",
    level: "Advanced",
    duration: "12 weeks",
    students: 567,
    rating: 4.9,
    reviews: 45,
    price: "Free",
    thumbnail: "/agent.png",
    tags: ["AI Agents", "Autonomous Systems", "Machine Learning"],
    instructorBio: "Dr. Emily Rodriguez is a pioneer in AI agent development with expertise in autonomous systems and multi-agent coordination.",
    instructorAvatar: "/placeholder-user.jpg",
    learningObjectives: [
      "Design intelligent AI agents",
      "Implement autonomous decision-making",
      "Build multi-agent systems",
      "Create adaptive learning agents"
    ],
    prerequisites: [
      "Advanced machine learning",
      "Python programming",
      "Understanding of AI fundamentals"
    ],
    certificate: true,
    featured: false,
    category: "AI/ML",
    modules: [
      {
        id: "agent-fundamentals",
        title: "Agent Fundamentals",
        description: "Core concepts of AI agents"
      },
      {
        id: "autonomous-systems",
        title: "Autonomous Systems",
        description: "Building self-learning agents"
      },
      {
        id: "practice-labs",
        title: "Practice Labs",
        description: "Advanced agent development projects"
      }
    ]
  }
];

// Sample module data
const sampleModules = [
  // Machine Learning Course Modules
  {
    courseId: null, // Will be set dynamically
    moduleId: "introduction",
    title: "Introduction to Machine Learning",
    description: "Get started with the fundamentals of machine learning and understand its applications in the real world.",
    videoContent: {
      title: "What is Machine Learning?",
      duration: "15:30",
      videoUrl: "https://example.com/ml-intro-video",
      transcript: "Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions without being explicitly programmed..."
    },
    documentation: {
      title: "ML Fundamentals Guide",
      content: "This comprehensive guide covers the basics of machine learning, including supervised and unsupervised learning approaches..."
    },
    order: 1,
    estimatedTime: 45,
    difficulty: "Easy"
  },
  {
    courseId: null,
    moduleId: "supervised-learning",
    title: "Supervised Learning Algorithms",
    description: "Learn about regression and classification algorithms used in supervised learning.",
    videoContent: {
      title: "Supervised Learning Deep Dive",
      duration: "22:15",
      videoUrl: "https://example.com/supervised-learning-video",
      transcript: "Supervised learning is a type of machine learning where the algorithm learns from labeled training data..."
    },
    documentation: {
      title: "Supervised Learning Handbook",
      content: "Explore various supervised learning algorithms including linear regression, logistic regression, decision trees, and support vector machines..."
    },
    order: 2,
    estimatedTime: 60,
    difficulty: "Medium"
  },
  {
    courseId: null,
    moduleId: "practice-labs",
    title: "Practice Labs",
    description: "Hands-on exercises and real-world projects to apply your machine learning knowledge.",
    videoContent: {
      title: "Lab Setup and Introduction",
      duration: "8:45",
      videoUrl: "https://example.com/lab-setup-video",
      transcript: "In this lab session, we'll set up our development environment and work through practical machine learning exercises..."
    },
    documentation: {
      title: "Lab Exercises Guide",
      content: "Complete hands-on exercises covering data preprocessing, model training, evaluation, and deployment..."
    },
    order: 3,
    estimatedTime: 90,
    difficulty: "Medium"
  }
];

// Seeder function
const seedCourses = async () => {
  try {
    // Connect to MongoDB
    //await mongoose.connect(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await Module.deleteMany({});
    console.log('Cleared existing data');

    // Insert courses
    const createdCourses = await Course.insertMany(sampleCourses);
    console.log(`Created ${createdCourses.length} courses`);

    // Create modules for each course
    for (const course of createdCourses) {
      const courseModules = sampleModules.map(module => ({
        ...module,
        courseId: course._id
      }));
      
      await Module.insertMany(courseModules);
      console.log(`Created modules for course: ${course.title}`);
    }

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created ${createdCourses.length} courses with modules`);
    
    // Display created courses
    createdCourses.forEach(course => {
      console.log(`- ${course.title} (${course.level})`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedCourses();
}

module.exports = { seedCourses };
