const mongoose = require("mongoose");
const Schema = mongoose.Schema;

draftSchema = new Schema(
  {
    title: String,
    challenge: {
      type: Boolean
    },
    category: {
      type: String,
      enum: ["Innovation Challenge", "Free Idea"]
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
    teamMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
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

const Draft = mongoose.model("Draft", draftSchema);
module.exports = Draft;
