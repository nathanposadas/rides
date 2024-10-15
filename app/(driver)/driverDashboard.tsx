import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { icons } from '@/constants';
import requests, { Request } from '@/constants/passengerDate'; // Ensure the path is correct

const DriverDashboard = () => {
  const router = useRouter();

  const [quickRideRequest, setQuickRideRequest] = useState<Request | null>(null);
  const [serviceRideRequest, setServiceRideRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(false); // Set loading state to false initially

  const getRandomRequest = (): Request => {
    const randomIndex = Math.floor(Math.random() * requests.length);
    return requests[randomIndex];
  };

  useEffect(() => {
    const fetchRequests = () => {
      setLoading(true); // Start loading when fetching new requests
      setTimeout(() => {
        setQuickRideRequest(getRandomRequest());
        setServiceRideRequest(getRandomRequest());
        setLoading(false); // Stop loading after fetching new requests
      }, 500); // Simulate a delay for demonstration
    };

    fetchRequests(); // Initial fetch
    const interval = setInterval(fetchRequests, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Function to handle navigation
  const handleNavigate = (request: Request | null) => {
    if (request) {
      setLoading(true); // Start loading indicator
      setTimeout(() => {
        setLoading(false); // Stop loading after a brief delay for demonstration
        router.push({
          pathname: '/driverMaps',
          params: {
            name: request.name,
            destination: request.destination,
            time: request.time,
          },
        });
      }, 1000); // Simulate network delay
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-200">
      {/* Header */}
      <View className="bg-gray-300 p-4 flex-row justify-between items-center">
        <Text className="text-black font-bold text-2xl">Rider Dashboard</Text>
        
        {/* Profile Icon */}
        <TouchableOpacity onPress={() => router.push('/driverProfile')}>
          <Image
            source={icons.profile}
            className="w-10 h-10 rounded-full"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Quick Ride Card */}
      <View className="bg-gray-300 p-4 mt-4 mx-4 rounded-md">
        <Text className="text-yellow-500 font-bold text-lg">Quick Ride</Text>
        <Text className="font-bold text-xl">New Request!</Text>

        <View className="bg-yellow-300 p-4 mt-2 rounded-md">
          {loading ? ( // Loading indicator for Quick Ride
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Text className='font-bold'>Name: {quickRideRequest?.name || 'N/A'}</Text>
              <Text className='font-bold'>Destination: {quickRideRequest?.destination || 'N/A'}</Text>
              <Text className='font-bold'>Fare: {quickRideRequest?.fare || 'N/A'}</Text>
            </>
          )}
        </View>

        <View className="flex-row justify-around mt-4">
          {/* Accept Button */}
          <TouchableOpacity
            className="bg-green-500 px-4 py-2 rounded-md"
            onPress={() => handleNavigate(quickRideRequest)} // Safe navigation
          >
            <Text className="text-white font-bold">ACCEPT</Text>
          </TouchableOpacity>

          {/* Decline Button */}
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 rounded-md"
          >
            <Text className="text-white font-bold">DECLINE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Service Ride Card */}
      <View className="bg-gray-300 p-4 mt-4 mx-4 rounded-md">
        <Text className="text-orange-500 font-bold text-lg">Service</Text>
        <Text className="font-bold text-xl">New Request!</Text>

        <View className="bg-yellow-300 p-4 mt-2 rounded-md">
          {loading ? ( // Loading indicator for Service Ride
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Text className='font-bold'>Name: {serviceRideRequest?.name || 'N/A'}</Text>
              <Text className='font-bold'>Schedule:</Text>
              <Text className='font-bold'>Month: {serviceRideRequest?.schedule || 'N/A'}</Text>
              <Text className='font-bold'>Day: {serviceRideRequest?.day || 'N/A'}</Text>
              <Text className='font-bold'>Time: {serviceRideRequest?.time || 'N/A'}</Text>
            </>
          )}
        </View>

        <View className="flex-row justify-around mt-4">
          {/* Accept Button */}
          <TouchableOpacity
            className="bg-green-500 px-4 py-2 rounded-md"
            onPress={() => handleNavigate(serviceRideRequest)} // Safe navigation
          >
            <Text className="text-white font-bold">ACCEPT</Text>
          </TouchableOpacity>

          {/* Decline Button */}
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 rounded-md"
          >
            <Text className="text-white font-bold">DECLINE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DriverDashboard;
