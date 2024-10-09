import React from "react";
import { View, Text, TouchableOpacity, Switch, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Map from '@/components/map';

const SanTodaScreen = () => {
  const [isAvailable, setIsAvailable] = React.useState(true);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="dark" />
      <View className="flex-row justify-between items-center p-4 bg-gray-200">
        <Text className="text-xl font-bold">SanToda</Text>
        <View className="flex-row items-center">
          <Text className="mr-2">{isAvailable ? "Available" : "Unavailable"}</Text>
          <Switch
            value={isAvailable}
            onValueChange={() => setIsAvailable(!isAvailable)}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isAvailable ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
      </View>

     <View className="h-52 bg-gray-200 mb-5">
      <Map/>
     </View>

      <View className="p-4">
        <View className="flex-row justify-between">
          <TouchableOpacity className="bg-red-500 rounded-lg p-2 flex-1 mr-2">
            <Text className="text-white text-center font-bold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-green-500 rounded-lg p-2 flex-1 ml-2">
            <Text className="text-white text-center font-bold">Pick Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="bg-blue-500 rounded-lg p-2 mt-4">
          <Text className="text-white text-center font-bold">I’m Here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SanTodaScreen;
