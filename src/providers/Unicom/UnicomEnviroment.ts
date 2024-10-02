require("dotenv").config();

export const UnicomEnviroment = {
  UNICOM_API_URL: process.env.API_UNICOM_URL,
  UNICOM_API_KEY: process.env.API_UNICOM_TOKEN,
};
