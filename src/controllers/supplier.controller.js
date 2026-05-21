const supplierService = require("../services/supplier.service");

const createSupplier = async (req, res, next) => {
    try {
        const supplier = await supplierService.createSupplier(req.body);
        res.status(201).json({ success: true, data: supplier });
    }   catch (error) {
          next(error);
    }
};

const getALLSuppliers = async ( req, res, next) => {
    try {
        const suppliers = await supplierService.getALLSuppliers();
        res.status(200).json({ success: true, data: suppliers });
    }   catch (error) {
          next(error);
    }
};

const getSupplierById = async (req, res, next) => {
    try {
        const supplier = await supplierService.getSupplierById(req.params.id);
        res.status(200).json({ success: true, data: supplier });
    }   catch (error) {
          next(error);
    }
};

const updateSupplier = async (req, res, next) => {
    try {
        const supplier = await supplierService.updateSupplier(req.params.id,req.body);
        res.status(200).json({ success: true, data: supplier });
    }   catch (error) {
          next(error);
    }
};

const deactivateSupplier = async (req, res, next) => {
    try {
        const supplier = await supplierService.deactivateSupplier(req.params.id);
        res.status(200).json({ success: true, data: supplier });
    }   catch (error) {
          next(error);
    }
};

const linkProduct = async (req, res, next) => {
    try {
        const supplier = await supplierService.linkProduct(req.params.id, req.body.productId);
        res.status(200).json({ success: true, data: supplier });
    }   catch (error) {
          next(error);
    }
};

const unlinkProduct = async (req, res, next) => {
    try {
        const supplier = await supplierService.unlinkProduct(req.params.id, req.params.productId);
        res.status(200).json({ success: true, data: supplier });
    }   catch (error) {
          next(error);
    }
};

module.exports = {
    createSupplier,
    getALLSuppliers,
    getSupplierById,
    updateSupplier,
    deactivateSupplier,
    linkProduct,
    unlinkProduct,
};