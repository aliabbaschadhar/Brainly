import express, { Router } from "express";


const userRouter = Router();

userRouter.post("/signup", (req, res) => {
    res.send("Hello Baby");
})

userRouter.post("/signin", (req, res) => {
    res.send("You are on signin endpoint");
})

export { userRouter };