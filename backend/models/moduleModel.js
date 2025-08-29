const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    courseId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course', 
      required: true 
    },
    moduleId: { 
      type: String, 
      required: true, 
      trim: true 
    },
    title: { 
      type: String, 
      required: true, 
      trim: true, 
      maxlength: 200 
    },
    description: { 
      type: String, 
      trim: true, 
      maxlength: 500 
    },
    videoContent: {
      title: { 
        type: String, 
        trim: true 
      },
      duration: { 
        type: String, 
        trim: true 
      },
      videoUrl: { 
        type: String, 
        trim: true 
      },
      transcript: { 
        type: String, 
        trim: true 
      }
    },
    documentation: {
      title: { 
        type: String, 
        trim: true 
      },
      content: { 
        type: String, 
        trim: true 
      }
    },
    order: { 
      type: Number, 
      required: true, 
      min: 1 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    estimatedTime: { 
      type: Number, 
      default: 0, 
      min: 0 
    }, // in minutes
    difficulty: { 
      type: String, 
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    }
  },
  { 
    timestamps: true, 
    collection: "Modules" 
  }
);

// Compound index for course and module order
moduleSchema.index({ courseId: 1, order: 1 });
moduleSchema.index({ courseId: 1, moduleId: 1 }, { unique: true });
moduleSchema.index({ isActive: 1 });

// Ensure moduleId is unique within a course
moduleSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('moduleId')) {
    const existingModule = await this.constructor.findOne({
      courseId: this.courseId,
      moduleId: this.moduleId,
      _id: { $ne: this._id }
    });
    
    if (existingModule) {
      return next(new Error('Module ID must be unique within a course'));
    }
  }
  next();
});

module.exports = mongoose.model("Module", moduleSchema);
