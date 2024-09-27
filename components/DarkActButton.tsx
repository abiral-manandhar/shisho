import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { vw, vh } from '@/constants/Window';
import { Colors } from '@/constants/Colors';

interface DarkActButtonProps {
  title: string;
  onPress: () => void;
}

const DarkActButton: React.FC<DarkActButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 60 * vw,
    height: 7 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bg,
    borderRadius: 100,
  },
  btnText: {
    padding: 0,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'NuintoEBold',
    fontSize: 16, 
  },
});

export default DarkActButton;
