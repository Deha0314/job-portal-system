import { Company } from "../models/company.models.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {

        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            })
        }

        let company = await Company.findOne({ companyName: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company already exists",
                success: false,
            })
        }

        company = await Company.create({
            companyName: companyName,
            userId: req.id,
        })

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true,
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}

export const getCompanyDetailsByUser = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId: userId });

        if (!companies) {
            return res.status(404).json({
                message: "No company found",
                success: false,
            })
        }

        return res.status(200).json({
            message: 'Companies found',
            companies,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}


// get informations/details of a particular company
export const getCompanyDetailsById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId)

        if (!company) {
            return res.status(404).json({
                message: "No company found",
                success: false,
            })
        }

        return res.status(200).json({
            company,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}


export const updateCompany = async (req, res) => {
    try {

        const { companyName, description, website, location } = req.body;
        const file = req.file;

        // cloudinary
        let logo = null;

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData = {
            companyName, description, website, location, logo
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            })
        }

        return res.status(200).json({
            message: "Company information updated",
            company,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}


