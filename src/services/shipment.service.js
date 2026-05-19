const shipment = require("../models/shipment.model");

exports.addShipment = async (req, res) => {
  const { fromWarehouse, destination, item, carrier } = req.body;

  let itemCount = item.length; //

  if (!fromWarehouse || !destination || itemCount < 1 || !carrier) {
    return res.status(400).json({
      sucess: false,
      message: "fromWarehouse, destination, item and carrier are required",
      data: req.body,
    });
  }

  await shipment.create(req.body);
  console.log(`the shipment ${req.body} has created`);
  res.status(201).json({
    success: true,
    message: "The shipment has been created",
    data: req.body,
  });
};

exports.fetchShipment = async (req, res) => {
  try {
    const shipments = await shipment.find();
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

exports.fetchShipmentById = async (req, res) => {
  try {
    const shxpment = await shipment.findOne({ _id: req.params.id });
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

exports.updatedDispatchedStatus = async (req, res) => {
  try {
    const isFound = await shipment.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "dispatched",
        dispatchedAt: new Date(),
      },
    );
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

exports.updateDeliveredStatus = async (req, res) => {
  try {
    const isFound = await shipment.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "delivered",
        deliveredAt: new Date(),
        proofOfDelivery: "A note affirming the delivery of this package.",
      },
    );
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

exports.updateFailedStatus = async (req, res) => {
  try {
    const isFound = await shipment.findOneAndUpdate(
      { _id: req.params.id },
      { status: "failed" },
    );
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

exports.fetchDispatched = async (req, res) => {
  try {
    const dispatchedShipments = await shipment.find({ status: "dispatched" });
    let dispatchedShipmentsCount = dispatchedShipments.length;
    if (dispatchedShipmentsCount == 0) {
      return res.status(400).json({ success: false, message: "no shipments have been dispatched", data: dispatchedShipments);
    }
    return res.status(200).json({ success: true, message: "The shipments that have been dispatched are;", data: dispatchedShipments });
  } catch (err) {
    console.error(err.message);
  }
};

exports.fetchDelivered = async (req, res) => {
  try {
    const deliveredShipments = await shipment.find({ status: "delivered" });
    let deliveredShipmentCount = deliveredShipments.length;
    if (deliveredShipmentCount == 0) {
      return res.status(400).json({ success: false, message: "no shipments have been delivered", data: deliveredShipments });
    }
    return res.status(200).json({ success: true, message: "The shipments that have been delivered are;", data: deliveredShipments });
  } catch (err) {
    console.error(err.message);
  }
};

exports.fetchFailed = async (req, res) => {
  try {
    const failedShipments = await shipment.find({ status: "failed" });
    let failedShipmentCount = failedShipments.length;
    if (failedShipmentCount == 0) {
      return res.status(400).json({success:false, message:"no shipments have failed", data:failedShipments});
    }
    return res.status(200).json({ success: true, message: "The shipments that have failed are;", data: failedShipments });
  } catch (err) {
    console.error(err.message);
  }
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
      return res.status(400).json({ success: false, message: "there are no shipments from this warehouse", data: shipmentsFromWarehouse });
    }
    return res.status(200).json({success:true, message:"The shipments from this warehouse are;",data:shipmentsFromWarehouse});
  } catch (err) {
    console.error(err.message);
  }
};
