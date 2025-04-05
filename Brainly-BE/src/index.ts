import express from "express";
import cors from "cors";
import { userRouter, contentRouter, brainRouter } from "./routes";
import dotenv from "dotenv";
import { userModel } from "./db/db";

// Load environment variables from default location (Brainly-BE/.env)
dotenv.config();

const app = express();

app.use(cors()); // For cross origin resource sharing 
app.use(express.json()); // For ease in parsing data from body 

app.use("/api/v1/user", userRouter); // Now all the users request which will come at /user will go to userRouter and will be handled there.
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRouter);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});