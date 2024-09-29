import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFonts } from "expo-font";

export default function RootLayout() {
  const [loaded] = useFonts({
    Nuinto: require("../assets/fonts/Nunito.ttf"),
    NuintoItallic: require("../assets/fonts/NunitoItallic.ttf"),
    NuintoEBold: require("../assets/fonts/NunitoEBold.ttf"),
    NuintoIEBold: require("../assets/fonts/NuintoIEBold.ttf"),
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(lib)" options={{ headerShown: false }} />
      <Stack.Screen name="(signups)" options={{ headerShown: false }} />
    </Stack>
  );
}
