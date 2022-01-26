import mongoose, { Schema } from "../db";
import IUser from "../../interfaces/user.interface";

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: String,
    required: false,
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
});

export default mongoose.model<IUser>("User", userSchema);
