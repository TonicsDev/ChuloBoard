import {Router} from "express";
import { commandExist, createCustomCommand, deleteCustomCommand, getCustomCommands, updateCustomCommand } from "../controllers/customs-controllers.js";
import { isAuth } from "../middleware/auth-middleware.js";
const router = Router();

router.route("/commands")
    .post(isAuth, createCustomCommand)
    .patch(isAuth, commandExist, updateCustomCommand)
    .delete(isAuth, commandExist, deleteCustomCommand)
    .get(getCustomCommands);

export default router;