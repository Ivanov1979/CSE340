import express from "express";
import {
    buildOrganizations,
    buildOrganizationDetail
} from "../controllers/organizationController.js";

const router = express.Router();

// list page
router.get("/organizations", buildOrganizations);

// detail page
router.get("/organization/:id", buildOrganizationDetail);

export default router;