import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";
import { auth, store } from "@/hooks/useFirebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { vw, vh } from '@/constants/Window';
import { Colors } from '@/constants/Colors';
import TitledInputBox from '@/components/TitledInputBox';
import * as ScreenOrientation from "expo-screen-orientation";

const User = () => {
    
  const [userData, setUserData] = useState({
    weight: '',
    height: '',
    username: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDocRef = doc(store, "users", currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
          await setDoc(userDocRef, {
            email: currentUser.email,
            weight: 0,
            height: 0,
          });
          console.log('User document created:', currentUser.email);
        } else {
          const data = docSnap.data();
          setUserData({
            weight: data.weight.toString(),
            height: data.height.toString(),
            username: data.username.toString(),
            email: data.email.toString()
          });
          console.log('User document already exists:', data);
        }
      } else {
        console.error("No user is currently logged in.");
      }
    };

    fetchUser();
  }, [auth.currentUser?.email]);

  const handleChange = (name: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(store, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        weight: parseFloat(userData.weight),
        height: parseFloat(userData.height),
      });
      setIsEditing(false);
      console.log('User document updated:', userData);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.head}>
        <Text style={styles.head}>Username: {userData.username}</Text>
        <Text style={styles.head2}>Email Address: {userData.email}</Text>
      </View>
      {isEditing ? (
        <>
          <TitledInputBox
            title="Weight"
            placeholder="(kg)"
            value={userData.weight}
            onChangeText={(value) => handleChange('weight', value)}
          />
          <TitledInputBox
            title="Height"
            placeholder="(cm)"
            value={userData.height}
            onChangeText={(value) => handleChange('height', value)}
          />
        </>
      ) : (
        <View style={styles.form}>
          <View style={styles.outer}>
            <View style={styles.inner}>
              <Text style={styles.white}>Weight</Text>
            </View>
            <View style={styles.wrap}><View style={styles.inner2}>
              <Text style={styles.white}>{userData.weight}</Text>
            </View>
            <View style={styles.inner3}>
              <Text style={styles.white}>kg</Text>
            </View></View>
          </View>
          <View style={styles.outer}>
            <View style={styles.inner}>
              <Text style={styles.white}>Height</Text>
            </View>
            <View style={styles.wrap}><View style={styles.inner2}>
              <Text style={styles.white}>{userData.height}</Text>
            </View>
            <View style={styles.inner3}>
              <Text style={styles.white}>cm</Text>
            </View></View>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => setIsEditing(true)}>
            <Text style={styles.btnText}>EDIT</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.bg,
  },
  head: {
    marginTop: 50,
    padding: 0,
    fontFamily: 'NuintoEBold',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 30,
    width: 90 * vw,
  },
  head2: {
    padding: 0,
    margin: 0,
    fontFamily: 'NuintoEBold',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 15,
    width: 90 * vw,
  },
  btn: {
    width: 60 * vw,
    height: 7 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 100,
  },
  btnText: {
    padding: 0,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'NuintoEBold',
    fontSize: 16, 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 4 * vh
  },
  outer: {
    width: 90 * vw,
    backgroundColor: Colors.darkBackground,
    height: 7 * vh,
    marginTop: 1.1*vh,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 13,
    borderRadius: 15,
  },
  inner: {
    backgroundColor: Colors.bg,
    height: 5 * vh,
    width: 20 * vw,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  inner2: {
    backgroundColor: Colors.bg,
    height: 5 * vh,
    width: 20 * vw,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },  
  inner3: {
    backgroundColor: Colors.darkerBackground,
    height: 5 * vh,
    width: 10 * vw,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },   
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  white: {
    fontFamily: 'NuintoEBold',
    padding: 0,
    margin: 0,
    color: Colors.white,
  }
});

export default User;