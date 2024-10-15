import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSearchParams, useRouter } from "expo-router";

const DriverScreen = () => {
  // Use useSearchParams to get the passed parameters
  const { attended, absent, currentMonth } = useSearchParams();
  
  // Use the router for navigation
  const router = useRouter();

  return (
    <View className="flex-1 bg-white p-4">
      {/* Back button */}    
      <View>
        <Text className="text-left text-lg text-blue-500 font-bold" onPress={() => router.back()}>Back</Text>
      </View>

      <Text className="text-xl font-bold mb-4">Driver's Dashboard</Text>

      <View className="bg-gray-300 p-4 rounded-md mb-4">
        <Text className="font-bold">Current Month: {currentMonth}</Text>
        <Text className="font-bold">Attended: {attended}</Text>
        <Text className="font-bold">Absent: {absent}</Text>
      </View>

      {/* Additional driver information can go here */}
    </View>
  );
};

export default DriverScreen;
