import { Stack } from "expo-router";

import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [loaded] = useFonts({
    Nuinto: require('../assets/fonts/Nunito.ttf'),
    NuintoItallic: require('../assets/fonts/NunitoItallic.ttf'),
    NuintoEBold: require('../assets/fonts/NunitoEBold.ttf'),
    NuintoIEBold: require('../assets/fonts/NuintoIEBold.ttf'),
  });

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
