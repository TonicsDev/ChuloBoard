import db from "../db/conn.js";
import zod from "zod";
import { validateWidget } from "../models/widget.js";
import { validateWidgetFilters } from "../models/search-widgets.js";
import {v4} from "uuid";

async function getWidgets(req, res) {
    const result = validateWidgetFilters(req.query);
    if(result.error) return res.status(400).json({type: "wrong_filters", error: JSON.parse(result.error.message)});
    const filters = Object.entries(result.data).map(([key, value]) => `${key} = $${key}`).join(" AND ");
    let query = "";
    if(filters) query = `WHERE ${filters}`;
    const transaction = await db.transaction("read");
    transaction.execute({
        sql: `SELECT * FROM widgets ${query}`,
        args: result.data
    }).then(widget => {
        transaction.commit();
        res.json(widget.rows);
    }).catch(error => {
        transaction.close();
        res.status(500).json({error: "An unexpected error has ocurred"});
    });
}

async function updateWidget(req, res) {
    const result = validateWidget(req.query);
    if(result.error) return res.status(400).json({error: JSON.parse(result.error.message)});
    const transaction = await db.transaction("write");

    transaction.execute({
        sql: 'UPDATE widgets SET widget_id = $widget_id WHERE name = $name',
        args: {widget_id: v4(), name: result.data.name}
    }).then(() => {
        transaction.commit();
        res.json({success: "widget updated"});
    }).catch(error => {
        transaction.close();
        return res.status(500).json({error: "An error unexpected has ocurred"})
    });
}

export {getWidgets, updateWidget}