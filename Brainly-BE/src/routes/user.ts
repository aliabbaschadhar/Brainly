import express, { Router } from "express";


const userRouter = Router();

userRouter.post("/signup", (req, res) => {
    res.send("Hello Baby");
})

export { userRouter };