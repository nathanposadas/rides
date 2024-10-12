import { Text, View, TextInput, TouchableOpacity } from "react-native";
import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Service">
      <View className="my-3 items-center">
        <Text className="text-lg font-JakartaSemiBold mb-3">
          Create Service Schedule
        </Text>
      </View>

      {/* Input fields with aligned labels and inputs */}
      <View className="mb-3">
        <View className="flex-row items-center mb-3">
          <Text className="w-32">Type of Service:</Text>
          <TextInput
            className="bg-white p-2 rounded-lg border border-gray-300 flex-1"
            placeholder="Enter service type"
          />
        </View>

        <View className="flex-row items-center mb-3">
          <Text className="w-32">Guardian: </Text>
          <TextInput
            className="bg-white p-2 rounded-lg border border-gray-300 flex-1"
            placeholder="Enter guardian name"
          />
        </View>

        <View className="flex-row items-center mb-3">
          <Text className="w-32">Add Children: </Text>
          <TextInput
            className="bg-white p-2 rounded-lg border border-gray-300 flex-1"
            placeholder="Enter children names"
          />
        </View>

        <View className="flex-row items-center mb-3">
          <Text className="w-32">Pick-Up Location: </Text>
          <TextInput
            className="bg-white p-2 rounded-lg border border-gray-300 flex-1"
            placeholder="Enter pick-up location"
          />
        </View>

        <View className="flex-row items-center mb-3">
          <Text className="w-32">Drop-Off Location: </Text>
          <TextInput
            className="bg-white p-2 rounded-lg border border-gray-300 flex-1"
            placeholder="Enter drop-off location"
          />
        </View>
      </View>

      {/* Payment Option buttons */}
      <View className="flex-row items-center mb-4">
        <Text className="w-32">Payment Option: </Text>
        <TouchableOpacity className="bg-gray-300 p-2 rounded-lg mr-2">
          <Text>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-500 p-2 rounded-lg">
          <Text className="text-white">GCash</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm button with adjusted size */}
      <View className="items-center">
        <CustomButton title="Confirm" className="w-full bg-yellow-400 py-3 rounded-lg" />
      </View>
    </RideLayout>
  );
};

export default FindRide;
