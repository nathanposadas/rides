import { useSignUp, useSignIn } from "@clerk/clerk-expo";
import { TouchableOpacity, Text, Alert, Image, ScrollView, View } from "react-native";
import { Href, router } from "expo-router";
import { useCallback, useState } from "react";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/inputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";

const Auth = ({ isDriver }) => {  // Accept isDriver as a prop
  const { isLoaded: isSignUpLoaded, signUp, setActive: setActiveSignUp } = useSignUp();
  const { signIn, setActive: setActiveSignIn, isLoaded: isSignInLoaded } = useSignIn();

  const [isSigningIn, setIsSigningIn] = useState(true); // Toggle between Sign-In and Sign-Up
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pin: "", // For Sign-Up
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  // Sign-Up functionality
  const onSignUpPress = async () => {
    if (!isSignUpLoaded) return;

    try {
      if (form.pin.length !== 4) {
        Alert.alert("Error", "Please enter a 4-digit PIN.");
        return;
      }

      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isSignUpLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
            pin: form.pin,
          }),
        });
        await setActiveSignUp({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  // Sign-In functionality
  const onSignInPress = useCallback(async () => {
    if (!isSignInLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActiveSignIn({ session: signInAttempt.createdSessionId });
        router.replace(isDriver ? "/(driver)driverDashboard" : "/(root)/(tabs)/home"); // Adjust routing based on user type
      } else {
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isSignInLoaded, form, isDriver]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.logo} className="z-20 w-full h-[200px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            {isSigningIn ? (isDriver ? "Driver Sign In" : "Welcome Back!") : "Create Your Account"}
          </Text>
        </View>

        <View className="p-5">
          {!isSigningIn && (
            <InputField
              label="Name"
              placeholder="Enter name"
              icon={icons.person}
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
            />
          )}
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

          {/* Only show PIN field in Sign-Up */}
          {!isSigningIn && (
            <InputField
              label="4-Digit PIN"
              placeholder="Enter 4-digit PIN"
              icon={icons.lock}
              keyboardType="numeric"
              maxLength={4}
              value={form.pin}
              onChangeText={(value) => setForm({ ...form, pin: value })}
            />
          )}

          <CustomButton
            title={isSigningIn ? "Sign In" : "Sign Up"}
            onPress={isSigningIn ? onSignInPress : onSignUpPress}
            className="mt-6"
          />

          <OAuth />

          <TouchableOpacity onPress={() => setIsSigningIn(!isSigningIn)} className="mt-10">
            <Text className="text-lg text-center text-general-200">
              {isSigningIn
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Text>
          </TouchableOpacity>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => router.push(`/(root)/(tabs)/home`)}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default Auth;
