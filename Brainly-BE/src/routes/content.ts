import express, { Router } from "express";

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