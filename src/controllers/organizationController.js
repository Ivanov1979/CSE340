import {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId
} from "../models/organization-model.js";

export async function buildOrganizations(req, res, next) {
    try {
        const organizations = await getAllOrganizations();

        res.render("organizations", {
            title: "Organizations",
            organizations
        });
    } catch (error) {
        next(error);
    }
}

export async function buildOrganizationDetail(req, res, next) {
    try {
        const organizationId = req.params.id;

        const organization = await getOrganizationById(organizationId);
        const projects = await getProjectsByOrganizationId(organizationId);

        if (!organization) {
            return res.status(404).render("errors/404", {
                title: "Organization Not Found"
            });
        }

        res.render("organization-detail", {
            title: organization.name,
            organization,
            projects
        });
    } catch (error) {
        next(error);
    }
}