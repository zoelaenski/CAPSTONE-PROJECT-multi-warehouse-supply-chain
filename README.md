# Multi-Warehouse Supply Chain API

## Project Description

The Multi-Warehouse Supply Chain API is a backend system designed to manage inventory, warehouses, suppliers, shipments, transfers, and purchase orders across multiple warehouse locations.

The API provides secure role-based access control for Admin and Staff users and includes complete API documentation using Swagger.


## Features

- User Authentication with JWT
- Role-Based Authorization (Admin & Staff)
- Product Management
- Category Management
- Warehouse Management
- Inventory Tracking
- Supplier Management
- Purchase Order Processing
- Warehouse Transfers
- Shipment Tracking
- Reports & Analytics
- Swagger API Documentation

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Swagger UI
- Postman

## Project Structure

```bash
src/
├── controllers/
├── models/
├── routes/
├── services/
├── middlewares/
├── utils/
├── app.js
└── server.js
```

## Installation

Clone the repository:

```bash
git clone https://github.com/zoelaenski/CAPSTONE-PROJECT-multi-warehouse-supply-chain
```

Navigate into the project directory:

```bash
cd CAPSTONE-PROJECT-multi-warehouse-supply-chain
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=
JWT_SECRET=
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```

## Running the Project

 Base URL

```bash
http://localhost:5000/api
```
Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Documentation

Swagger documentation is available at:

```bash
http://localhost:5000/api/docs
```

## Authentication

Most endpoints require JWT authentication.

Use the token returned from the login endpoint:

Authorization: Bearer <your_token>

To access protected endpoints in Swagger:

1. Login using `/api/auth/login`
2. Copy the returned JWT token
3. Click the **Authorize** button in Swagger UI
4. Enter:

```bash
Bearer your_token
```

## Contributors

Backend Development Team – Group 20