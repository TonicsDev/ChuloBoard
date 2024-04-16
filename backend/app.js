import express from "express";
import passport from "passport";
import cors from "cors";
import session from "express-session";
import {Strategy} from "passport-local";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import auth from "./routes/auth-routes.js";
import customs from "./routes/customs-route.js";
import defaults from "./routes/defaults-routes.js";
import events from "./routes/events-routes.js";
import music from "./routes/music-routes.js";
import widget from "./routes/widgets_routes.js";
dotenv.config();
const app = express();
app.set("PORT", process.env.PORT);
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express.json({limit: "50mb", extended: false }));
app.use(express.urlencoded({limit: "50mb", extended: false}));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy(async (username, password, done) => {
    if(username != process.env.PASS_USERNAME) return done("Usuario o Contraseña incorrectos");
    const result = await bcrypt.compare(password, process.env.PASSWORD);
    if(!result) return done("Usuario o Contraseña incorrectos");
    return done(null, {
        id: process.env.ID,
        username: username,
    });
}));
passport.serializeUser((user, done) => {
    if(process.env.ID === user.id) {
        done(null, user.id);
    }
});
passport.deserializeUser((id, done) => {
    if(process.env.ID === id) {
        done(null, {
            id: process.env.ID,
            username: process.env.PASS_USERNAME,
        });
    }
});

app.use("/api/auth", auth);
app.use("/api/customs", customs);
app.use("/api/defaults", defaults);
app.use("/api/events", events);
app.use("/api/music", music);
app.use("/api/widgets", widget);
export default app;