import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";


const contentRouter = Router();


contentRouter.post("/create", (req, res) => {
    res.send("You are on add content endpoint");
})

contentRouter.get("/all", (req, res) => {
    res.send("You are on fetching user content");
})

contentRouter.delete("/delete", (req, res) => {
    res.send("You are on deletet a specific content")
})


export { contentRouter }