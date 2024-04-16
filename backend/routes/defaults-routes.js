import {Router} from "express";
import { commandExist, getDefaultCommands, updateSettings } from "../controllers/defaults-controller.js";
import {isAuth} from "../middleware/auth-middleware.js";
const router = Router();


router.route("/commands")
    .patch(isAuth, commandExist, updateSettings)
    .get(getDefaultCommands);

export default router;