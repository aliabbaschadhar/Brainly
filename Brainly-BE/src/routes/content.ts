import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { userMiddleware } from "../middlewares/userMiddleware";

const contentRouter = Router();

contentRouter.use(userMiddleware); // To do everything with the content the user must be loggedIn


contentRouter.post("/create", (req, res) => {

})

contentRouter.get("/all", (req, res) => {
    res.send("You are on fetching user content");
})

contentRouter.delete("/delete", (req, res) => {
    res.send("You are on deletet a specific content")
})


export { contentRouter }