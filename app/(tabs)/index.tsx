import { Link, Stack, useRouter } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";

function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "My home",
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Text>Home Screen</Text>
      <Link href={"/details"}>Go to Details</Link>
      <Text
        onPress={() => {
          router.replace("/details");
        }}
      >
        GO TO
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
