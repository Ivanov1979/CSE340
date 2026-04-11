import express from "express";
import {
    buildOrganizations,
    buildOrganizationDetail,
    buildNewOrganization,
    addNewOrganization,
    buildEditOrganization,
    updateOrganization
} from "../controllers/organizationController.js";

const router = express.Router();

// List organizations
router.get("/", buildOrganizations);

// Create new organization
router.get("/new", buildNewOrganization);
router.post("/new", addNewOrganization);

// Edit organization
router.get("/edit/:id", buildEditOrganization);
router.post("/edit/:id", updateOrganization);

// Organization detail
router.get("/:id", buildOrganizationDetail);

export default router;