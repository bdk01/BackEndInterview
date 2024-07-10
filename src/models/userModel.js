import mongoose from "mongoose";
import { UserRole } from "../constant";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: "String" } },
      },
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 25,
    },
    lastName: {
      type: String,
      required: true,

      maxlength: 25,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/khoa252001/image/upload/v1703206467/socialmedia/user_pwvvhk.png",
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.USER,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", UserSchema);
