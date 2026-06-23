/**
 * Database Models for Food Delivery App
 * 
 * This file contains MongoDB schema definitions for all entities
 */

// ===== DELIVERY PARTNER MODEL =====
const DeliveryPartnerSchema = {
  _id: 'ObjectId',
  name: 'String',
  phone: 'String (unique)',
  email: 'String (unique)',
  password: 'String (hashed)',
  vehicleType: 'String (bike, car, scooter)',
  licenseNumber: 'String',
  aadhar: 'String',
  bankAccount: 'Object',
  status: 'String (online, offline, busy)',
  currentLocation: {
    latitude: 'Number',
    longitude: 'Number',
    lastUpdated: 'Date'
  },
  currentOrderId: 'ObjectId (nullable)',
  totalOrders: 'Number',
  totalEarnings: 'Number',
  rating: 'Number (0-5)',
  reviews: 'Array',
  documents: 'Array (verification)',
  createdAt: 'Date',
  updatedAt: 'Date'
};

// ===== ORDER MODEL =====
const OrderSchema = {
  _id: 'ObjectId',
  userId: 'ObjectId (reference to User)',
  restaurantId: 'ObjectId (reference to Restaurant)',
  deliveryPartnerId: 'ObjectId (reference to DeliveryPartner, nullable)',
  items: 'Array (food items with quantity)',
  totalAmount: 'Number',
  deliveryFee: 'Number',
  discountAmount: 'Number',
  paymentMethod: 'String (card, wallet, cash)',
  paymentStatus: 'String (pending, completed, failed)',
  status: 'String (pending, confirmed, picked_up, delivered, cancelled)',
  deliveryAddress: 'Object (street, city, zip, coordinates)',
  pickupTime: 'Date (nullable)',
  deliveryTime: 'Date (nullable)',
  estimatedDeliveryTime: 'Date',
  specialInstructions: 'String',
  rating: 'Number (0-5, nullable)',
  review: 'String (nullable)',
  createdAt: 'Date',
  updatedAt: 'Date'
};

// ===== USER MODEL =====
const UserSchema = {
  _id: 'ObjectId',
  name: 'String',
  email: 'String (unique)',
  phone: 'String',
  password: 'String (hashed)',
  profileImage: 'String (URL)',
  addresses: 'Array (saved addresses)',
  favoriteRestaurants: 'Array (ObjectId)',
  orderHistory: 'Array (ObjectId)',
  wallet: 'Number',
  createdAt: 'Date',
  updatedAt: 'Date'
};

// ===== RESTAURANT MODEL =====
const RestaurantSchema = {
  _id: 'ObjectId',
  name: 'String',
  description: 'String',
  cuisine: 'Array (Chinese, Indian, Fast Food)',
  address: 'Object',
  location: {
    latitude: 'Number',
    longitude: 'Number'
  },
  phone: 'String',
  email: 'String',
  image: 'String (URL)',
  menu: 'Array (food items)',
  operatingHours: 'Object (open, close times)',
  rating: 'Number (0-5)',
  deliveryTime: 'Number (minutes)',
  deliveryFee: 'Number',
  minOrderAmount: 'Number',
  totalOrders: 'Number',
  status: 'String (open, closed, busy)',
  createdAt: 'Date',
  updatedAt: 'Date'
};

// ===== EARNINGS MODEL =====
const EarningsSchema = {
  _id: 'ObjectId',
  deliveryPartnerId: 'ObjectId (reference to DeliveryPartner)',
  orderId: 'ObjectId (reference to Order)',
  amount: 'Number',
  date: 'Date',
  status: 'String (pending, completed, withdrawn)',
  createdAt: 'Date',
  updatedAt: 'Date'
};

module.exports = {
  DeliveryPartnerSchema,
  OrderSchema,
  UserSchema,
  RestaurantSchema,
  EarningsSchema
};
