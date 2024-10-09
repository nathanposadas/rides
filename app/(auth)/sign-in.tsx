import { useSignIn } from "@clerk/clerk-expo";
import { TouchableOpacity, Text, Alert, Image, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { useCallback, useState } from "react";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/inputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";

const PassengerSignIn = () => {
  const { signIn, setActive: setActiveSignIn, isLoaded: isSignInLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Sign-In functionality
  const onSignInPress = useCallback(async () => {
    if (!isSignInLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        // Set session after successful sign in
        await setActiveSignIn({ session: signInAttempt.createdSessionId });

        // Route directly to the passenger dashboard upon successful sign-in
        router.replace("/(root)/(tabs)/home"); // Directly route to driver dashboard
      } else {
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors[0]?.longMessage || "An error occurred");
    }
  }, [isSignInLoaded, form]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.logo} className="z-20 w-full h-[200px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Passenger Sign In
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")} className="mt-10">
            <Text className="text-lg text-center text-general-200">
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PassengerSignIn;
