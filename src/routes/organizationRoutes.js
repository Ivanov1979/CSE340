import express from "express";
import {
    buildOrganizations,
    buildOrganizationDetail
} from "../controllers/organizationController.js";

const router = express.Router();

router.get("/", buildOrganizations);
router.get("/:id", buildOrganizationDetail);

export default router;