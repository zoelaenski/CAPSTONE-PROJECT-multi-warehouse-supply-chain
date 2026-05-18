const shipment = require("../models/shipmentModel");

const express = require("express");
const app = express();
app.use(express.json());

exports.addShipment = async (req, res) => {
  const { fromWarehouse, destination, item, carrier } = req.body;

  let itemCount = item.length; //

  if (!fromWarehouse || !destination || itemCount < 1 || !carrier) {
    res.status(400).json({
      message: "fromWarehouse, destination, item and carrier are required",
    });
  }

  await shipment.create(req.body);
  console.log(`the shipment ${req.body} has created`);
  res
    .status(201)
    .json({ message: "The shipment has been created", data: req.body });
};

exports.fetchShipment = async (req, res) => {
  try {
    const shipments = await shipment.find();
    let shipmentsCount = shipments.length;
    if (shipmentsCount > 0) {
      console.log(shipments);
      res.status(200).json(shipments);
    }
    res.status(400).send("No shipments found.");
  } catch (err) {
    console.error(err.message);
  }
};

exports.fetchShipmentById = async (req, res) => {
  try {
    const shxpment = await shipment.findOne({ _id: req.params.id });
    if (shxpment) {
      res.status(200).json(shxpment);
    }
    res.status(400).send("This shipment isn't in the database.");
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
      res.status(200).send("updated the shipment's status to dispatched");
    }
    res
      .status(400)
      .send(
        "couldn't update the shipment's status because the shipment wasn't found.",
      );
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
      res.status(200).send("updated the shipment's status to dispatched");
    }
    res
      .status(400)
      .send(
        "couldn't update the shipment's status because the shipment wasn't found.",
      );
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
      res.status(200).send("updated the shipment's status to dispatched");
    }
    res
      .status(400)
      .send(
        "couldn't update the shipment's status because the shipment wasn't found.",
      );
  } catch (err) {
    console.error(err.message);
  }
};

exports.fetchDispatched = async (req, res) => {
  try {
    const dispatchedShipments = await shipment.find({ status: "dispatched" });
    let dispatchedShipmentsCount = dispatchedShipments.length;
    if (dispatchedShipmentsCount == 0) {
      res.status(400).send("no shipments have been dispatched");
    }
    res.status(200).json(dispatchedShipments);
  } catch (err) {
    console.error(err.message);
  }
};

exports.fetchDelivered = async (req, res) => {
  try {
    const deliveredShipments = await shipment.find({ status: "delivered" });
    let deliveredShipmentCount = deliveredShipments.length;
    if (deliveredShipmentCount == 0) {
      res.status(400).send("no shipments have been delivered");
    }
    res.status(200).json(deliveredShipments);
  } catch (err) {
    console.error(err.message);
  }
};

exports.fetchFailed = async (req, res) => {
  try {
    const failedShipments = await shipment.find({ status: "failed" });
    let failedShipmentCount = failedShipments.length;
    if (failedShipmentCount == 0) {
      res.status(400).send("no shipments have failed");
    }
    res.status(200).json(failedShipments);
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
      res.status(400).send("there are no shipments from this warehouse");
    }
    res.status(200).json(shipmentsFromWarehouse);
  } catch (err) {
    console.error(err.message);
  }
};
