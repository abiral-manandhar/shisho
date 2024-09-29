import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { auth, store } from "@/hooks/useFirebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native"; // For navigation
import * as ScreenOrientation from "expo-screen-orientation";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
const { width, height } = Dimensions.get("window");
const CARD_SIZE = width * 0.42;

const HomeScreen = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    weight: "",
    height: "",
    username: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDocRef = doc(store, "users", currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
          await setDoc(userDocRef, {
            email: currentUser.email,
            weight: 0,
            height: 0,
          });
          console.log("User document created:", currentUser.email);
        } else {
          const data = docSnap.data();
          setUserData({
            weight: data.weight.toString(),
            height: data.height.toString(),
            username: data.username.toString(),
            email: data.email.toString(),
          });
          console.log("User document already exists:", data);
        }
      } else {
        console.error("No user is currently logged in.");
      }
    };

    fetchUser();
  }, [auth.currentUser?.email]);

  const navigation = useNavigation(); // Get the navigation object

  return (
    <View style={styles.container}>
      {/* Half background */}
      <View style={styles.halfBackground} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Top Section */}
        <View style={styles.topContainer}>
          <Text style={styles.greetingText}>
            Good Morning, {userData.username}
          </Text>
          <Text style={styles.questionText}>How Are You Feeling Today?</Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Checkup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Consult</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* Conditions Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Where to?</Text>
          <Text style={styles.healthText}>Health</Text>
        </View>

        {/* Card Grid */}
        <View style={styles.gridContainer}>
          {/* Games Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs)/games")} // Link to the 'games' tab
          >
            <Text style={styles.cardText}>Games</Text>
          </TouchableOpacity>

          {/* FoodBuddy Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs)/food")} // Link to the 'food' tab
          >
            <Text style={styles.cardText}>Vaccination</Text>
          </TouchableOpacity>

          {/* Bot Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs)/bot")} // Link to the 'bot' tab
          >
            <Text style={styles.cardText}>Bot</Text>
          </TouchableOpacity>

          {/* Profile Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs)/profile")} // Link to the 'user' tab (Profile)
          >
            <Text style={styles.cardText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6", // Background color for the other half
    position: "relative",
  },
  halfBackground: {
    backgroundColor: Colors.primary,
    width: "100%",
    height: height * 0.4, // Quarter of the screen height
    position: "absolute",
    top: 0,
    left: 0,
    borderBottomRightRadius: 50, // Adding some curve to make it aesthetic
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: height * 0.2, // Start content below the background
  },
  topContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#FFF", // White text to stand out on dark background
    marginBottom: 10,
  },
  questionText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: "100%",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  callButton: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.3,
    marginLeft: 10,
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFF",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  healthText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0492b2",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    backgroundColor: "#0492b2",
    width: CARD_SIZE,
    height: CARD_SIZE * 0.9,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF",
  },
});

export default HomeScreen;
