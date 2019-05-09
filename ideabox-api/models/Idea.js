const mongoose = require("mongoose");
const Schema = mongoose.Schema;

ideaSchema = new Schema(
  {
    title: String,
    challenge: {
      type: Boolean
    },
    description: {
      type: String,
      maxlength: 750
    },
    files: [String],
    need: String,
    benefit: String,
    estimatedResources: [String],
    competition: String,
    teamMembers: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    message: String,
    privacy: {
      type: Boolean
    },
    status: {
      type: String,
      enum: ["submitted", "validation"]
    },
    selected: {
      type: Boolean
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    feedback: [
      {
        type: Schema.Types.ObjectId,
        ref: "Feedback"
      }
    ],
    upVotes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Idea = mongoose.model("Idea", ideaSchema);
module.exports = Idea;
