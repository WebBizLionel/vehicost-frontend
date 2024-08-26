import React, { useEffect, useRef } from 'react';
import { View, Pressable, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';

const HamburgerMenu = (props) => {
  const navigation = useNavigation();
  const drawerStatus = useDrawerStatus();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(animatedValue, {
      toValue: drawerStatus === 'open' ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

  }, [drawerStatus]);

  const toggleMenu = () => {
    
    navigation.toggleDrawer();
  };

  

  const topLineStyle = {
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 9],
        }),
      },
    ],
  };

  const middleLineStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  };

  const bottomLineStyle = {
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-45deg'],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -9],
        }),
      },
    ],
  };

  return (
    <Pressable onPress={toggleMenu}>
      <View style={styles.menuIcon}>
        <Animated.View style={[styles.line, topLineStyle, {backgroundColor:props.bgColor}]} />
        <Animated.View style={[styles.line, middleLineStyle,{backgroundColor:props.bgColor}]} />
        <Animated.View style={[styles.line, bottomLineStyle,{backgroundColor:props.bgColor}]} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:16, 
  },
  line: {
    width: 24,
    height: 2.4,
    marginVertical: 2,
  },
});

export default HamburgerMenu;