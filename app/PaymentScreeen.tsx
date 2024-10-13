import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Linking, Alert } from 'react-native';
import axios from 'axios';

const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount) {
      Alert.alert('Input Error', 'Please enter an amount');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://your-backend-url.com/create-gcash-payment', {
        externalID: 'order-12345', // Replace with your dynamic order ID
        amount: Number(amount),
      });

      const paymentData = response.data;

      if (paymentData.status === 'PENDING') {
        // Redirect the user to the GCash payment URL
        const { checkoutURL } = paymentData;
        Linking.openURL(checkoutURL);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      Alert.alert('Error', 'Unable to process payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Amount (PHP):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
      />
      <Button
        title={isLoading ? 'Processing...' : 'Pay with GCash'}
        onPress={handlePayment}
        disabled={isLoading}
        color="#FBBF24"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default PaymentScreen;
