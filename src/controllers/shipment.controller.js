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
  try {
    const isFound = shipmentService.updatedDispatchedStatus(req);
    if (isFound) {
      return res.status(200).json({
        success: true,
        message: "updated the shipment's status to dispatched",
      });
    }
    return res.status(400).json({
      success: false,
      message:
        "couldn't update the shipment's status because the shipment wasn't found.",
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.deliveredShipment = async (req, res) => {
  try {
    const isFound = service.updateDeliveredStatus(req);
    if (isFound) {
      return res.status(200).json({
        success: true,
        message: "updated the shipment's status to delivered",
      });
    }
    return res.status(400).json({
      success: false,
      message:
        "couldn't update the shipment's status because the shipment wasn't found.",
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.failedShipment = async (req, res) => {
  try {
    const isFound = shipmentService.updateFailedStatus(req);
    if (isFound) {
      return res.status(200).json({
        success: true,
        message: "updated the shipment's status to dispatched",
      });
    }
    return res.status(400).json({
      success: false,
      message:
        "couldn't update the shipment's status because the shipment wasn't found.",
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.dispatched = async (req, res) => {
  try {
    const dispatchedShipments = shipmentService.fetchDispatched();
    let dispatchedShipmentsCount = dispatchedShipments.length;
    if (dispatchedShipmentsCount == 0) {
      return res.status(400).json({
        success: false,
        message: "no shipments have been dispatched",
        data: dispatchedShipments,
      });
    }
    return res.status(200).json({
      success: true,
      message: "The shipments that have been dispatched are;",
      data: dispatchedShipments,
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.delivered = async (req, res) => {
  try {
    const deliveredShipments = shipmentService.fetchDelivered();
    let deliveredShipmentCount = deliveredShipments.length;
    if (deliveredShipmentCount == 0) {
      return res.status(400).json({
        success: false,
        message: "no shipments have been delivered",
        data: deliveredShipments,
      });
    }
    return res.status(200).json({
      success: true,
      message: "The shipments that have been delivered are;",
      data: deliveredShipments,
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.failed = async (req, res) => {
  try {
    const failedShipments = shipmentService.fetchFailed();
    let failedShipmentCount = failedShipments.length;
    if (failedShipmentCount == 0) {
      return res.status(400).json({
        success: false,
        message: "no shipments have failed",
        data: failedShipments,
      });
    }
    return res.status(200).json({
      success: true,
      message: "The shipments that have failed are;",
      data: failedShipments,
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.fromThisWarehouse = async (req, res) => {
  try {
    const shipmentsFromWarehouse =
      shipmentService.fetchShipmentsByWarehouse(req);
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
