import express from "express";
import{addRemedies,viewRemedies,saveInBulk,getRemedies,deleteRemedies}from"../controller/remedies.controller.js";
const router = express.Router();
router.post("/add-remedies",addRemedies);
router.get("/view-remedies",viewRemedies);
router.post("/save-in-bulk", saveInBulk)
router.get("/searchByName/:remedies_name",getRemedies);
router.delete("/:_id",deleteRemedies);
export default router;