import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "@/constants";
import CalendarComponent from "@/components/calendar";

const RideLayout = ({
  title,
  snapPoints,
  children,
}: {
  title: string;
  snapPoints?: string[];
  children: React.ReactNode;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView className="flex-1">
      
      <View className="flex-1 bg-white">
        {/* Scrollable content */}
        <ScrollView className="flex flex-col h-screen bg-gray-200">
          {/* Calendar with padding and rounded corners */}
          <View className="pt-28 px-4 rounded-2xl mb-4">
            <CalendarComponent />
          </View>

          {/* Container for consistency in width */}
          <View className="px-4">
            {/* First View with matching width */}
            <View className="bg-gray-400 p-4 rounded-lg mb-4">
              <Text className="font-bold mb-1">Attended: </Text>
              <Text className="font-bold mb-1">Absent: </Text>
              <Text className="font-bold mb-1">Daily Fare: </Text>
            </View>

            {/* Empty View with space */}
            <View className="mb-4"></View>

            {/* Second View with centered "Service Schedule" text */}
            <View className="bg-gray-400 p-4 rounded-lg">
              <Text className="font-bold text-center mb-4">Service Schedule</Text> 
              <Text className="font-bold mb-1">Month: </Text>
              <Text className="font-bold mb-1">Day: </Text>
              <Text className="font-bold mb-1">Time: </Text>
            </View>

            <View className="mb-4"></View>

            <View>
              <Text className="font-bold pb-28">Total Pay: </Text>
            </View>
          </View>

          {/* Back button */}
          <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-JakartaSemiBold ml-5">
              {title || "Go Back"}
            </Text>
          </View>
        </ScrollView>

        {/* Bottom sheet content */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["10%", "80%"]}
          index={0}
        >
          {title === "Choose a Rider" ? (
            <BottomSheetView
              style={{
                flex: 1,
                padding: 20,
              }}
            >
              {children}
            </BottomSheetView>
          ) : (
            <BottomSheetScrollView
              style={{
                flex: 1,
                padding: 5,
              }}
            >
              {children}
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
