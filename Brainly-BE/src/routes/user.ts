import { password } from "bun";
import { configDotenv } from "dotenv";
import { Router } from "express";
import { z } from "zod";
import { userModel } from "../db/db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


configDotenv();


const userRouter = Router();
const SECRET = process.env.JWT_SECRET;

if (!SECRET) throw new Error("JWT_SECRET is not defined");

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

userRouter.post("/signin", async (req, res) => {

    const userSchema = z.object({
        email: z.string().min(8).email(),
        password: z.string().min(8).max(30),
    })

    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(403).json({
            message: "Incorrect format",
            error: parsedData.error
        })
    }

    // main logic

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email,
    })

    if (!user) {
        res.status(404).json({
            message: "User does not exist, SignUp",
        });
        return;
    }

    const matchedPassword = await bcrypt.compare(password, user.password || "");

    if (!matchedPassword) {
        res.status(403).send({
            msg: 'Incorrect password'
        })
    }

    try {
        const token = jwt.sign({ id: user._id }, SECRET);
        res.status(200).json({
            msg: "User is signedIn",
            token: token,
        })
    } catch (error) {
        res.status(403).json({
            msg: "Incorrect credentials"
        })
    }
})

export { userRouter };