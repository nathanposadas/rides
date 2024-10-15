import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Modal, Button, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import Map from "@/components/map";
import { useLocationStore } from '@/store';
import * as Location from "expo-location";
import { riders } from '@/constants/rider'; // Import the riders array

const App = () => {
  const router = useRouter(); 
  const { setUserLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false); 
  const [confirmationModalVisible, setConfirmationModalVisible] = useState<boolean>(false); // New state for the confirmation modal
  const [fromLocation, setFromLocation] = useState<string>(''); // State to track "From" input
  const [toLocation, setToLocation] = useState<string>(''); // State to track "To" input

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-5">
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.push('/(root)/(tabs)/home')} className="mb-5">
          <Text className="text-blue-500 font-bold text-lg">Back</Text>
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require('@/assets/images/icon1.png')} // Replace with your logo path
          className="h-12 w-12 mb-5"
        />
        
        <Text className="text-2xl font-bold text-center mb-5">Set and Track Destination</Text>

        {/* Map Section */}
        <View className="h-52 bg-gray-200 mb-5">
          {/* Add your Map component here */}
          <Map />
        </View>

        {/* Rider Information */}
        <View className="mb-5">
          {/* Example: Rendering the first rider from the array */}
          {riders.length > 0 && (
            <>
              <View className="flex-row justify-between mb-2">
                <Text className="font-bold">Rider:</Text>
                <Text>{riders[0].name}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="font-bold">Body No.:</Text>
                <Text>{riders[0].bodyNumber}</Text>
              </View>
            </>
          )}
          
          <Text className="font-bold">Total Fare:</Text>

          {/* From Input */}
          <Text className="font-bold">From:</Text>
          <TextInput
            value={fromLocation}
            onChangeText={setFromLocation}
            placeholder="Enter pickup location"
            className="border border-gray-400 rounded p-2 mb-3"
          />

          {/* To Input */}
          <Text className="font-bold">To:</Text>
          <TextInput
            value={toLocation}
            onChangeText={setToLocation}
            placeholder="Enter destination"
            className="border border-gray-400 rounded p-2 mb-3"
          />
          
          <Text className="font-bold">Selected Payment Option:</Text>

          <View className="flex-row justify-between my-2">
            <CustomButton title="Cash" onPress={() => setModalVisible(true)} className="flex-1 mr-1" />
            <CustomButton title="GCash" onPress={() => router.push('/PaymentScreen')} className="flex-1 ml-1" />
          </View>

          {/* Show From and To locations when the button is pressed */}
          <View className="mt-5">
            <Button
              title="Show Pickup and Destination"
              onPress={() => setConfirmationModalVisible(true)} // Opens the confirmation modal
              color="#FBBF24"
            />
          </View>
        </View>

        {/* Payment Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-transparent bg-opacity-50 shadow-lg">
            <View className="bg-gray-100 p-5 rounded-lg w-4/5">
              <Text className="text-lg font-bold mb-4">Payment Option: Cash</Text>
              <Text className="mb-4">You have selected Cash as your payment method. Confirm?</Text>
              <Pressable
                className="bg-blue-500 p-3 rounded-full mb-3"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white text-center">Confirm</Text>
              </Pressable>
              <Pressable
                className="bg-gray-300 p-3 rounded-full"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-center">Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Confirmation Modal for From/To */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmationModalVisible}
          onRequestClose={() => setConfirmationModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-transparent bg-opacity-50 shadow-lg">
            <View className="bg-gray-100 p-5 rounded-lg w-4/5">
              <Text className="text-lg font-bold mb-4">Confirm Locations</Text>
              <Text className="mb-2">From: {fromLocation}</Text>
              <Text className="mb-4">To: {toLocation}</Text>
              <Pressable
                className="bg-blue-500 p-3 rounded-full mb-3"
                onPress={() => setConfirmationModalVisible(false)}
              >
                <Text className="text-white text-center">Confirm</Text>
              </Pressable>
              <Pressable
                className="bg-gray-300 p-3 rounded-full"
                onPress={() => setConfirmationModalVisible(false)}
              >
                <Text className="text-center">Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
