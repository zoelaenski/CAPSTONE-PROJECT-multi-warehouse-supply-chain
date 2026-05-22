const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorMiddleware = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const supplierRoutes = require('./routes/supplier.routes');
const inventoryRoutes = require('./routes/inventory.routes');
const transferRoutes = require('./routes/transfer.route');
const purchaseOrderRoutes = require('./routes/purchaseOrder.routes');
const warehouseRoutes = require('./routes/warehouse.routes');
const reportRoutes = require('./routes/report.routes');
const shipmentRoutes = require('./routes/shipment.routes');

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Multi-Warehouse Supply Chain API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/shipments', shipmentRoutes);

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorMiddleware);

module.exports = app;
