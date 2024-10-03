import React from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { icons, images } from "@/constants";


const HomeScreen = () => {
  const { user } = useUser();

  return (
    <View className="flex-1 bg-white">
      {/* Fixed Header */}
      <View className="bg-gray-200 p-4 flex-row justify-between items-center">
        <Text className="text-2xl font-bold">SanToda</Text>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/user-male-circle.png' }}
            className="w-8 h-8"
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="p-4">
        {/* Authentication Block */}
        <SignedIn>
          <Text className="text-lg font-bold mb-4">
            Hello, {user?.emailAddresses[0].emailAddress}
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

        <Text className="text-lg font-bold text-center mb-4">
          Welcome to SanToda Hailing App
        </Text>

        {/* Rider Cards */}
        <View className={`bg-black p-4 rounded-lg mb-4`}>
        <Image
          className=" w-24 h-24 mb-2"
          resizeMode="contain"
        />
        <Text className="text-xl font-bold mb-2 text-white">Moto Rider Name</Text>
        <Text className="text-sm mb-4 text-white">Estimated Fare:</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="bg-yellow-500 py-2 px-4 rounded">
            <Text className="text-white">Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-orange-500 py-2 px-4 rounded">
            <Text className="text-white">Service</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-500 py-2 px-4 rounded">
            <Text className="text-white">Details</Text>
          </TouchableOpacity>
        </View>
    </View>

    <View className={`bg-gray-400 p-4 rounded-lg mb-4`}>
        <Image
          className=" w-24 h-24 mb-2"
          resizeMode="contain"
        />
        <Text className="text-xl font-bold mb-2">Moto Rider Name</Text>
        <Text className="text-sm mb-4">Estimated Fare:</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="bg-yellow-500 py-2 px-4 rounded">
            <Text className="text-white">Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-orange-500 py-2 px-4 rounded">
            <Text className="text-white">Service</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-500 py-2 px-4 rounded">
            <Text className="text-white">Details</Text>
          </TouchableOpacity>
        </View>
    </View>

    <View className={`bg-yellow-600 p-4 rounded-lg mb-4`}>
        <Image
          className=" w-24 h-24 mb-2"
          resizeMode="contain"
        />
        <Text className="text-xl font-bold mb-2">Moto Rider Name</Text>
        <Text className="text-sm mb-4">Estimated Fare:</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="bg-yellow-500 py-2 px-4 rounded">
            <Text className="text-white">Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-orange-500 py-2 px-4 rounded">
            <Text className="text-white">Service</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-500 py-2 px-4 rounded">
            <Text className="text-white">Details</Text>
          </TouchableOpacity>
        </View>
    </View>
      </ScrollView>

      {/* Footer Language Button */}
      <View className="absolute bottom-0 right-0 p-4">
        <TouchableOpacity className="bg-gray-300 px-4 py-2 rounded-lg">
          <Text className="text-black">Tagalog ▼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
