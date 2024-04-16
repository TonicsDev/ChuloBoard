import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import events from "../assets/events.json" assert{type: "json"};
dotenv.config();

const db = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_KEY,
});

await db.execute(`CREATE TABLE IF NOT EXISTS customs(
    name TEXT primary key not null,
    message TEXT not null,
    userlevel TEXT not null CHECK(userlevel IN ('Propietario', 'Moderador', 'Subscriptor', 'VIP', 'Cualquiera')) DEFAULT 'Cualquiera',
    cooldown SMALLINT not null CHECK(cooldown <= 300 AND cooldown >= 5) DEFAULT 5,
    status SMALLINT not null CHECK(status >= 0 AND status <= 1) DEFAULT 0,
    created_at timestamp not null
)`);

await db.execute(`CREATE TABLE IF NOT EXISTS defaults(
    name TEXT primary key not null,
    description TEXT not null,
    userlevel TEXT not null CHECK(userlevel IN ('Propietario', 'Moderador', 'Subscriptor', 'VIP', 'Cualquiera')) DEFAULT 'Cualquiera',
    cooldown SMALLINT not null CHECK(cooldown <= 300 AND cooldown >= 5) DEFAULT 5,
    status SMALLINT not null CHECK(status >= 0 AND status <= 1) DEFAULT 0,
    queueMax SMALLINT not null CHECK(queueMax >= 0 AND queueMax <= 500) DEFAULT 0,
    created_at timestamp not null
)`);

await db.execute(`CREATE TABLE IF NOT EXISTS events(
    name TEXT primary key not null CHECK(LENGTH(name) <= 20 AND LENGTH(message) > 0),
    message TEXT not null CHECK(LENGTH(message) <= 400 AND LENGTH(message) > 0),
    event TEXT not null,
    cooldown SMALLINT not null CHECK(cooldown <= 300 AND cooldown >= 5) DEFAULT 5,
    status SMALLINT not null CHECK(status >= 0 AND status <= 1) DEFAULT 0,
    queueMax SMALLINT not null CHECK(queueMax >= 0 AND queueMax <= 500) DEFAULT 0,
    created_at timestamp not null
)`);

await db.execute(`CREATE TABLE IF NOT EXISTS config(
    queue_limit SMALLINT not null CHECK(queue_limit <= 100 AND queue_limit > 0) DEFAULT 1,
    user_limit SMALLINT not null CHECK(user_limit <= 100 AND user_limit > 0) DEFAULT 1,
    userlevel TEXT not null CHECK(userlevel IN ('Propietario', 'Moderador', 'Subscriptor', 'VIP', 'Cualquiera')) DEFAULT 'Cualquiera',
    except_level TEXT not null CHECK(except_level IN ('Propietario', 'Moderador', 'Subscriptor', 'VIP', 'Cualquiera')) DEFAULT 'Cualquiera',
    min_likes SMALLINT not null CHECK(min_likes >= 0 AND min_likes <= 10000) DEFAULT 0,
    created_at timestamp not null
)`);

await db.execute(`CREATE TABLE IF NOT EXISTS songs(
    position SMALLINT not null CHECK(position > 0 AND position <= 100),
    video_id TEXT primary key not null CHECK(LENGTH(video_id) = 11),
    url TEXT not null CHECK(LENGTH(url) = 43),
    title TEXT not null CHECK(LENGTH(title) > 0),
    artist TEXT not null,
    duration TEXT not null CHECK(LENGTH(duration) <= 5 AND LENGTH(duration) > 0),
    user TEXT not null,
    created_at timestamp not null
)`);


export default db;