import bodyParser from "body-parser"
import express from "express"
import configViewEngine from "./config/viewEngine"
import initWebRoutes from './routes/web'
// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config();


let app = express();

//config viewEngine
configViewEngine(app);

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//init web
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Chat box in PORT = ", port);
})
