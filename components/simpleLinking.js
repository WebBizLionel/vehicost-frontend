import { StyleSheet, Text, Linking, Pressable} from 'react-native';
import { useState } from 'react';

const  Simplelinking = ({url,text,textAlert,style,hoverStyle, ...props}) => {

    const openUrl = async (url) => {
      const isSupported = await Linking.canOpenURL(url);
      if (isSupported) {
          await Linking.openURL(url);
      } else {
          Alert.alert(`${textAlert} ${url}`);
      }
  }

  
  const [pressed, setPressed] = useState(style);

  const handlePressIn = () => setPressed(hoverStyle);
  const handlePressOut = () => setPressed(style);

  const handlePress = () => {
    openUrl(url)
  }

    return (
        <Pressable >
            
            <Text style={pressed} onPress={handlePress} onPressIn={handlePressIn}onPressOut={handlePressOut}>{text}</Text>
           
        </Pressable>
    );
}

export default Simplelinking

