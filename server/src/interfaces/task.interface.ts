import { Document } from "mongoose";

export default interface ITask extends Document {
  team: string;
  task: string;
}
