import { Router } from "express";
import { isAuth } from "../middleware/auth-middleware.js";
import { getWidgets, updateWidget } from "../controllers/widgets-controller.js";
const router = Router();

router.route("/")
    .get(isAuth, getWidgets)
    .patch(isAuth, updateWidget);

export default router;