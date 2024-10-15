import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router"; // Assuming you're using expo-router for navigation
import { StatusBar } from "expo-status-bar";

const PaymentScreen = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState({
    passengerName: "Juan Dela Cruz",
    paidAmount: 150, // Example amount
  });

  useEffect(() => {
    // Simulate a payment processing delay of 10 seconds
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 10000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleDone = () => {
    // Navigate back to the previous screen or the main dashboard
    router.replace('/(driver)/driverDashboard');
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <StatusBar style="dark" />
      <View className="bg-white rounded-lg p-6 shadow-md">
        <Text className="text-xl font-bold mb-4">Payment Received</Text>
        {isProcessing ? (
          <>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text className="mt-4 text-center">Processing Payment...</Text>
          </>
        ) : (
          <>
            <Text className="text-lg font-bold mb-2">Passenger Name:</Text>
            <Text className="text-lg">{paymentDetails.passengerName}</Text>
            <Text className="text-lg font-bold mb-2 mt-4">Amount Paid:</Text>
            <Text className="text-lg text-green-600">
              Php {paymentDetails.paidAmount}
            </Text>

            <TouchableOpacity
              className="bg-green-500 rounded-lg p-2 mt-6"
              onPress={handleDone}
            >
              <Text className="text-white text-center font-bold">Done</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default PaymentScreen;
