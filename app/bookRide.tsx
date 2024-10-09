import React from 'react';
import { View, Text, Button, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Or use useNavigation from react-navigation
import CustomButton from '@/components/CustomButton';
import Map from "@/components/map";

const App = () => {
  const router = useRouter(); // For back navigation

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
          <Map/>
        </View>

        {/* Rider Information */}
        <View className="mb-5">
          <Text className="font-bold">Rider:</Text>
          <Text className="mb-2">Body No.</Text>
          <Text className="font-bold">Total Fare:</Text>
          <Text className="mb-2">Destination:</Text>
          <Text className="font-bold">From:</Text>
          <Text className="mb-2">To:</Text>
          <Text className="font-bold">Selected Payment Option:</Text>

          <View className="flex-row justify-between my-2">
            <CustomButton title="Cash" onPress={() => {}} className="flex-1 mr-1" />
            <CustomButton title="GCash" onPress={() => {}} className="flex-1 ml-1" />
          </View>

          <View className="mt-5">
          <Button title="Confirm Pickup Location" onPress={() => {}} color="#FBBF24" />
        </View>
        </View>

       
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
