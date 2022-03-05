import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors'
import multer from 'multer'
import cloudinary from 'cloudinary'
import cookieParser from "cookie-parser";
import wordsRouter from "./router/words.js";
import hoursRouter from "./router/hours.js";
import dashboardRouter from './router/dashboard.js'
import userRoutes from "./router/userRoutes.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cloudInit = cloudinary.v2

cloudInit.config({
    cloud_name: 'dp3bghjkn',
    api_key: '235814167489939',
    api_secret: 'XkONM_b_-SqKfH8yikeXHsjpNlM'
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use("/words", wordsRouter.router);
app.use("/hours", hoursRouter.router);
app.use("/", dashboardRouter.router);
app.use("/", userRoutes.router)


export default { app };


// ADICIONA EXPRESS VALIDATOR PARA AS HORAS E PALAVRAS
// Ve a respeito sobre o leak, tenta modificar o edit profile, diminuindo eventos
// MELHORA AS VALIDAÇÕES
// MELHORA O CODIGO EM GERAL
// MUDAR ALGUNS POST PRA PUT VIA AJAX TBM
// ADICIONAR A OPCAO DE EDITAR E APAGAR PALAVRAS / HORAS
// ADICIONA SOMBRA EM TODOS OS CARDS
// DEIXA A TELA DE LOGIN E REGISTER MAIS BONITA