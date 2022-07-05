import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import app from './app';

const port = process.env.PORT;

mongoose
  .connect(process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD))
  .then(() => console.log('DB connection successful!'));

app.listen(port, () => console.log(`Ready on ${port}`));
