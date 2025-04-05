import express, { Router } from "express";

const brainRouter = Router();

brainRouter.post("/share", (req, res) => {
    res.send("You are on brain share endpoint");
})

brainRouter.get("/:shareLink", (req, res) => {
    res.send("You are on brainShare endpoint");
})


export { brainRouter };