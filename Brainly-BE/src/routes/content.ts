import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { userMiddleware } from "../middlewares/userMiddleware";
import { contentModel } from "../db/db";

const contentRouter = Router();

contentRouter.use(userMiddleware); // To do everything with the content the user must be loggedIn

//Create a new post
contentRouter.post("/", async (req, res) => {
    const contentSchema = z.object({
        link: z.string().url(),
        title: z.string().optional(),
        cType: z.enum(['document', 'image', 'video', 'article', 'audio', 'link']),
        tags: z.array(z.string()).optional(),
    })

    const parsedData = contentSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(403).json({
            msg: "Incorrect Format",
            error: parsedData.error,
        })
        return;
    }

    try {
        const { link, title, cType, tags } = req.body;

        const content = await contentModel.create({
            title, link, cType,
            userId: req.userId, // Created by which user
            tags: tags || [],
        })
        res.status(200).json({
            msg: "Content added",
            content: content,
        })
    } catch (error) {
        res.status(404).json({
            msg: "Content is not added",
            error: error,
        })
    }
})

// Get all content posts
contentRouter.get("/", async (req, res) => {
    const userId = req.userId;
    try {

        const content = await contentModel.find({
            userId: userId
        }).populate("userId", "username");

        res.json({
            content: content
        })
    } catch (error) {
        res.status(403).json({
            msg: "Content could not be fetched"
        })
    }
})

// Delete a post
contentRouter.delete("/", async (req, res) => {
    const { contentId } = req.body;
    try {
        await contentModel.deleteOne({
            contentId,
            userId: req.userId, // User is deleting only those posts which are owned by him.
        })

        res.status(200).json({
            msg: "Content deleted",
        })
    } catch (error) {
        res.status(404).json({
            msg: "Some error occured while deleting",
            error: error
        })
    }
})

// Update a post
contentRouter.put("/", async (req, res) => {

    const contentSchema = z.object({
        contentId: z.string(),
        link: z.string().url(),
        title: z.string().optional(),
        cType: z.enum(['document', 'image', 'video', 'article', 'audio', 'link']),
        tags: z.array(z.string()).optional(),
    })

    const parsedData = contentSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(403).json({
            msg: "Incorrect Format",
            error: parsedData.error,
        })
        return;
    }

    try {
        const { title, link, tags, cType, contentId } = req.body;
        // const updatedContent = await contentModel.updateOne(
        //     {
        //         _id: contentId,
        //         userId: req.userId // userId to make the user is modifying only its own content not others content
        //     },
        //     { $set: { title, link, tags, cType } }
        // )

        const updatedContent = await contentModel.findOneAndUpdate(
            {
                //First argument to find 
                _id: contentId,
                userId: req.userId // userId to make the user is modifying only its own content not others content
            },
            //to update
            { $set: { title, link, tags, cType } },
            // To return new updated Content
            { new: true } // This option returns the updated Content rather than the original one
        )

        if (!updatedContent) {
            res.status(404).json({
                msg: "Content not found or you don't permission to update "
            })
        }

        res.status(200).json({
            msg: "Content updated Successfully",
            updatedContent: updatedContent
        })
    } catch (error) {
        res.status(403).json({
            msg: "Content not updated!",
            error: error
        })
    }
})


export { contentRouter }