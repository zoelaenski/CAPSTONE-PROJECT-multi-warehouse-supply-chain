const shipmentService = require("../services/shipment.service");

exports.createShipment = async (req, res) => {
  try {
    const { fromWarehouse, destination, item, carrier } = req.body;

    let itemCount = item.length; //

    if (!fromWarehouse || !destination || itemCount < 1 || !carrier) {
      return res.status(400).json({
        sucess: false,
        message: "fromWarehouse, destination, item and carrier are required",
        data: req.body,
      });
    }
    const newShipment = shipmentService.addShipment(req.body);

    return res.status(201).json({
      success: true,
      message: "The shipment has been created",
      data: newShipment,
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.getShipments = async (req, res) => {
  try {
    const shipments = shipmentService.fetchShipment();
    let shipmentsCount = shipments.length;
    if (shipmentsCount > 0) {
      console.log(shipments);
      return res.status(200).json({
        success: true,
        message: "shipments successfully fetched.",
        data: shipments,
      });
    }
    return res.status(400).json({
      success: false,
      message: "No shipments found.",
      data: shipments,
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.getShipmentById = async (req, res) => {
  try {
    const shxpment = shipmentService.fetchShipmentById(req);
    if (shxpment) {
      return res.status(200).json({
        success: true,
        message: "The shipment with this id is;",
        data: shxpment,
      });
    }
    return res.status(400).json({
      success: false,
      message: "This shipment isn't in the database.",
      data: shxpment,
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.dispatchedShipment = async (req, res) => {
  service.updatedDispatchedStatus(req, res);
};

exports.deliveredShipment = async (req, res) => {
  service.updateDeliveredStatus(req, res);
};

exports.failedShipment = async (req, res) => {
  service.updateFailedStatus(req, res);
};

exports.dispatched = async (req, res) => {
  service.fetchDispatched(req, res);
};

exports.delivered = async (req, res) => {
  service.fetchDelivered(req, res);
};

exports.failed = async (req, res) => {
  service.fetchFailed(req, res);
};

exports.fromThisWarehouse = async (req, res) => {
  service.fetchShipmentsByWarehouse(req, res);
};
