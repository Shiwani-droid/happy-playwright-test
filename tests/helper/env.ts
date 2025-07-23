import * as dotenv from 'dotenv';

// Load environment variables from .env file if not in CI
if (!process.env.CI) {
  dotenv.config();
}

// Define required environment variables 
const requiredVars = {
  username_robot: process.env.username_robot,
  username_3: process.env.username_3,
  username_4: process.env.username_4,
  username_7: process.env.username_7,
  username_8: process.env.username_8,
  username_9: process.env.username_9,
  username_10: process.env.username_10,
  username_12: process.env.username_12,
  username_13: process.env.username_13,
  username_14: process.env.username_14,
  username_15: process.env.username_15,
  password: process.env.password
};

// Check for missing variables
const missing = Object.entries(requiredVars).filter(([_, value]) => !value);

if (missing.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missing.map(([key]) => key).join(', ')}`
  );
}

// Export variables
export const username_robot = process.env.username_robot!;
export const username_3 = process.env.username_3!;
export const username_4 = process.env.username_4!;
export const username_7 = process.env.username_7!;
export const username_8 = process.env.username_8!;
export const username_9 = process.env.username_9!;
export const username_10 = process.env.username_10!;
export const username_12 = process.env.username_12!;
export const username_13 = process.env.username_13!;
export const username_14 = process.env.username_14!;
export const username_15 = process.env.username_15!;
export const password = process.env.password!;