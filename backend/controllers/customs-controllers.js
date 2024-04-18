import db from "../db/conn.js";
import { customCommand, validateCommand, validatePartialCommand } from "../models/custom-command.js";
import { validateCustomFilters } from "../models/search-customs.js";
import zod from "zod";

const nameField = zod.string({
  invalid_type_error: "name field must be a string",
  required_error: "name field is required"
}).regex(/[A-Za-z0-9\!_]/);
async function getCustomCommands(req, res) {
  const result = validateCustomFilters(req.query);
  if(result.error) return res.status(400).json({type: "wrong_filters", error: JSON.parse(result.error.message)});
  const filters = Object.entries(result.data).map(([key, value]) => `${key} = $${key}`).join(" AND ");
  let query = "";
  if(filters) query = `WHERE ${filters}`;

  const transaction = await db.transaction("read");
  transaction.execute({
    sql: `SELECT * FROM customs ${query}`,
    args: result.data
  }).then(customs => {
    transaction.commit();
    res.json(customs.rows);
  }).catch(error => {
    transaction.close();
    res.status(500).json({error: "An unexpected error has ocurred"});
  });
}

async function commandExist(req, res, next) {;
  const result = nameField.safeParse(req.query?.name);
  if(result.error) return res.status(400).json({type: "wrong_filters", error: JSON.parse(result.error.message)});
  const transaction = await db.transaction("read");
  transaction.execute({
    sql: "SELECT * FROM customs WHERE name = $name",
    args: {name: result.data}
  }).then(command => {
      if(command.rows.length <= 0) {
        transaction.close();
        return res.status(404).json({error: "Command not found"});
      }
      transaction.commit();
      return next();
  }).catch(error => {
    transaction.close();
    return res.status(500).json({error: "Unexpected error"});
  });
}

async function createCustomCommand(req, res) {
  const result = validateCommand(req.body);
  if(result.error) {
    const errors = result.error.issues.map((error, index) => {
      return {
        field: error.path[0],
        message: error.message
      }
    });

    return res.status(400).json(errors);
  }
  const date = new Date().toISOString();
  result.data.date = date;
  result.data.status = 1;
  const transaction = await db.transaction("write");

  transaction.execute({
    sql: `INSERT INTO customs VALUES($name, $message, $userlevel, $cooldown, $status, $date)`,
    args: result.data
  }).then(() => {
    transaction.commit();
    return res.status(201).json({success: "command created"});
  }).catch(error => {
    transaction.close();
    return res.status(500).json({error: "An unexpected error"});
  });
}

async function updateCustomCommand(req, res) {
  const oldName = nameField.safeParse(req.query?.name);
  if(oldName.error) return res.status(400).json({type: "wrong_filters", error: JSON.parse(oldName.error.message)})
  const result = validatePartialCommand(req.body);
  if(result.error) return res.status(400).json({type: "wrong_body", error: JSON.parse(result.error.message)})
  const fields = Object.entries(result.data)
  .map(([key, value]) => `${key} = $${key}`)
  .join(', ');

  result.data.oldname = oldName.data;

  const transaction = await db.transaction("write");
  
  await transaction.execute({
    sql: `UPDATE customs SET ${fields} WHERE name = $oldname`,
    args: result.data
  }).then(() => {
    transaction.commit();
    return res.json({success: "command updated"});
  }).catch(error => {
    transaction.close();
    return res.status(500).json({error: "An unexpected error"});
  })
}

async function deleteCustomCommand(req, res) {
  const result = nameField.safeParse(req.query?.name);
  if(result.error) return res.status(400).json({type: "wrong_filters", error: JSON.parse(result.error.message)})
  const transaction = await db.transaction("write");
  await transaction.execute({
    sql: `DELETE FROM customs WHERE name = $name`,
    args: {name: result.data}
  }).then(() => {
    transaction.commit();
    res.json({success: "command deleted"});
  }).catch(error => {
    transaction.close();
    return res.status(500).json({error: "An unexpected error"});
  });
}

export {getCustomCommands, createCustomCommand, updateCustomCommand, deleteCustomCommand, commandExist};