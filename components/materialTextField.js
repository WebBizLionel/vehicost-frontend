import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Animated } from "react-native";

const MaterialTextField = ({ label, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animatedIsFocused] = useState(new Animated.Value(value ? 1 : 0));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.timing(animatedIsFocused, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: "absolute",
    left: 0,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#6200ee"],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        value={value}
        underlineColorAndroid="transparent"
      />
      <View style={[styles.underline, isFocused && styles.underlineFocused]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    marginVertical: 12,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  inputFocused: {
    borderBottomColor: "#6200ee",
  },
  underline: {
    height: 2,
    backgroundColor: "transparent",
  },
  underlineFocused: {
    backgroundColor: "#6200ee",
  },
});

export default MaterialTextField;
