//ito yung sa may choose option kung passenger ba o driver, pagtapos ng swiper

import { Href, router } from "expo-router";
import { Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

export default function option () {
  return(
    <SafeAreaView className="flex-1 flex-start py-20 justify-center items-center bg-white">
     
      <Text className="font-JakartaBold text-2xl mb-6 text-left">SanToda</Text>
     
      <View className="flex-row justify-center gap-10">
      <CustomButton title="Passenger" className=" w-28 h-13 bg-orange-400
      " onPress={() => router.push(`/(auth)/sign-in` as Href)} />

      <CustomButton className=" w-28 h-13 bg-yellow-400" title="Driver"/>
      </View>
    </SafeAreaView>
  )
}
