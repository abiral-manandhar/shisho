import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router'; 

import { vw, vh } from '@/constants/Window';
import { Colors } from '@/constants/Colors';
import Logo from '@/components/Logo';
import TitledInputBox from '@/components/TitledInputBox';
import DarkActButton from '@/components/DarkActButton';

import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function HomeScreen() {
  const router = useRouter();

  const [usrname, onchangeusrname] = useState('');
  const [remember, onchangeremember] = useState<boolean>();
  const [pwd, onchangepwd] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');

  
  const rememberMe = (opt: boolean) => {

  };

  const loginAccount = () => {
    console.log('Username:', usrname);
    console.log('Remember Me:', pwd);
    console.log('Account registration successful');
  };

  return (
    <KeyboardAvoidingView
    style={{ backgroundColor: 'transparent', padding: 0}}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'transparent'}} bounces={false}>
    <View style={styles.page}>
      <View style={styles.logo}>
        <Logo width={50 * vw} />
      </View>

      <View style={styles.outer}>
        <Text style={styles.head}>Register Your Account</Text>
        <View style={styles.inner}>
          <Text style={styles.opt}>
            Already have an acoount? <Text style={styles.opt2} onPress={() => router.push('/login')}>Login</Text>
          </Text>      

          <View style={styles.form}>
            <TitledInputBox
              title="Username"
              placeholder="eg. ramprasad"
              value={usrname}
              onChangeText={(buf: string) => {onchangeusrname(buf)}}
            />
            <TitledInputBox
              title="Password"
              placeholder="eg. 109537@StRoNG"
              secureTextEntry={true}
              value={pwd}
              onChangeText={(buf: string) => {onchangepwd(buf)}}
            />
            <TitledInputBox
              title="E-mail"
              placeholder="eg. ramprasadbhattari@gmail.com"
              secureTextEntry={true}
              value={pwd}
              onChangeText={(buf: string) => {onchangepwd(buf)}}
            />

          </View>
          <View style={styles.remember}>
            </View>
          <DarkActButton title="REGISTER" onPress={loginAccount} />
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
    margin: 0,
    padding: 0,
    justifyContent: 'center',
  },
  outer: {
    backgroundColor: Colors.darkBackground + 'FF',
    height: 60 * vh,
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
    height: (50 - 3) * vh,
    width: '100%',
    borderTopLeftRadius: 15 * vw,
    borderTopRightRadius: 15 * vw,
    backgroundColor: Colors.accent + 'FF',
    display: 'flex',
    alignItems: 'center',
  },
  bottom: {
    width: 100 * vw,
    height: 10 * vh,
    backgroundColor: Colors.bg,
    display: 'flex',
    borderTopLeftRadius: 15 * vw,
    borderTopRightRadius: 15 * vw,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  bottomimg: {
    paddingLeft: 80,
    width: 52,
    height: 52,
  },
  remember: {
    width: 90 * vw,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  opt: {  
    marginTop: 25,
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
    color: Colors.primary,
    padding: 0,
    margin: 0,
    width: 90*vw,
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 2
  },
});
