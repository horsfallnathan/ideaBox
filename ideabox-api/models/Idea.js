const mongoose = require("mongoose");
const Schema = mongoose.Schema;

ideaSchema = new Schema(
  {
    title: String,
    challenge: {
      type: Schema.Types.ObjectId,
      ref: "Challenge"
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
      type: String
    },
    status: {
      type: String,
      enum: ["submitted","requesting more info","accepted", "rejected","Development", "Pitch", "Implementation"]
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

const Idea = mongoose.model("Idea", ideaSchema);
module.exports = Idea;
