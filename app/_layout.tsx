import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [loaded] = useFonts({
    Nuinto: require('../assets/fonts/Nunito.ttf'),
    NuintoItallic: require('../assets/fonts/NunitoItallic.ttf'),
    NuintoEBold: require('../assets/fonts/NunitoEBold.ttf'),
    NuintoIEBold: require('../assets/fonts/NuintoIEBold.ttf'),
  });

  
  return (
<<<<<<< HEAD
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(lib)" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
=======
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
>>>>>>> ac8f3551aa16c27d525a771906d877d5f173aa1e
  );
}
