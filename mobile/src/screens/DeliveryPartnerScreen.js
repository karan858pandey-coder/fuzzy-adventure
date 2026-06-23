import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DeliveryPartnerScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [location, setLocation] = useState(null);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const navigation = useNavigation();

  // Toggle online/offline status
  const handleOnlineToggle = async (value) => {
    setIsOnline(value);
    if (value) {
      // Start tracking location
      startLocationTracking();
      Alert.alert('Online', 'You are now online and accepting orders');
    } else {
      // Stop tracking location
      stopLocationTracking();
      Alert.alert('Offline', 'You are now offline');
    }
  };

  const startLocationTracking = () => {
    // TODO: Implement GPS tracking
    console.log('Location tracking started');
  };

  const stopLocationTracking = () => {
    // TODO: Implement GPS tracking stop
    console.log('Location tracking stopped');
  };

  useEffect(() => {
    // TODO: Fetch current orders from backend
    // TODO: Fetch earnings from backend
  }, [isOnline]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Delivery Partner</Text>
      </View>

      {/* Online Status */}
      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status</Text>
        <View style={styles.onlineToggle}>
          <Text style={styles.statusText}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </Text>
          <Switch
            value={isOnline}
            onValueChange={handleOnlineToggle}
            trackColor={{ false: '#767577', true: '#81c784' }}
            thumbColor={isOnline ? '#4caf50' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Earnings Card */}
      <View style={styles.earningsCard}>
        <Text style={styles.earningsLabel}>Today's Earnings</Text>
        <Text style={styles.earningsAmount}>₹{earnings}</Text>
      </View>

      {/* Current Orders */}
      <View style={styles.ordersSection}>
        <Text style={styles.ordersTitle}>Active Orders: {currentOrders.length}</Text>
        {currentOrders.length === 0 ? (
          <Text style={styles.noOrdersText}>No active orders</Text>
        ) : (
          currentOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <Text>Order #{order.id}</Text>
              <Text>Pickup: {order.restaurantName}</Text>
              <Text>Delivery: {order.deliveryAddress}</Text>
            </View>
          ))
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text style={styles.buttonText}>📋 Available Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Earnings')}
        >
          <Text style={styles.buttonText}>💰 Earnings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  onlineToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  earningsCard: {
    backgroundColor: '#4caf50',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  earningsLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  ordersSection: {
    marginBottom: 16,
  },
  ordersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  noOrdersText: {
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default DeliveryPartnerScreen;
