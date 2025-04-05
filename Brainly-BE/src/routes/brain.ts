import { Router } from "express";
import { userMiddleware } from "../middlewares/userMiddleware";
import { contentModel, linkModel, userModel } from "../db/db";
import { random } from "../utils/random";


const brainRouter = Router();

//http://localhost:3000/api/v1/brain/share
// If user wants to share the brain with other user then we will generate the link 
// If share is true and the link already does not exists then create a new one using random()
// If the share is false then delete the existing link.
brainRouter.post("/share", userMiddleware, async (req, res) => {
    const { share } = req.body;
    try {

        if (share) {
            const existingLink = await linkModel.findOne({
                userId: req.userId,
            })

            if (existingLink) {
                res.status(200).json({
                    link: existingLink.hash
                });
                return;
            }

            const hashedLink = random(10);

            await linkModel.create({
                userId: req.userId,
                hash: hashedLink,
            });
            res.status(200).json({
                link: hashedLink
            })

        } else {
            await linkModel.deleteOne({
                userId: req.userId, // Link related to specific user.
            })
            res.status(200).json({
                msg: "Shareable Link deleted"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error
        })
    }
})

//http:localhost:3000/api/v1/brain/zarlefda32
brainRouter.get("/:shareLink", async (req, res) => {
    try {
        const hash = req.params.shareLink;

        // Optional: Validate hash format/length
        if (!hash || hash.length !== 10) {
            res.status(400).json({
                msg: "Invalid share link format"
            });
            return;
        }

        const link = await linkModel.findOne({ hash });

        if (!link) {
            res.status(404).json({
                msg: "Link not found in DB"
            });
            return;
        }

        const content = await contentModel.findOne({
            userId: link.userId
        });

        if (!content) {
            res.status(404).json({
                msg: "Content not found"
            });
            return;
        }

        const user = await userModel.findOne({
            _id: link.userId,
        });

        if (!user) {
            res.status(404).json({
                msg: "User not found"
            });
            return;
        }

        // Consider returning only necessary content fields
        res.status(200).json({
            user: user.username,
            content: content
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});


export { brainRouter };