# Food Delivery App - API Endpoints Documentation

## Base URL
```
http://localhost:5000/api
```

---

## Delivery Partner Endpoints

### 1. Register Delivery Partner
**POST** `/delivery-partners/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "password": "password123",
  "vehicleType": "bike",
  "licenseNumber": "DL123456"
}
```

**Response:**
```json
{
  "message": "Delivery partner registered successfully",
  "partnerId": "60d5ec49c1234567890abcde",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 2. Login Delivery Partner
**POST** `/delivery-partners/login`

**Request Body:**
```json
{
  "phone": "9876543210",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "partnerId": "60d5ec49c1234567890abcde"
}
```

---

### 3. Set Delivery Partner Online
**POST** `/delivery-partners/online`

**Request Body:**
```json
{
  "partnerId": "60d5ec49c1234567890abcde",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

**Response:**
```json
{
  "message": "Partner is now online",
  "status": "online"
}
```

---

### 4. Set Delivery Partner Offline
**POST** `/delivery-partners/offline`

**Request Body:**
```json
{
  "partnerId": "60d5ec49c1234567890abcde"
}
```

**Response:**
```json
{
  "message": "Partner is now offline",
  "status": "offline"
}
```

---

### 5. Get Delivery Partner Details
**GET** `/delivery-partners/:partnerId`

**Response:**
```json
{
  "partnerId": "60d5ec49c1234567890abcde",
  "name": "John Doe",
  "rating": 4.8,
  "onlineStatus": "online",
  "earnings": 5000,
  "totalOrders": 150
}
```

---

### 6. Get Partner Earnings
**GET** `/delivery-partners/:partnerId/earnings`

**Response:**
```json
{
  "today": 500,
  "week": 3500,
  "month": 15000,
  "total": 45000
}
```

---

## Order Endpoints

### 1. Get Available Orders
**GET** `/orders/available?latitude=28.6139&longitude=77.2090&partnerId=60d5ec49c1234567890abcde`

**Response:**
```json
[
  {
    "orderId": "60d5ec49c1234567890abcde",
    "restaurantName": "Pizza Palace",
    "deliveryAddress": "123 Main St, Delhi",
    "distance": 2.5,
    "fare": 50,
    "items": ["Pizza", "Coke"]
  }
]
```

---

### 2. Accept Order
**POST** `/orders/:orderId/accept`

**Request Body:**
```json
{
  "partnerId": "60d5ec49c1234567890abcde"
}
```

**Response:**
```json
{
  "message": "Order accepted",
  "orderId": "60d5ec49c1234567890abcde",
  "status": "assigned"
}
```

---

### 3. Reject Order
**POST** `/orders/:orderId/reject`

**Response:**
```json
{
  "message": "Order rejected",
  "orderId": "60d5ec49c1234567890abcde",
  "status": "pending"
}
```

---

### 4. Pickup Order
**POST** `/orders/:orderId/pickup`

**Request Body:**
```json
{
  "partnerId": "60d5ec49c1234567890abcde",
  "timestamp": "2024-06-23T10:30:00Z"
}
```

**Response:**
```json
{
  "message": "Order picked up",
  "orderId": "60d5ec49c1234567890abcde",
  "status": "picked_up"
}
```

---

### 5. Deliver Order
**POST** `/orders/:orderId/delivered`

**Request Body:**
```json
{
  "partnerId": "60d5ec49c1234567890abcde",
  "timestamp": "2024-06-23T10:45:00Z"
}
```

**Response:**
```json
{
  "message": "Order delivered",
  "orderId": "60d5ec49c1234567890abcde",
  "status": "delivered"
}
```

---

## Real-time Events (Socket.IO)

### Client to Server Events

**delivery-partner-online**
```javascript
socket.emit('delivery-partner-online', {
  partnerId: '60d5ec49c1234567890abcde',
  location: { latitude: 28.6139, longitude: 77.2090 }
});
```

**location-update**
```javascript
socket.emit('location-update', {
  partnerId: '60d5ec49c1234567890abcde',
  latitude: 28.6139,
  longitude: 77.2090
});
```

**order-status-update**
```javascript
socket.emit('order-status-update', {
  orderId: '60d5ec49c1234567890abcde',
  status: 'picked_up',
  partnerId: '60d5ec49c1234567890abcde'
});
```

### Server to Client Events

**partner-status-changed**
```javascript
socket.on('partner-status-changed', (data) => {
  console.log('Partner status:', data.status);
});
```

**partner-location-updated**
```javascript
socket.on('partner-location-updated', (data) => {
  console.log('Partner location:', data.latitude, data.longitude);
});
```

**order-updated**
```javascript
socket.on('order-updated', (data) => {
  console.log('Order status:', data.status);
});
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong",
  "statusCode": 400
}
```

Common HTTP Status Codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
