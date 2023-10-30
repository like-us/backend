import dotenv from 'dotenv'
import * as process from 'process'

dotenv.config()

const config = {
  PORT: Number(process.env.PORT) || 5000,
  MONGODB_URI: process.env.MONGODB_URI || '',
  BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT || '12'),
  ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET || 'zmdpiaide893n4-io',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  APP_URL: process.env.APP_URL || 'http://localhost:9000',
  CLOUD_NAME: process.env.CLOUD_NAME || '',
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || '',
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || '',
}

export default config
