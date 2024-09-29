import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import DarkActButton from "@/components/DarkActButton";
import { LinearGradient } from "expo-linear-gradient";

const Index = () => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#1e3c72", "#2a5298"]} // Adjust the colors as needed
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welcome to Shishu</Text>
        <DarkActButton
          title="Register Now"
          onPress={() => router.push("/register")}
        />
      </View>

    </LinearGradient>
  );
};

// Add this to hide the header
export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "NunitoEBold",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
    borderRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
  },
});

export default Index;
