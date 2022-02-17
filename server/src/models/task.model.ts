import mongoose, { Schema } from "../db";
import ITask from "../interfaces/task.interface";

const taskSchema: Schema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  task: {
    type: String,
    required: true,
  },
  due: {
    type: Date,
    required: false
  },
  urgent: {
    type: Boolean,
    required: false
  },
  veryUrgent: {
    type: Boolean,
    required: false
  }
});

export default mongoose.model<ITask>("Task", taskSchema);
