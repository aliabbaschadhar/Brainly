import mongoose, { model, Model, Schema } from "mongoose";
import dotenv from "dotenv";
import { password } from "bun";

dotenv.config();

const Connection = process.env.DB_URL;

if (!Connection) {
    throw new Error("Connection is not defined")
}

mongoose.connect(Connection.toString());

const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
})




const userModel = model("users", UserSchema);


export {
    userModel,
}