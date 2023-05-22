import { config } from 'dotenv';
config();

const DB_URL = process.env.MONGODB_URL;

export default {
  url: DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
