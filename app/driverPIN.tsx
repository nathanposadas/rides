import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

const PinScreen = () => {
  const [pin, setPin] = useState<string>(''); // Specify type for state

  const handlePinChange = (text: string) => { // Specify type for text parameter
    setPin(text);
  };

  const handleProceed = () => {
    // Handle proceed action (e.g., validate PIN, navigate to the next screen)
    console.log("PIN entered:", pin);
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white p-4">
      {/* Logo */}
      <Image
        source={require('@/assets/images/icon1.png')} // Replace with the correct path to your logo
        className="w-32 h-32 mb-4"
        resizeMode="contain"
      />
      
      {/* Title */}
      <Text className="text-xl font-bold mb-2">Welcome to SanToda</Text>
      <Text className="text-base text-center mb-4">Please enter your 4-PIN to sign in</Text>
      
      {/* PIN Input */}
      <TextInput
        value={pin}
        onChangeText={handlePinChange}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-center"
        keyboardType="number-pad"
        placeholder="4-PIN"
        maxLength={4} // Limit to 4 characters
        secureTextEntry // Mask the input
      />
      
      {/* Proceed Button */}
      <TouchableOpacity
        onPress={handleProceed}
        className="bg-yellow-400 px-4 py-2 rounded-lg"
      >
        <Text className="font-bold">Proceed</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PinScreen;
