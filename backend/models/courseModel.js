    const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true, 
      maxlength: 200 
    },
    instructor: { 
      type: String, 
      required: true, 
      trim: true, 
      maxlength: 100 
    },
    description: { 
      type: String, 
      required: true, 
      maxlength: 1000 
    },
    level: { 
      type: String, 
      required: true, 
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    duration: { 
      type: String, 
      required: true, 
      trim: true 
    },
    students: { 
      type: Number, 
      default: 0, 
      min: 0 
    },
    rating: { 
      type: Number, 
      default: 0, 
      min: 0, 
      max: 5 
    },
    reviews: { 
      type: Number, 
      default: 0, 
      min: 0 
    },
    price: { 
      type: String, 
      default: "Free", 
      trim: true 
    },
    thumbnail: { 
      type: String, 
      trim: true 
    },
    tags: [{ 
      type: String, 
      trim: true 
    }],
    instructorBio: { 
      type: String, 
      maxlength: 500 
    },
    instructorAvatar: { 
      type: String, 
      trim: true 
    },
    learningObjectives: [{ 
      type: String, 
      trim: true 
    }],
    prerequisites: [{ 
      type: String, 
      trim: true 
    }],
    certificate: { 
      type: Boolean, 
      default: true 
    },
    modules: [{
      id: { 
        type: String, 
        required: true, 
        trim: true 
      },
      title: { 
        type: String, 
        required: true, 
        trim: true 
      },
      description: { 
        type: String, 
        trim: true 
      }
    }],
    isActive: { 
      type: Boolean, 
      default: true 
    },
    featured: { 
      type: Boolean, 
      default: false 
    },
    category: { 
      type: String, 
      trim: true, 
      default: 'AI/ML' 
    }
  },
  { 
    timestamps: true, 
    collection: "Courses" 
  }
);

// Indexes for better query performance
courseSchema.index({ title: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ tags: 1 });
courseSchema.index({ featured: 1 });
courseSchema.index({ isActive: 1 });

// Virtual for average rating calculation
courseSchema.virtual('averageRating').get(function() {
  return this.reviews > 0 ? (this.rating / this.reviews).toFixed(1) : 0;
});

// Ensure virtual fields are serialized
courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Course", courseSchema);
