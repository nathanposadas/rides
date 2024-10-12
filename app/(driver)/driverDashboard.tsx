import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Href, useRouter } from 'expo-router'; // Import the useRouter hook
import { router } from "expo-router";

// Define types for RequestCard props
type Schedule = {
  month: string;
  day: string;
  time: string;
};

type RequestCardProps = {
  type: string;
  typeColor: string;
  name: string;
  destination?: string;  // optional, as it's only used for Quick Ride
  fare?: string;         // optional, as it's only used for Quick Ride
  schedule?: Schedule;   // optional, as it's only used for Service Request
};

const HomeScreen = () => {
  const router = useRouter(); // Initialize the router

  const navigateToProfile = () => {
    router.push('/driverProfile'); // Change the path to /driverProfile
  };

  return (
    <View className="flex-1 bg-gray-200">
      {/* Header */}
      <View className="bg-gray-300 p-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/icon1.png')} // Replace with the SanToda logo path
            className="w-12 h-12"
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold ml-2">SanToda</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-lg font-bold">Rider Dashboard</Text>
          <TouchableOpacity onPress={navigateToProfile} className="ml-4">
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/user-male-circle.png' }}
              className="w-8 h-8"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Language Button */}
      <View className="p-4 flex-row justify-end">
        <TouchableOpacity className="bg-yellow-400 px-4 py-2 rounded-lg">
          <Text className="text-black">Tagalog ▼</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Request Cards */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="p-4">
        {/* Quick Ride Request */}
        <RequestCard
          type="Quick Ride"
          typeColor="bg-yellow-400"
          name="Juan Dela Cruz"
          destination="Santolan - Parada"
          fare="Php15"
        />

        {/* Service Request */}
        <RequestCard
          type="Service"
          typeColor="bg-orange-400"
          name="Juan Dela Cruz"
          schedule={{
            month: 'October',
            day: 'Mon-Fri',
            time: '7am',
          }}
        />
      </ScrollView>
    </View>
  );
};

// Updated RequestCard component with types
const RequestCard: React.FC<RequestCardProps> = ({ type, typeColor, name, destination, fare, schedule }) => {
  return (
    <View className="bg-gray-300 p-4 rounded-lg mb-4">
      {/* Ride Type Tag */}
      <View className="flex-row items-center">
        <TouchableOpacity className={`${typeColor} px-4 py-2 rounded-full`}>
          <Text className="text-white font-bold">{type}</Text>
        </TouchableOpacity>
      </View>

      {/* Request Details */}
      <Text className="text-xl font-bold mt-4">New Request!</Text>
      <View className="bg-yellow-300 p-4 mt-2 rounded-lg">
        <Text className="text-base font-bold">
          Name: <Text className="font-normal">{name}</Text>
        </Text>

        {/* Conditionally render destination and fare if available */}
        {destination && fare && (
          <>
            <Text className="text-base">Destination: {destination}</Text>
            <Text className="text-base">Fare: {fare}</Text>
          </>
        )}

        {/* Conditionally render schedule if available */}
        {schedule && (
          <>
            <Text className="text-base">Schedule:</Text>
            <Text className="ml-2 text-sm">Month: {schedule.month}</Text>
            <Text className="ml-2 text-sm">Day: {schedule.day}</Text>
            <Text className="ml-2 text-sm">Time: {schedule.time}</Text>
          </>
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity  onPress={() => router.push("/driverMaps" as Href)} className="bg-green-500 px-4 py-2 rounded-lg">
          <Text className="text-white">ACCEPT</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-lg" >
          <Text className="text-white">Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
