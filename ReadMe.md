# 🏫 School Management API

A Node.js + Express.js REST API for managing schools stored in a MySQL database. It supports adding new schools and retrieving a list of nearby schools based on the user's location.

## 🌐 Live API

- **Base URL**: `https://school-management-api-6b9j.onrender.com/api`

---

## 📦 Features

- Add new schools with name, address, and coordinates.
- List all schools sorted by geographic distance from a user-specified location.
- Input validation and distance calculation included.

---

## 🧱 Database Schema

**Table:** `schools`

| Column     | Type     | Description                  |
|------------|----------|------------------------------|
| `id`       | INT      | Primary Key (Auto Increment) |
| `name`     | VARCHAR  | Name of the school           |
| `address`  | VARCHAR  | Address of the school        |
| `latitude` | DECIMAL  | Latitude coordinate          |
| `longitude`| DECIMAL  | Longitude coordinate         |

---

## 🚀 API Endpoints

### ➕ Add a School

- **Endpoint:** `POST /addSchool`

#### Request Body

```json
{
  "name": "Calcutta International School",
  "address": "724, Anandapur, Eastern Metropolitan Bypass, Kolkata, West Bengal 700107",
  "latitude": 22.5208,
  "longitude": 88.4091
}
```

#### Response

```json
{
  "message": "School added successfully",
  "school": {
    "id": 11,
    "name": "Calcutta International School",
    "address": "724, Anandapur, Eastern Metropolitan Bypass, Kolkata, West Bengal 700107",
    "latitude": 22.5208,
    "longitude": 88.4091
  }
}
```

---

### 📍 List Schools by Proximity

* **Endpoint:** `GET /listSchools`

#### Query Parameters

| Param       | Type   | Description              |
|-------------|--------|--------------------------|
| `latitude`  | number | User's current latitude  |
| `longitude` | number | User's current longitude |

#### Example Request

```bash
curl --location 'https://school-management-api-6b9j.onrender.com/api/listSchools?latitude=22.50158425&longitude=88.36170996'
```

#### Example Response

```json
{
  "message": "Sorted schools based on user's proximity (In kilometers)",
  "sortedSchools": [
    {
      "id": 7,
      "name": "DPS Ruby Park",
      "distance": 3.56,
      "latitude": 22.52,
      "longitude": 88.39
    },
    ...
  ]
}
```

---

## 🛠️ Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root folder and add the following placeholders:

```env
PORT=3000

DB_HOST=your-mysql-host
DB_USER=your-mysql-username
DB_PASSWORD=your-mysql-password
DB_DATABASE=your-database-name
DB_PORT=your-database-port

CA_PEM=-----BEGIN CERTIFICATE-----
<Your MySQL SSL CA Certificate Here>
-----END CERTIFICATE-----
```

> ⚠️ **Note**: Ensure correct formatting of `CA_PEM`. If multiline, wrap it in quotes or use a separate `.pem` file and load it in your code.

### 4. Start the Server

```bash
npm start
```

The API will run on: `http://localhost:3000`

---

## 📖 API Collection (Postman)

Test all APIs via the shared Postman workspace:

🔗 [Open Postman Collection](https://www.postman.com/security-geologist-29443273/workspace/public-workspace/collection/29194835-926c930d-4bb8-4e0b-9c03-2a9f7ee515bf?action=share&creator=29194835)

---

## 📬 Feedback & Contributions

Feel free to open issues or submit pull requests for improvements and feature requests.

---
