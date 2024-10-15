import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react"; // Import useState for managing state
import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  const [childrenNames, setChildrenNames] = useState<string[]>([]); // State to track children names
  const [newChildName, setNewChildName] = useState(""); // State for input field
  const [scheduledTime, setScheduledTime] = useState(""); // State for scheduled time
  const [serviceType, setServiceType] = useState(""); // State for service type
  const [guardianName, setGuardianName] = useState(""); // State for guardian name
  const [pickupLocation, setPickupLocation] = useState(""); // State for pickup location
  const [dropoffLocation, setDropoffLocation] = useState(""); // State for drop-off location

  const handleAddChild = () => {
    if (newChildName.trim()) {
      setChildrenNames((prev) => [...prev, newChildName]); // Add new name to the list
      setNewChildName(""); // Clear the input field
    }
  };

  return (
    <RideLayout title="Service">
      <View className="my-3 items-center">
        <Text className="text-lg font-JakartaSemiBold mb-3">
          Create Service Schedule
        </Text>
      </View>

      {/* Input fields with aligned labels and inputs */}
      <View className="mb-3">
        <View className="flex-row items-center mb-3">
          <Text className="w-32">Type of Service:</Text>
          <TextInput
            className="bg-white p-2 rounded-lg border border-gray-300 flex-1"
            placeholder="Enter service type"
            value={serviceType}
            onChangeText={setServiceType} // Update service type state
          />
        </View>

        <View className="flex-row items-center mb-3">
          <Text className="w-32">Guardian:</Text>
          <TextInput
            className="bg-white p-2 rounded-lg border border-gray-300 flex-1"
            placeholder="Enter guardian name"
            value={guardianName}
            onChangeText={setGuardianName} // Update guardian name state
          />
        </View>

        <View className="flex-row items-center mb-3">
          <Text className="w-32">Add Children:</Text>
          <TextInput
            className="bg-white p-2 rounded-lg border border-gray-300 flex-1"
            placeholder="Enter children names"
            value={newChildName}
            onChangeText={setNewChildName} // Update input state
          />
          <TouchableOpacity
            onPress={handleAddChild} // Handle adding child
            className="bg-blue-500 p-2 rounded-lg ml-2"
          >
            <Text className="text-white">Add</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-gray-600 mb-3">
          Children Count: {childrenNames.length} {/* Display count */}
        </Text>

        <View className="flex-row items-center mb-3">
          <Text className="w-32">Pick-Up Location:</Text>
          <TextInput
            className="bg-white p-2 rounded-lg border border-gray-300 flex-1"
            placeholder="Enter pick-up location"
            value={pickupLocation}
            onChangeText={setPickupLocation} // Update pickup location state
          />
        </View>

        <View className="flex-row items-center mb-3">
          <Text className="w-32">Drop-Off Location:</Text>
          <TextInput
            className="bg-white p-2 rounded-lg border border-gray-300 flex-1"
            placeholder="Enter drop-off location"
            value={dropoffLocation}
            onChangeText={setDropoffLocation} // Update drop-off location state
          />
        </View>

        {/* New input field for scheduled time */}
        <View className="flex-row items-center mb-3">
          <Text className="w-32">Scheduled Time:</Text>
          <TextInput
            className="bg-white p-2 rounded-lg border border-gray-300 flex-1"
            placeholder="HH:MM AM/PM"
            value={scheduledTime}
            onChangeText={setScheduledTime} // Update scheduled time state
          />
        </View>
      </View>

      {/* Payment Option buttons */}
      <View className="flex-row items-center mb-4">
        <Text className="w-32">Payment Option:</Text>
        <TouchableOpacity className="bg-gray-300 p-2 rounded-lg mr-2">
          <Text>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-500 p-2 rounded-lg">
          <Text className="text-white">GCash</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm button with adjusted size */}
      <View className="items-center">
        <CustomButton title="Confirm" className="w-full bg-yellow-400 py-3 rounded-lg" />
      </View>
    </RideLayout>
  );
};

export default FindRide;
