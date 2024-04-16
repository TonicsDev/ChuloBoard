import {Router} from "express";
import { eventExist, getEvents, updateEvent } from "../controllers/events-controllers.js";
import {isAuth} from "../middleware/auth-middleware.js";
const router = Router();

router.route("/")
    .get(getEvents)
    .patch(isAuth, eventExist, updateEvent);

export default router;