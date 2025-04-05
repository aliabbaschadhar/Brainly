import { password } from "bun";
import { configDotenv } from "dotenv";
import express, { Router } from "express";
import { z } from "zod";
import { userModel } from "../db/db";
import mongoose from "mongoose";
import bcrypt from "bcrypt"


configDotenv();


const userRouter = Router();
const SECRET = process.env.JWT_SECRET;

userRouter.post("/signup", async (req, res) => {

    const userSchema = z.object({
        username: z.string().min(4).max(20).optional(),
        password: z.string().min(8).max(30),
        email: z.string().min(8).email(),
    })

    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.json({
            message: "Incorrect format",
            error: parsedData.error,
        })
    }

    //Main logic

    const { username, password, email } = req.body;

    const user = await userModel.findOne({ email: email });
    if (user) {
        res.status(403).send({
            message: "User already exists, Signin!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        await userModel.create({
            username: username,
            password: hashedPassword,
            email: email,
        })

        res.status(200).send({
            message: "You are signed up ",
        })
    } catch (error) {
        res.status(403).send({
            messsage: "Some error occured",
            error: error,
        })
    }
})

userRouter.post("/signin", (req, res) => {
    res.send("You are on signin endpoint");
})

export { userRouter };