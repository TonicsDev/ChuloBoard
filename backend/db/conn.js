import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import events from "../assets/events.json" assert{type: "json"};
dotenv.config();

const db = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_KEY
});

export default db;