import express from "express";
import{addYoga, saveInBulk,viewYoga,getYoga,deleteYoga}from"../controller/yoga.controller.js";
const router = express.Router();
//http://localhost:3001/yoga/view-yoga
router.post("/add-yoga",addYoga);
router.post("/save-in-bulk", saveInBulk)
router.get("/view-yoga",viewYoga);
router.get("/:yoga_name",getYoga);
router.delete("/:_id",deleteYoga);
export default router;