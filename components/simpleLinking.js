import { StyleSheet, Text, Linking, Pressable } from "react-native";
import { useState } from "react";

const Simplelinking = ({
  url,
  text,
  textAlert,
  style,
  txtStyle,
  txtHoverStyle,
  icon,
  iconPress,
  ...props
}) => {
  const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`${textAlert} ${url}`);
    }
  };

  const [pressed, setPressed] = useState(txtStyle);
  const [iconDisplay, seticonDisplay] = useState(icon);

  const handlePressIn = () => {
    setPressed(txtHoverStyle);
    icon && seticonDisplay(iconPress);
  };
  const handlePressOut = () => {
    setPressed(txtStyle);
    icon && seticonDisplay(icon);
  };

  const handlePress = () => {
    openUrl(url);
  };

  return (
    <Pressable style={style}>
      {icon && iconDisplay}
      <Text
        style={pressed}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Simplelinking;
