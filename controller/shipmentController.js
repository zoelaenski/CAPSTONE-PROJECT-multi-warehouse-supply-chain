const shipment = require("../models/shipmentModel");
const service = require("../services/shipmentService");

const express = require("express");
const app = express();
app.use(express.json());

exports.createShipment = () => {};

exports.getShipments = () => {};

exports.getShipmentById = () => {};

exports.dispatchedShipment = () => {};

exports.deliveredShipment = () => {};

exports.failedShipment = () => {};
