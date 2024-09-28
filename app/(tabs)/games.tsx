import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { store } from "@/hooks/useFirebase";
import * as ScreenOrientation from "expo-screen-orientation";
let streak = 0;
type GaymeProps = {};

const Gayme: React.FC<GaymeProps> = () => {
  const [visibleCards, setVisibleCards] = useState<any[]>([]);
  const [allCards, setAllCards] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animation] = useState(new Animated.Value(0));
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [fadeOutAnimation] = useState(new Animated.Value(1));

  const getCollections = async () => {
    try {
      const querySnapshot = await getDocs(collection(store, "bettergayme"));
      const cardsData: any[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const answers = Object.values(data.answers);

        answers.forEach((answer: any) => {
          cardsData.push({
            text: answer.text,
            img: answer.img,
            correct: answer.correct,
            question: data.question,
          });
        });
      });

      setAllCards(cardsData);
      if (cardsData.length >= 2) {
        setVisibleCards([cardsData[0], cardsData[1]]);
        setCurrentIndex(2);
        setCurrentQuestion(cardsData[0].question || "");
        setShowQuestion(true);
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  useEffect(() => {
    getCollections();

    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    let timeoutId;

    if (showQuestion) {
      timeoutId = setTimeout(() => {
        setShowQuestion(false);
      }, 5000); // Hide question after 5 seconds
    }

    return () => clearTimeout(timeoutId);
  }, [showQuestion]);

  const handleCardClick = (index: number) => {
    const clickedCard = visibleCards[index];

    // Check if the clicked card is correct
    if (clickedCard.correct) {
      streak = streak + 1;
      console.log("Correct!");
      console.log(streak);
    } else {
      console.log("Wrong!");
    }

    setAnimatingIndex(index);

    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (currentIndex + 1 < allCards.length) {
        const newCards = [allCards[currentIndex], allCards[currentIndex + 1]];
        setVisibleCards(newCards);
        setCurrentIndex(currentIndex + 2);
        setCurrentQuestion(allCards[currentIndex].question || "");
        setShowQuestion(true);
      }
      animation.setValue(0);
      setAnimatingIndex(null);
    });
  };

  const animatedStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
        }),
      },
    ],
  };

  const animatedStyleRight = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1],
    }),
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {showQuestion && (
        <Animated.View style={[styles.questionContainer, fadeOutAnimation]}>
          <Text style={styles.questionText}>{currentQuestion}</Text>
        </Animated.View>
      )}

      {visibleCards.length > 0 && (
        <>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardClick(0)}
          >
            <Animated.View
              style={[
                styles.cardContent,
                animatingIndex === 0 ? animatedStyle : {},
              ]}
            >
              <Image
                source={{ uri: visibleCards[0].img }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.text}>{visibleCards[0].text}</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardClick(1)}
          >
            <Animated.View
              style={[
                styles.cardContent,
                animatingIndex === 1 ? animatedStyleRight : {},
              ]}
            >
              <Image
                source={{ uri: visibleCards[1].img }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.text}>{visibleCards[1].text}</Text>
            </Animated.View>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.bt}>Streak: {streak}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 1,
    margin: 5,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "140%",
  },
  text: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    top: -200,
    zIndex: 20,
    textAlign: "center",
  },
  questionContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 30,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  bt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    right: 20,
  },
});

export default Gayme;
