import zod from "zod";
import db from "../db/conn.js";
import {validatePartialCommand } from "../models/default-command.js";
import { validatePartialdefaultFilters } from "../models/search-defaults.js";
const nameField = zod.string({
    invalid_type_error: "name field must be a string",
    required_error: "name field is required"
}).regex(/[A-Za-z0-9\!_]/);
async function getDefaultCommands(req, res) {
    const result = validatePartialdefaultFilters(req.query);
    if(result.error) return res.status(400).json({type: "wrong_filters", error: JSON.parse(result.error.message)});
    const filters = Object.entries(result.data).map(([key, value]) => `${key} = $${key}`).join(" AND ");
    let query = ""
    if(filters) query = `WHERE ${filters}`;
    const transaction = await db.transaction("read");
    transaction.execute({
        sql: `SELECT * FROM defaults ${query}`,
        args: result.data
    }).then(commands => {
        transaction.commit();
        res.json(commands.rows);
    }).catch(error => {
        transaction.close();
        res.status(500).json({error: "Unexpected Error"});
    });
}

async function commandExist(req, res, next) {
    const result = nameField.safeParse(req.query?.name);
    if(result.error) return res.status(400).json({type: "wrong_filters", error: JSON.parse(result.error.message)});
    const transaction = await db.transaction("read");
    transaction.execute({
        sql: 'SELECT * FROM defaults WHERE name = $name',
        args: {name:  result.data}
    }).then(command => {
        if(command.rows.length <= 0) {
            transaction.close();
            res.status(404).json({error: "Command not found"});
        }
        transaction.commit();
        return next();
    }).catch(error => {
        transaction.close();
        res.status(500).json({error: "Unexpected Error"});
    });
}

async function updateSettings(req, res) {
    const name = nameField.safeParse(req.query?.name);
    if(name.error) return res.status(400).json({type: "wrong_filters", error: JSON.parse(name.error.message)})
    const result = validatePartialCommand(req.body);
    if(result.error) return res.status(400).json({type: "wrong_body", error: JSON.parse(result.error.message)})
    const fields = Object.entries(result.data)
    .map(([key, value]) => `${key} = $${key}`)
    .join(', ');
    result.data.commandName = name.data;
    const transaction = await db.transaction("write");
    transaction.execute({
        sql: `UPDATE defaults SET ${fields} WHERE name = $commandName`,
        args: result.data
    }).then(() => {
        transaction.commit();
        return res.json({success: "command updated"});
    }).catch(error => {
        transaction.close();
        return res.status(500).json({error: "An unexpected error"});
    });
}
export {getDefaultCommands, updateSettings, commandExist}