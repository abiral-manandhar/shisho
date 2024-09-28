import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface FailureScreenProps {
  route: {
    params: {
      streak: number;
    };
  };
  navigation: {
    navigate: (screen: string) => void;
  };
}

const FailureScreen: React.FC<FailureScreenProps> = ({ route, navigation }) => {
  const streak = route.params?.streak || 0; // Get the streak from params

  const handleTryAgain = () => {
    navigation.navigate('Gayme'); // Navigate back to the game screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You Failed!</Text>
      <Text style={styles.streakText}>Your Streak: {streak}</Text>
      <TouchableOpacity style={styles.button} onPress={handleTryAgain}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  streakText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
  },
  button: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default FailureScreen;
