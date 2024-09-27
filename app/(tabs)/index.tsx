import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from '@/hooks/useFirebase';
import { onAuthStateChanged } from "firebase/auth";

const HomeScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        router.push("/(tabs)/");
      } else {
        router.push("/(tabs)/");
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  if (loading) {
    // Show a loading spinner while checking authentication
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(tabs)/user")} // Navigating to the Profile screen
      >
        <Text style={styles.cardText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(tabs)/games")} // Navigating to the Games screen
      >
        <Text style={styles.cardText}>Games</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(tabs)/bot")} // Navigating to the BOT screen
      >
        <Text style={styles.cardText}>BOT</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(tabs)/food")} // Navigating to the Food Buddy screen
      >
        <Text style={styles.cardText}>Food Buddy</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = 150;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 4, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default HomeScreen;
