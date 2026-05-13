const warehouseService = require('../services/warehouse.service');

const createWarehouse = async (req, res) => {
    try {
        const { name, location, capacity, managerName } = req.body;

        // Basic validation
        if (!name || !location ) {
            return res.status(400).json({ message: 'Name and location are required' });
        }
        if (capacity && typeof capacity !== 'number') {
            return res.status(400).json({ message: 'Capacity must be a number' });
        }

        const newWarehouse = await warehouseService.createWarehouse(req.body);

        res.status(201).json({
            message: 'Warehouse created successfully',
            data: newWarehouse
        });
    } catch (error) {
        // console.error('Error creating warehouse:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
}
};

// Get all warehouses
const getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await warehouseService.getAllWarehouses();
        res.status(200).json({
            message: 'Warehouses retrieved successfully',
            data: warehouses
        });
    } catch (error) {
        // console.error('Error fetching warehouses:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get a warehouse by ID
const getWarehouseById = async (req, res) => {
    try {
        const { id } = req.params;
        const warehouse = await warehouseService.getWarehouseById(id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.status(200).json({
            message: 'Warehouse retrieved successfully',
            data: warehouse
        });
    } catch (error) {
        // console.error('Error fetching warehouse:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update a warehouse (only name, location, capacity, managerName can be updated)   
const updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWarehouse = await warehouseService.updateWarehouse(id, req.body);
        if (!updatedWarehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.status(200).json({
            message: 'Warehouse updated successfully',
            data: updatedWarehouse
        });
    } catch (error) {
        // console.error('Error updating warehouse:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


// Delete a warehouse (soft delete by setting status to 'inactive')
const deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWarehouse = await warehouseService.deleteWarehouse(id);
        if (!deletedWarehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.status(200).json({
            message: 'Warehouse deleted successfully',
            data: deletedWarehouse
        });
    } catch (error) {
        // console.error('Error deleting warehouse:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
};