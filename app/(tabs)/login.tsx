import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; 

import { vw, vh } from '@/constants/Window';
import { Colors } from '@/constants/Colors';
import Logo from '@/components/Logo';
import TitledInputBox from '@/components/TitledInputBox';
import DarkActButton from '@/components/DarkActButton';

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/hooks/useFirebase';
import { FirebaseError } from 'firebase/app';

export default function HomeScreen() {
  const router = useRouter();

  const [email, onchangeemail] = useState('');
  const [remember, onchangeremember] = useState<boolean>(false);
  const [pwd, onchangepwd] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');
  
  const rememberMe = (opt: boolean) => {
    onchangeremember(opt);
    // Add logic to handle remember me functionality (e.g., save email/password to AsyncStorage)
  };

  const loginAccount = async () => {
    setEmailError('');
    setPwdError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!pwd) {
      setPwdError('Password is required');
      return;
    }

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, pwd);
      console.log('Login successful');
      // Navigate to the main app screen after successful login
      router.push('/(tabs)/');
    } catch (e: any) {
      const err = e as FirebaseError;
      if (err.code === 'auth/wrong-password') {
        setPwdError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/user-not-found') {
        setEmailError('No user found with this email.');
      } else {
        alert('Login Failed: ' + err.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: Colors.darkBackground + 'FF', padding: 0}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={2}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'transparent'}} bounces={false}>
        <View style={styles.page}>
          <View style={styles.logo}>
            <Logo width={50 * vw} />
          </View>

          <View style={styles.outer}>
            <Text style={styles.head}>Login to Your Account</Text>
            <View style={styles.inner}>
              <Text style={styles.opt}>
                Don't have an account? <Text style={styles.opt2} onPress={() => router.push('/register')}>Register</Text>
              </Text>      

              <View style={styles.form}>
                <TitledInputBox
                  title="Email Address"
                  placeholder="eg. harilal@gmail.com"
                  value={email}
                  onChangeText={onchangeemail}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <TitledInputBox
                  title="Password"
                  placeholder="eg. iamsuperstrong@3121"
                  secureTextEntry={true}
                  value={pwd}
                  onChangeText={onchangepwd}
                />
                {pwdError ? <Text style={styles.errorText}>{pwdError}</Text> : null}
              </View>

              <View style={styles.remember}>
                <BouncyCheckbox
                  size={25}
                  fillColor={Colors.primary}
                  unFillColor="#FFFFFF"
                  text="Remember me"
                  style={{width: 40 * vw}}
                  iconStyle={{ borderColor: Colors.accent }}
                  innerIconStyle={{ borderWidth: 4, backgroundColor: Colors.accent }}
                  textStyle={{ fontFamily: 'Nuinto', color: Colors.white, textDecorationLine: 'none', padding: 0, marginLeft: -10 }}
                  onPress={(opt: boolean) => rememberMe(opt)}
                />
                {/* Uncomment the following line to allow users to reset their password */}
                {/* <Text style={styles.opt2} onPress={() => router.push('/forgot-password')}>Forgot Password?</Text> */}
              </View>
              <DarkActButton title="LOGIN" onPress={loginAccount} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bg,
  },
  logo: {
    height: 45 * vh,
    width: '100%',
    alignItems: 'center',
    margin: -7,
    padding: -13,
    justifyContent: 'center',
  },
  outer: {
    backgroundColor: Colors.darkBackground + 'FF',
    height: 57 * vh,
    width: '100%',
    borderTopLeftRadius: 15 * vw,
    borderTopRightRadius: 15 * vw,
    display: 'flex',
    alignItems: 'center',
  },
  head: {
    marginTop: 35,
    padding: 0,
    fontFamily: 'NuintoEBold',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 30,
    width: 90 * vw,
  },
  inner: {
    marginTop: 25,
    height: (55 - 5) * vh,
    width: '100%',
    borderTopLeftRadius: 15 * vw,
    borderTopRightRadius: 15 * vw,
    backgroundColor: Colors.accent + 'FF',
    display: 'flex',
    alignItems: 'center',
  },
  remember: {
    width: 90 * vw,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  opt: {  
    marginTop: 12,
    padding: 0,
    fontFamily: 'Nuinto',
    fontWeight: 'light',
    textAlign: 'center',
    color: Colors.white,
    width: 80 * vw,
  },
  opt2: {
    fontFamily: 'NuintoEBold',
    color: Colors.darkerBackground,
  },
  form: {
    marginTop: 25,
    display: 'flex',
    flexDirection: 'column',
  },
  errorText: {
    fontFamily: 'NuintoEBold',
    color: Colors.white,
    textDecorationLine: 'underline',
    padding: 0,
    margin: 0,
    width: 90 * vw,
    textAlign: 'center',
    marginTop: 6,
    fontSize: 12,
  },
});
