import { Colors } from "@/constants/Colors";
import { vh } from "@/constants/Window";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 0, top: 0 }} // Correct safe area handling
      screenOptions={{
        tabBarStyle: {
          height: 7 * vh, // Adjusted height for better look
          backgroundColor: Colors.darkBackground, // Unified background color
          paddingBottom: 10, // Add padding for better spacing from bottom
        },
        tabBarLabelStyle: {
          fontSize: 12, // Slightly bigger font size for clarity
          fontFamily: "NunitoEBold", // Ensures consistency in font family
          paddingBottom: 5, // Padding for label
          margin: 0,
        },
        tabBarActiveTintColor: Colors.primary, // Primary color for active tabs
        tabBarInactiveTintColor: Colors.gray, // Gray for inactive tabs for visibility
        tabBarInactiveBackgroundColor: Colors.darkBackground, // Inactive background color
        tabBarActiveBackgroundColor: Colors.darkBackground, // Active background color
        headerShown: false, // Keep header hidden for a cleaner look
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} /> // Reduced size for better balance
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: "Games",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="gamepad" color={color} /> // Reduced size for better balance
          ),
        }}
      />
      <Tabs.Screen
        name="food"
        options={{
          title: "FoodBuddy",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="spoon" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bot"
        options={{
          title: "Bot",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="comment" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
