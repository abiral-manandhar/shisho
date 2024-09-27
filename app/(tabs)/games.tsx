import { View, Text } from "react-native";
import React from "react";

const games = () => {
  const router = useRouter();

  return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(tabs)/gayme")} // Navigating to the Profile screen
        >
         
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
  