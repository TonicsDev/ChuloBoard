import db from "../db/conn.js";
import { validatePartialEvent } from "../models/event.js";
import zod from "zod";
import {validatePartialEventsFilter} from "../models/search-events.js";
const nameField = zod.string({
    invalid_type_error: "name field must be a string",
    required_error: "name field is required"
  }).regex(/[A-Za-z0-9\!_]/);
async function eventExist(req, res, next) {
    const result = nameField.safeParse(req.query?.name);
    if(result.error) return res.status(400).json({type: "wrong_filters", error: JSON.parse(result.error.message)});
    const transaction = await db.transaction("read");
    transaction.execute({
        sql: `SELECT * from events WHERE name = $name`,
        args: {name: result.data}
    }).then(events => {
        if(events.rows.length <= 0) {
            transaction.close();
            return res.status(404).json({error: "Command not found"})
        }
        transaction.commit();
        next();
    }).catch(error => {
        transaction.close();
        res.status(500).json({error: "An error unexpected"});
    });
}

async function getEvents(req, res) {
    const result = validatePartialEventsFilter(req.query);
    if(result.error) return res.status(400).json({type: "wrong_filters", error: JSON.parse(result.error.message)});
    const filters = Object.entries(result.data).map(([key, value]) => `${key} = $${key}`).join(" AND ");
    let query = ""
    if(filters) query = `WHERE ${filters}`;
    const transaction = await db.transaction("read");
    transaction.execute({
        sql: `SELECT * FROM events ${query}`,
        args: result.data
    }).then(events => {
        transaction.commit();
        return res.json(events.rows);
    }).catch(error => {
        transaction.close();
        return res.status(500).json({error: "An error unexpected"});
    });
}

async function updateEvent(req, res) {
    const name = nameField.safeParse(req.query?.name);
    if(name.error) return res.status(400).json({type: "wrong_body", error: JSON.parse(name.error.message)});
    const result = validatePartialEvent(req.body);
    if(result.error) return res.status(400).json({type: "wrong_body", error: JSON.parse(result.error.message)});
    if(!result.data) return res.status(400).json({type: "empty_body", error: "There must be at least one property to change"});
    const fields = Object.entries(result.data).map(([field, value]) => `${field} = $${field}`).join(", ");
    result.data.name = name.data;
    const transaction = await db.transaction("write");
    await transaction.execute({
        sql: `UPDATE events SET ${fields} WHERE name = $name`,
        args: result.data
    }).then(() => {
        transaction.commit();
        res.json({success: "Event updated"});
    }).catch(error => {
        transaction.close();
        res.status(500).json({error: "An error unexpected"});
    });
}

export {getEvents, updateEvent, eventExist};