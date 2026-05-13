const mongoose = require('mongoose');
const warehouseService = require('../services/warehouse.service');

const createWarehouse = async (req, res, next) => {
    try {
        const { name, location, capacity, managerName } = req.body;

        // Basic validation
        if (!name || !location ) {
            return res.status(400).json({
                success: false,
                message: 'Name and location are required' });
        }
        if (capacity && typeof capacity !== 'number') {
            return res.status(400).json({
                success: false,
                message: 'Capacity must be a number' });
        }

        const newWarehouse = await warehouseService.createWarehouse(req.body);

        res.status(201).json({
            success: true,
            message: 'Warehouse created successfully',
            data: newWarehouse
        });
    } catch (error) {
        // console.error('Error creating warehouse:', error);
        next(error);
}
};

// Get all warehouses
const getAllWarehouses = async (req, res, next) => {
    try {
        const warehouses = await warehouseService.getAllWarehouses();
        res.status(200).json({
            success: true,
            message: 'Warehouses retrieved successfully',
            data: warehouses
        });
    } catch (error) {
        // console.error('Error fetching warehouses:', error);
        next(error);
    }
};

// Get a warehouse by ID
const getWarehouseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid warehouse ID' });
        }
        const warehouse = await warehouseService.getWarehouseById(id);
        if (!warehouse) {
            return res.status(404).json({ 
                success: false,
                message: 'Warehouse not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Warehouse retrieved successfully',
            data: warehouse
        });
    } catch (error) {
        // console.error('Error fetching warehouse:', error);
        next(error);
    }
};

// Update a warehouse (only name, location, capacity, managerName can be updated)   
const updateWarehouse = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid warehouse ID' });
        }
        const updatedWarehouse = await warehouseService.updateWarehouse(id, req.body);
        if (!updatedWarehouse) {
            return res.status(404).json({ 
                success: false,
                message: 'Warehouse not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Warehouse updated successfully',
            data: updatedWarehouse
        });
    } catch (error) {
        // console.error('Error updating warehouse:', error);
        next(error);
    }
};


// Delete a warehouse (soft delete by setting status to 'inactive')
const deactivateWarehouse = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid warehouse ID' });
        }
        const deactivatedWarehouse = await warehouseService.deactivateWarehouse(id);
        if (!deactivatedWarehouse) {
            return res.status(404).json({ 
                success: false,
                message: 'Warehouse not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Warehouse deactivated successfully',
            data: deactivatedWarehouse
        });
    } catch (error) {
        // console.error('Error deactivating warehouse:', error);
        next(error);
    }
};

module.exports = {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deactivateWarehouse
};