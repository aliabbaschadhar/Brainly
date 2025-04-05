import express from "express";
import cors from "cors";
import { userRouter, contentRouter, brainRouter } from "./routes";

const app = express();

app.use(cors()); // For cross origin resource sharing 
app.use(express.json()); // For ease in parsing data from body 

app.use("/api/v1/user", userRouter); // Now all the users request which will come at /user will go to userRouter and will be handled there.
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRouter);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});