import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, SafeAreaView, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import Map from "@/components/map";
import { useLocationStore } from '@/store';
import * as Location from "expo-location";

const App = () => {
  const router = useRouter(); 
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false); 
  const [pickupConfirmed, setPickupConfirmed] = useState<boolean>(false); // State to track pickup confirmation

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

  const handlePickupConfirmation = () => {
    if (!pickupConfirmed) {
      // First time confirming the pickup location
      setPickupConfirmed(true);
    } else {
      // Second time: maybe change the location or reset state if needed
      setPickupConfirmed(false); // For demonstration, it toggles back to the unconfirmed state
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-5">
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.push('/(root)/(tabs)/home')} className="mb-5">
          <Text className="text-blue-500 font-bold">Back</Text>
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
          <Text className="font-bold">Rider:</Text>
          <Text className="mb-2 font-bold">Body No.</Text>
          <Text className="font-bold">Total Fare:</Text>
          
          <Text className="font-bold">From:</Text>
          <Text className="mb-2 font-bold">To:</Text>
          <Text className="font-bold">Selected Payment Option:</Text>

          <View className="flex-row justify-between my-2">
            <CustomButton title="Cash" onPress={() => setModalVisible(true)} className="flex-1 mr-1" />
            <CustomButton title="GCash" onPress={() => router.push('/PaymentScreeen') } className="flex-1 ml-1" />
          </View>

          <View className="mt-5">
            <Button
              title={pickupConfirmed ? "Drop-Off confirm" : "Confirm Pickup Location"}
              onPress={handlePickupConfirmation}
              color={pickupConfirmed ? "#10B981" : "#FBBF24"} // Changes color to green after confirming
            />
          </View>
        </View>

        {/* Modal */}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
