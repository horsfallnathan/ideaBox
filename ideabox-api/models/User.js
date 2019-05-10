const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/nthnh/image/upload/v1557486717/ideaBox/defaultProfileImage_sde62e.png"
    },
    email: String,
    role: {
      type: String,
      enum: ["manager", "employee"]
    },
    ideas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Idea"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
