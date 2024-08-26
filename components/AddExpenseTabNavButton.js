import { StyleSheet, View, TouchableHighlight, Animated,Easing } from 'react-native';
import React,{useEffect, useRef} from 'react';
import { gColor} from "../styles/variablesCSS";
import Add from "@material-design-icons/svg/outlined/add.svg";

//Create central button
const AddExpenseTabNavButton = ({ modalVisible, onPress, style }) => {
   
   const animatedValue = useRef(new Animated.Value(0)).current;

   useEffect(() => {

      Animated.timing(animatedValue, {
        toValue: modalVisible ? 1 : 0,
        duration: 400,
        easing: Easing.bezier(0.25, 1, 0.5, 1), 
        useNativeDriver: true,
      }).start();
  
    }, [modalVisible]);

    const rotateCross = {
      transform: [
        {
          rotate: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-45deg'],
          }),
        },
      ],
    };

   return (
       <TouchableHighlight
          style={style}
          onPress={onPress}
          activeOpacity={1}
          underlayColor={gColor.darkAdditionalColor}
       >
          <Animated.View
             style={rotateCross}
          >
             <Add fill={"#ffffff"} width={32} height={32} />
          </Animated.View>
       </TouchableHighlight>
   );
}

export default AddExpenseTabNavButton

const styles = StyleSheet.create({})