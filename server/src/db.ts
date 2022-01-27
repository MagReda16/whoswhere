import mongoose, { Schema } from 'mongoose';

const DB_URL: string | undefined = process.env.DB_URL!;

(async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('Connected to the database !!');
  } catch (err) {
    console.log('Could not connect to the database', err);
  }
})();

export { Schema };
export default mongoose;
