const Warehouse = require('../models/warehouse.model');
// const Inventory = require('../models/inventory.model'); // needed for capacity calc

const createWarehouse = async (data) => {
    const warehouse = new Warehouse(data);
    return await warehouse.save();
};

const getAllWarehouses = async () => {
    return await Warehouse.find();
};

const getWarehouseById = async (id) => {
    const warehouse = await Warehouse.findById(id);
    if (!warehouse) throw new Error('Warehouse not found');
    return warehouse;
};

const updateWarehouse = async (id, data) => {
    const warehouse = await Warehouse.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!warehouse) throw new Error('Warehouse not found');
    return warehouse;
};

const deactivateWarehouse = async (id) => {
    return await updateWarehouse(id, { status: 'inactive' });
};

const calculateUsedCapacity = async (warehouseId) => {
    // Uncomment when your team's Inventory model is ready:
    // const result = await Inventory.aggregate([
    //   { $match: { warehouse: warehouseId } },
    //   { $group: { _id: null, total: { $sum: '$quantity' } } },
    // ]);
    // const used = result[0]?.total ?? 0;
    // return await updateWarehouse(warehouseId, { 'capacity.used': used });
};

module.exports = {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deactivateWarehouse,
    calculateUsedCapacity,
};