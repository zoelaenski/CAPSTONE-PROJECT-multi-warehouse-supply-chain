const shipment = require("../models/shipment.model"); //do not need this.
const service = require("../services/shipment.service");

const express = require("express");
const app = express();
app.use(express.json());

exports.createShipment = async (req, res) => {
  service.addShipment(req, res);
};

exports.getShipments = async (req, res) => {
  service.fetchShipment(req, res);
};

exports.getShipmentById = async (req, res) => {
  service.fetchShipmentById(req, res);
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
