import {
    getAllOrganizations,
    getOrganizationById
} from "../models/organization-model.js";

export const buildOrganizations = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();

        res.render("organizations", {
            title: "Organizations",
            organizations
        });
    } catch (error) {
        next(error);
    }
};

export const buildOrganizationDetail = async (req, res, next) => {
    try {
        const id = req.params.id;

        const organization = await getOrganizationById(id);

        if (!organization) {
            return res.status(404).render("errors/404", {
                title: "Organization Not Found"
            });
        }

        res.render("organization-detail", {
            title: organization.name,
            organization
        });
    } catch (error) {
        next(error);
    }
};