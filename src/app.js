import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors'
import cookieParser from "cookie-parser";
import wordsRouter from "./router/words.js";
import hoursRouter from "./router/hours.js";
import dashboardRouter from './router/dashboard.js'
import userRoutes from "./router/userRoutes.js";


const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(cookieParser())
app.use("/words", wordsRouter.router);
app.use("/hours", hoursRouter.router);
app.use("/", dashboardRouter.router);
app.use("/", userRoutes.router)

export default { app };
