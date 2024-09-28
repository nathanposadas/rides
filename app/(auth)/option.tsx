//ito yung sa may choose option kung passenger ba o driver, pagtapos ng swiper

import { Href, router } from "expo-router";
import { Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

export default function option () {
  return(
    <SafeAreaView>
      <Text>SanToda</Text>
      <View className="">
      <CustomButton title="Passenger" className=" bg-orange-400
      " onPress={() => router.push(`/(auth)/sign-in` as Href)} />

      <CustomButton className="bg-yellow-400" title="Driver"/>
      </View>
    </SafeAreaView>
  )
}
