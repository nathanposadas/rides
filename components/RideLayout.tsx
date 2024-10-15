import React, { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import CalendarComponent from "@/components/calendar";
import { icons } from "@/constants";
import { router } from "expo-router";

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
  const [attendedCount, setAttendedCount] = useState<number>(0);
  const [absentCount, setAbsentCount] = useState<number>(0);

  // Get current month and total days in the month
  const date = new Date();
  const currentMonth = date.toLocaleString('default', { month: 'long' }); // e.g., "October"
  const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // Total days in current month

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-white">
        <ScrollView className="flex flex-col h-screen bg-gray-200">
          <View className="pt-28 px-4 rounded-2xl mb-4">
            <CalendarComponent 
              setAttendedCount={setAttendedCount} 
              setAbsentCount={setAbsentCount} 
            />
          </View>

          <View className="px-4">
            <View className="bg-gray-400 p-4 rounded-lg mb-4">
              <Text className="font-bold mb-1">Attended: {attendedCount}</Text>
              <Text className="font-bold mb-1">Absent: {absentCount}</Text>
              <Text className="font-bold mb-1">Daily Fare: </Text>
            </View>
            <View className="bg-gray-400 p-4 rounded-lg mb-4">
              <Text className="font-bold mb-1">Month: {currentMonth}</Text>
              <Text className="font-bold mb-1">Days: {totalDays}</Text>
              <Text className="font-bold mb-1">Time: </Text>
            </View>
            <View >
              <Text className="font-bold mb-1 pb-28">Total Pay: </Text>
            </View>

            {/* Other content */}
          </View>

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

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["10%", "80%"]}
          index={0}
        >
          {title === "Choose a Rider" ? (
            <BottomSheetView style={{ flex: 1, padding: 20 }}>
              {children}
            </BottomSheetView>
          ) : (
            <BottomSheetScrollView style={{ flex: 1, padding: 5 }}>
              {children}
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
