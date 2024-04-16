import { Router } from "express";
import { addSong, clearList, deleteSong, getConfig, getSongs, moveSong, promoteSong, updateConfig } from "../controllers/music-controllers.js";
import {isAuth} from "../middleware/auth-middleware.js";
const router = Router();

router.route("/songs")
    .post(isAuth, addSong)
    .patch(isAuth, moveSong)
    .delete(isAuth, deleteSong)
    .get(getSongs);

router.route("/promote")
    .patch(isAuth, promoteSong);
    
router.route("/list")
    .delete(isAuth, clearList);
    
router.route("/config")
    .patch(isAuth, updateConfig)
    .get(getConfig);

export default router;