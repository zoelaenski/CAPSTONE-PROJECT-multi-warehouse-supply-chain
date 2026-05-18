require("dotenv").config();

const connectDB = require("./config/database");
const shipmentRoute = require("./routes/shipmentRoute");
const warehouseRoute = require("./routes/warehouseRoute");
const express = require("express");

const app = express();
app.use(express.json());
connectDB();

app.use("/api", shipmentRoute);
app.use("/api", warehouseRoute);

app.listen(process.env.PORT, () => {
  console.log(`the current port is ${process.env.PORT}`);
});
