import {
    getAllOrganizations,
    getOrganizationById,
    insertOrganization,
    updateOrganizationById
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

export const buildNewOrganization = async (req, res, next) => {
    try {
        res.render("new-organization", {
            title: "Add New Organization"
        });
    } catch (error) {
        next(error);
    }
};

export const addNewOrganization = async (req, res, next) => {
    try {
        const { name, description, contact_email, logo_filename } = req.body;

        await insertOrganization({
            name,
            description,
            contact_email,
            logo_filename
        });

        res.redirect("/organizations");
    } catch (error) {
        next(error);
    }
};

export const buildEditOrganization = async (req, res, next) => {
    try {
        const id = req.params.id;
        const organization = await getOrganizationById(id);

        if (!organization) {
            return res.status(404).render("errors/404", {
                title: "Organization Not Found"
            });
        }

        res.render("edit-organization", {
            title: `Edit ${organization.name}`,
            organization
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrganization = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, description, contact_email, logo_filename } = req.body;

        await updateOrganizationById(id, {
            name,
            description,
            contact_email,
            logo_filename
        });

        res.redirect(`/organizations/${id}`);
    } catch (error) {
        next(error);
    }
};