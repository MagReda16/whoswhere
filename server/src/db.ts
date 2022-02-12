import mongoose, { Schema } from 'mongoose';

const DB_URL: string = process.env.DB_URL ||'mongodb://localhost:27017/whoswhere-test';

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
