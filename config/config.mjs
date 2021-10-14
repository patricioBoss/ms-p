import dotenv from 'dotenv';

dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    mongoUri: process.env.MONGODB_URI,
  };
  
  export default config;
