// app/profile.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo'; // Import useUser for accessing user info
import { useClerk } from '@clerk/clerk-expo'; // Import useClerk for logout functionality

const ProfileScreen = () => {
  const router = useRouter();
  const { user } = useUser(); // Get user info
  const clerk = useClerk(); // Access Clerk's functions

  // Function to handle user logout
  const handleLogout = async () => {
    await clerk.signOut(); // Log out the user
    router.push('/(auth)/sign-in'); // Redirect to sign-in page after logout
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Text className="text-blue-500">Back</Text>
      </TouchableOpacity>

      {/* Profile Picture */}
      <View className="items-center mb-6">
        <View className="w-24 h-24 bg-gray-300 rounded-full justify-center items-center">
          <Text className="text-xl text-white">U</Text>
        </View>
      </View>

      {/* User Information */}
      <Text className="font-bold text-lg">Name</Text>
      <TextInput className="border-b border-gray-300 py-2" value="JUAN DELA CRUZ" editable={false} />

      <Text className="font-bold text-lg mt-4">4 digit PIN</Text>
      <TextInput className="border-b border-gray-300 py-2" value="1234" secureTextEntry={true} />

      <Text className="font-bold text-lg mt-4">Email Address</Text>
      <TextInput className="border-b border-gray-300 py-2" value="juandelacruz@gmail.com" editable={false} />

      {/* Logout Button */}
      <TouchableOpacity className="bg-orange-400 mt-6 p-2 rounded" onPress={handleLogout}>
        <Text className="text-center text-black">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
