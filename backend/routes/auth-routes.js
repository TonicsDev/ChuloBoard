import { Router } from "express";
import passport from "passport";
import {getSession, login} from "../controllers/auth-controllers.js";
const router = Router();

router.route("/")
    .post(passport.authenticate('local'), login);

router.route("/session")
    .get(getSession);

router.route("/logout")
    .put()

export default router;