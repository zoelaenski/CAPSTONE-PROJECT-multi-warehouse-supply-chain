const Supplier = require("../models/supplier.model");

const createSupplier = async (data) =>{
    const supplier = new Supplier(data) ;
    return await supplier .save () ;
} ;

const getALLSuppliers = async () => {
    return await Supplier .find() ;
} ;

const getSupplierById = async (id) => {
    return await Supplier .findById(id) .populate("productsSupplied") ;
} ;

const updateSupplier = async (id, data) =>{
    return await Supplier .findByIdAndUpdate(id, data, { new: true }) ;
} ;

const deactivateSupplier = async (id) => {
    return await Supplier .findByIdAndUpdate(
        id,
        { status: "inactive" },
        { new:  true }
    );
};

const linkProduct = async (id, productId) => {
    return  await Supplier.findByIdAndUpdate(
        id,
        {$addToSet: { productsSupplied: productId } },
        { new: true }
    );
};

const unlinkProduct = async (id, productId) => {
    return await Supplier.findByIdAndUpdate(
        id,
        { $pull: { productsSupplied: productId } },
        { new: true }
    );
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