const warehouse = require("../models/warehouseModel");
const express = require("express");
const app = express();
app.use(express.json());

exports.createWarehouse = async (req, res) => {
  try {
    await warehouse.create(req.body);
    console.log(req.body);
    res.status(200).send(`${req.body}} has been saved to the database`);
  } catch (err) {
    console.error(err.message);
  }
};

exports.getWarehouse = async (req, res) => {
  const warehouses = await warehouse.find();
  res.status(200).json(warehouses);
};
