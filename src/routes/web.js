import express from "express"
import { getHomepage, getWebHook, postWebHook } from "../controllers/chatboxController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", getHomepage);
    router.post("/webhook", postWebHook);
    router.get("/webhook", getWebHook);
    
    return app.use("/", router);  
}

module.exports = initWebRoutes;