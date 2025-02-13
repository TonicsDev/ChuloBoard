import dotenv from "dotenv";
dotenv.config();


const ENV_VARIABLES = {
    PORT: process.env.PORT,
    TIER1: process.env.TIER1,
    TIER2: process.env.TIER2,
    TIER3: process.env.TIER3,
    VITE_CHANNEL: process.env.VITE_CHANNEL
}

export {ENV_VARIABLES};