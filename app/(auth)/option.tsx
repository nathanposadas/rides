//ito yung sa may choose option kung passenger ba o driver, pagtapos ng swiper

import { Href, router } from "expo-router";
import { View, Image, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";

export default function option () {
  return(
    <SafeAreaView className="flex-1 flex-start py-20 justify-center items-center bg-white">
     <Image source={images.logo} className="z-0 w-full h-[100px]"/>
     <Text className="py-3 font-bold text-center text-2xl">
        Welcome to SanToda
     </Text>
     <Text className="py-3">
        Please Choose User Option
     </Text>

      <View className="flex-row justify-center gap-10">
      <CustomButton title="Passenger" className=" w-28 h-13 bg-orange-400
      " onPress={() => router.push(`/(auth)/sign-in` as Href)} />

      <CustomButton className=" w-28 h-13 bg-yellow-400" title="Driver" onPress={() => router.push('/(auth)/sign-in')}/>
      </View>
    </SafeAreaView>
  )
}
