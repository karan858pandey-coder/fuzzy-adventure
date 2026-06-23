const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/delivery-partners', require('./routes/deliveryPartners'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/restaurants', require('./routes/restaurants'));

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Delivery partner goes online
  socket.on('delivery-partner-online', (data) => {
    console.log('Delivery partner online:', data.partnerId);
    socket.broadcast.emit('partner-status-changed', {
      partnerId: data.partnerId,
      status: 'online',
      location: data.location
    });
  });

  // Delivery partner location update
  socket.on('location-update', (data) => {
    io.emit('partner-location-updated', {
      partnerId: data.partnerId,
      latitude: data.latitude,
      longitude: data.longitude,
      timestamp: new Date()
    });
  });

  // Order status update
  socket.on('order-status-update', (data) => {
    io.emit('order-updated', {
      orderId: data.orderId,
      status: data.status,
      partnerId: data.partnerId
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = server;
