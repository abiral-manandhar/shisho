import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="games"
        options={{
          title: "Games",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="gamepad" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="food"
        options={{
          title: "FoodBuddy",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="spoon" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bot"
        options={{ headerShown: false,
          title: "Bot",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="comment" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarStyle: {display: 'none'},
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarStyle: {display: 'none'},
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bolt" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
