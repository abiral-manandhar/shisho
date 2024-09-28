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
  const [streakAnimation] = useState(new Animated.Value(1));
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [showWrongAnswer, setShowWrongAnswer] = useState<boolean>(false);
  const [finalStreak, setFinalStreak] = useState<number>(0);
  const [showFinalScore, setShowFinalScore] = useState<boolean>(false);

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
    
    if (showQuestion) {
      timeoutId = setTimeout(() => {
        setShowQuestion(false);
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [showQuestion]);

  const resetGame = () => {
    streak = 0;
    setShowGameOver(false);
    setShowWrongAnswer(false);
    setShowFinalScore(false);
    getCollections(); // Reload cards to reset the game
  };

  const handleCardClick = (index: number) => {
    const clickedCard = visibleCards[index];

    if (clickedCard.correct) {
      streak += 1;

      // Check if this is the last card
      if (currentIndex + 1 >= allCards.length) {
        setFinalStreak(streak);
        setShowFinalScore(true); // Show final score screen
      } else {
        animateStreak();
      }
    } else {
      setFinalStreak(streak);
      setShowWrongAnswer(true); // Show wrong answer screen
      return; // Exit to prevent further actions
    }

    setAnimatingIndex(index);

    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (clickedCard.correct && currentIndex + 1 < allCards.length) {
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

  const animateStreak = () => {
    Animated.sequence([
      Animated.timing(streakAnimation, {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(streakAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
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
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
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
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>{visibleCards[0].text}</Text>
              </View>
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
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>{visibleCards[1].text}</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </>
      )}

      <Animated.View style={{ transform: [{ scale: streakAnimation }] }}>
        <Text style={styles.bt}>Streak: {streak}</Text>
      </Animated.View>

      {/* Wrong Answer Page */}
      {showWrongAnswer && (
        <View style={styles.wrongAnswerContainer}>
          <Text style={styles.wrongAnswerText}>Wrong Answer!</Text>
          <Text style={styles.gameOverText}>Game Over</Text>
          <View style={styles.finalStreakCard}>
            <Text style={styles.finalStreakText}>
              Total Streak: {finalStreak}
            </Text>
          </View>
          <TouchableOpacity onPress={resetGame} style={styles.restartButton}>
            <Text style={styles.restartButtonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Final Score Page */}
      {showFinalScore && (
        <View style={styles.finalScoreContainer}>
          <Text style={styles.finalScoreText}>Congratulations!</Text>
          <Text style={styles.gameOverText}>Game Completed!</Text>
          <View style={styles.finalStreakCard}>
            <Text style={styles.finalStreakText}>
              Total Streak: {finalStreak}
            </Text>
          </View>
          <TouchableOpacity onPress={resetGame} style={styles.restartButton}>
            <Text style={styles.restartButtonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
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
  textContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    position: "absolute",
    bottom: 10,
    left: "25%",
    right: 0,
    alignItems: "center",
    alignSelf: "center",
  },
  cardText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  bt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  wrongAnswerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.9)", // Red background for wrong answer
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    padding: 20,
  },
  wrongAnswerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  finalScoreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 128, 0, 0.9)", // Green background for final score
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    padding: 20,
  },
  finalScoreText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  finalStreakCard: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  finalStreakText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  restartButton: {
    backgroundColor: "#5E92F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default Gayme;