const shipment = require("../models/shipment.model");

exports.addShipment = async (data) => {
  return await shipment.create(data);
};

exports.fetchShipment = async (req, res) => {
  const shipments = await shipment.find();
  return shipments;
};

exports.fetchShipmentById = async (req) => {
  const shxpment = await shipment.findOne({ _id: req.params.id });
  return shxpment;
};

exports.updatedDispatchedStatus = async (req) => {
  const isFound = await shipment.findOneAndUpdate(
    { _id: req.params.id },
    {
      status: "dispatched",
      dispatchedAt: new Date(),
    },
  );
  return isFound;
};

exports.updateDeliveredStatus = async (req) => {
  const isFound = await shipment.findOneAndUpdate(
    { _id: req.params.id },
    {
      status: "delivered",
      deliveredAt: new Date(),
    },
  );
  return isFound;
};

exports.updateFailedStatus = async (req) => {
  const isFound = await shipment.findOneAndUpdate(
    { _id: req.params.id },
    { status: "failed" },
  );

  return isFound;
};

exports.fetchDispatched = async () => {
  const dispatchedShipments = await shipment.find({ status: "dispatched" });
  return dispatchedShipments;
};

exports.fetchDelivered = async () => {
  const deliveredShipments = await shipment.find({ status: "delivered" });
  return deliveredShipments;
};

exports.fetchFailed = async () => {
  const failedShipments = await shipment.find({ status: "failed" });
  return failedShipments;
};

exports.fetchShipmentsByWarehouse = async (req, res) => {
  try {
    let warehouseId = req.params.warehouseId;
    const shipmentsFromWarehouse = await shipment.find({
      fromWarehouse: warehouseId,
    });
    console.log(shipmentsFromWarehouse.length);
    let size = shipmentsFromWarehouse.length;
    if (size == 0) {
      return res.status(400).json({
        success: false,
        message: "there are no shipments from this warehouse",
        data: shipmentsFromWarehouse,
      });
    }
    return res.status(200).json({
      success: true,
      message: "The shipments from this warehouse are;",
      data: shipmentsFromWarehouse,
    });
  } catch (err) {
    console.error(err.message);
  }
};
