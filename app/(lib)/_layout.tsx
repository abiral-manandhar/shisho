import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="better"
        options={{
          title: "Better",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ninja"
        options={{
          title: "ninja",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="gamepad" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
