import mongoose, { model, Model, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = process.env.DB_URL;

if (!Connection) {
    throw new Error("Connection is not defined")
}

mongoose.connect(Connection.toString());

const UserSchema = new Schema({
    username: { type: String, unique: true, },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true }
})


enum ContentType {
    DOCUMENT = 'document',
    TWEET = 'tweet',
    YOUTUBE_LINK = 'youtubeLink',
    LINK = 'link',
}

const ContentSchema = new Schema({
    title: String,
    link: String,
    type: {
        type: String,
        required: true,
        enum: Object.values(ContentType)
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "tags" }],
    userId: { type: Schema.Types.ObjectId, ref: "users" }
});




const userModel = model("users", UserSchema);
const contentModel = model("contents", ContentSchema);


export {
    userModel,
    contentModel,
}