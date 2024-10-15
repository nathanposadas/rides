// PaymentScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router';

const PaymentScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [fare, setFare] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  const router = useRouter();

  const handlePayment = () => {
    if (!mobileNumber || !fare) {
      Alert.alert('Error', 'Please enter both mobile number and fare');
      return;
    }

    // Show the modal
    setModalVisible(true);

    // Hide the modal after 10 seconds
    setTimeout(() => {
      setModalVisible(false);
      Alert.alert('Payment Success', `Payment of $${fare} initiated for ${mobileNumber}`);
    }, 10000);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-lg font-bold mb-4">Enter Mobile Number and Fare</Text>
      
      <TextInput
        className="border border-gray-300 rounded p-2 w-full mb-4"
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      
      <TextInput
        className="border border-gray-300 rounded p-2 w-full mb-4"
        placeholder="Fare Amount"
        keyboardType="numeric"
        value={fare}
        onChangeText={setFare}
      />
      
      <TouchableOpacity
        className="bg-blue-500 rounded p-3 w-full mb-2"
        onPress={handlePayment}
      >
        <Text className="text-white text-center">Pay with GCash</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        className="bg-gray-300 rounded p-3 w-full"
        onPress={() => router.replace('/(root)/(tabs)/home')}
      >
        <Text className="text-center">Back</Text>
      </TouchableOpacity>

      {/* Modal for payment confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-5 rounded shadow-lg">
            <Text className="text-lg font-bold">Processing Payment...</Text>
            <Text className="mt-2">Mobile Number: {mobileNumber}</Text>
            <Text className="mt-2">Fare: ${fare}</Text>
            <Text className="mt-4 text-gray-600">Please wait for confirmation...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentScreen;
