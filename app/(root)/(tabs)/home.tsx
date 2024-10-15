import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { images } from "@/constants";
import { riders } from '@/constants/rider'; // Ensure this is a valid import
import { ImageSourcePropType } from 'react-native'; // Import the correct type

type Rider = {
  id: number;
  name: string;
  age: string;
  bodyNumber: string;
  vehicle: string;
  estimatedFare: string;
  bgColor: string;
  image: ImageSourcePropType; // Specify the image type correctly
};

const HomeScreen = () => {
  const { user } = useUser();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null); // Define type here

  // Function to navigate to the profile screen
  const navigateToProfile = () => {
    router.push('/passengerProfile'); // Correct path to navigate to the profile screen
  };

  // Function to open the modal and set the selected rider
  const openModal = (rider: Rider) => {
    setSelectedRider(rider);
    setModalVisible(true);
  };

  useEffect(() => {
    console.log('Riders:', riders); // Log riders data for debugging
  }, []);

  return (
    <View className="flex-1 bg-white">
      {/* Fixed Header */}
      <View className="bg-gray-200 p-4">
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center'>
            <Image
              source={images.signUpCar}
              className="w-20 h-16"
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold ml-0">SanToda</Text>
          </View>
          <View>
            {/* Navigate to Profile Screen */}
            <TouchableOpacity className='flex-1' onPress={navigateToProfile}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/user-male-circle.png' }}
                className="w-8 h-8"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-lg text-center font-bold mt-0">Welcome to SanToda Hailing App</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="p-4">
        {/* Authentication Block */}
        <SignedIn>
          <Text className="text-lg font-bold mb-4">
            Hello, {user?.emailAddresses[0]?.emailAddress || 'User'} {/* Ensure safe access */}
          </Text>
        </SignedIn>
        <SignedOut>
          <View className="flex-row justify-center mb-4">
            <Link href="/sign-in">
              <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded mr-2">
                <Text className="text-white">Sign In</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/sign-up">
              <TouchableOpacity className="bg-green-500 py-2 px-4 rounded">
                <Text className="text-white">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </SignedOut>

        {/* Rider Cards */}
        {riders.map((rider) => {
          // Add console logs for debugging each rider
          console.log('Rider:', rider);

          return (
            <View 
              key={rider.id} 
              style={{ backgroundColor: rider.bgColor || '#ccc' }} // Fallback background color
              className="p-4 rounded-lg mb-4"
            >
              <Image
                source={rider.image}
                className="w-24 h-24 mb-2"
                resizeMode="contain"
              />
              <Text className="text-xl font-bold mb-2 text-white">{rider.name || 'Unknown Rider'}</Text>
              <Text className="text-sm mb-4 text-white">Estimated Fare: {rider.estimatedFare || 'N/A'}</Text>

              <View className="flex-row justify-between">
                <TouchableOpacity className="bg-yellow-500 py-2 px-4 rounded" onPress={() => {
                  router.replace("/bookRide");
                }}>
                  <Text className="text-white">Book Now</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-orange-500 py-2 px-4 rounded">
                  <Text className="text-white" onPress={() => {
                  router.push("/PassengerServiceDashboard");
                }} >Service</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="bg-gray-500 py-2 px-4 rounded" 
                  onPress={() => openModal(rider)} // Open modal with the selected rider's info
                >
                  <Text className="text-white">Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Modal for Rider Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedRider(null);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50 bg-transparent">
          <View className="bg-white p-4 rounded-lg w-80 shadow-lg">
            {selectedRider && (
              <>
                <Text className="text-xl font-bold">{selectedRider.name || 'Unknown Rider'}</Text>
                <Text className="mt-2">Age: {selectedRider.age || 'N/A'}</Text>
                <Text className="mt-2">Body Number: {selectedRider.bodyNumber || 'N/A'}</Text>
                <Text className="mt-2">Vehicle: {selectedRider.vehicle || 'N/A'}</Text>
                <Text className="mt-2">Estimated Fare: {selectedRider.estimatedFare || 'N/A'}</Text>
                <TouchableOpacity
                  className="mt-4 bg-red-500 py-2 px-4 rounded"
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedRider(null);
                  }}
                >
                  <Text className="text-white">Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
