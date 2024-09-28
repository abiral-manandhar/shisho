// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
// import { collection, getDocs } from 'firebase/firestore';
// import { store } from '@/hooks/useFirebase';
// import * as ScreenOrientation from 'expo-screen-orientation';

// type GaymeProps = {};

// const Gayme: React.FC<GaymeProps> = () => {
//   const [visibleCards, setVisibleCards] = useState([]);
//   const [animation] = useState(new Animated.Value(0)); 
//   const [animatingIndex, setAnimatingIndex] = useState<number | null>(null); 

//   useEffect(() => {
//     const lockOrientation = async () => {
//       await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
//     };
//     lockOrientation();

//     // Fetch data from Firestore and set it as visible cards
//     const fetchCardsFromFirebase = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(store, 'bettergayme'));
//         const fetchedCards = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           fetchedCards.push({
//             id: 1, // You can dynamically set IDs if needed
//             question: data.question,
//             answers: data.answers,
//           });
//         });

//         // Assuming you want to display the first question's two answers
//         if (fetchedCards.length > 0) {
//           const firstQuestion = fetchedCards[0];
//           const firstTwoAnswers = Object.values(firstQuestion.answers).slice(0, 2);
//           setVisibleCards(firstTwoAnswers);
//         }
//       } catch (error) {
//         console.error('Error fetching collections:', error);
//       }
//     };

//     fetchCardsFromFirebase();

//     return () => {
//       ScreenOrientation.unlockAsync();
//     };
//   }, []);

//   const handleLeftCardClick = () => {
//     const newCard = getRandomCard();
//     setAnimatingIndex(0); // Set animating index for the left card

//     Animated.parallel([
//       Animated.timing(animation, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//       Animated.timing(animation, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       // Update cards after animation completes
//       setVisibleCards([visibleCards[1], newCard]); // Move the right card to the left and add the new card to the right
//       animation.setValue(0); // Reset animation value for next use
//       setAnimatingIndex(null); // Reset animating index after the animation completes
//     });
//   };
//  // Function to handle right card click
//  const handleRightCardClick = () => {
//   const newCard = getRandomCard(); // Get a new random card for the right side
//   setAnimatingIndex(1); // Set animating index for the right card

//   Animated.timing(animation, {
//     toValue: 1,
//     duration: 300,
//     useNativeDriver: true,
//   }).start(() => {
//     const updatedCards = [...visibleCards];
//     updatedCards[1] = newCard; // Replace the right card
//     setVisibleCards(updatedCards);
//     animation.setValue(0); // Reset animation value for next use
//     setAnimatingIndex(null); // Reset animating index after the animation completes
//   });
// };
//   return (
//     <View style={styles.container}>
//       {visibleCards.length > 0 && (
//         <>
//           <TouchableOpacity style={[styles.card, { backgroundColor: 'white' }]} onPress={handleLeftCardClick}>
//             <Animated.View style={[styles.cardContent, animatingIndex === 0 ? animatedStyle : {}]}>
//               <Image source={{ uri: visibleCards[0]?.img }} style={styles.image} resizeMode="cover" />
//             </Animated.View>
//           </TouchableOpacity>

//           <TouchableOpacity style={[styles.card, { backgroundColor: 'white' }]} onPress={handleRightCardClick}>
//             <Animated.View style={[styles.cardContent, animatingIndex === 1 ? animatedStyleRight : {}]}>
//               <Image source={{ uri: visibleCards[1]?.img }} style={styles.image} resizeMode="cover" />
//             </Animated.View>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'black',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     flex: 1,
//     margin: 5,
//     overflow: 'hidden',
//   },
//   cardContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default Gayme;
