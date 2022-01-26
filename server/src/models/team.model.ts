import mongoose, { Schema } from '../db';
import ITeam from '../../interfaces/team.interfaces';

const teamSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

export default mongoose.model<ITeam>('User', teamSchema);
