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

Backend Development Team – Group 20 | TS Academy – Phoenix Cohort

| Name | Email | Module |
| ---- | ----- | ------ |
| Abigail Zoe Francis (Team Lead) | abigailoluchi532@gmail.com | Project Setup, Authentication, Products & Categories, Inventory, Reports & Analytics |
| Odum Tobe David | odumtobe@gmail.com | Inventory |
| Uka Patience Amarachi | ukapatience7@gmail.com | Warehouse Transfers Controller & Routes |
| Adeniyi Elizabeth Adetutu | aadetutu413@gmail.com | Warehouse Model & Service |
| Abdulqawiyy Bolaji Yusuf | yusufabdul239@gmail.com | Warehouse Controller & Routes |
| Efih Joshua | efihjoshua17@gmail.com | Shipments & Deliveries |
| Olayinka Adedapo Abioye | abioyeolayinka0@gmail.com | Purchase Orders |
| Adewemimo Adefunmbi Amarachi | adefunmbiadewemimo@gmail.com | Warehouse Transfers Model & Service |
| Don Fortunate | Donfortunet.df@gmail.com | Postman Documentation |
| Rasheed Opeyemi Toheeb | rasheedopeyemi875@gmail.com | Products & Categories |
| Ikogba Daniel | ikogbdanielson@gmail.com | Documentation, Swagger UI, README, .env.example |
| Goodness O. | goziohu@gmail.com | Supplier Controller & Service |
| Udo Ikechukwu | kingsleyiyke15@gmail.com | Warehouse Service |
