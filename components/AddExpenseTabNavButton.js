import { StyleSheet, View, TouchableHighlight } from 'react-native';
import React from 'react';
import { gColor} from "../styles/variablesCSS";
import Add from "@material-design-icons/svg/outlined/add.svg";

//Create central button
const AddExpenseTabNavButton = ({ modalVisible, onPress, style }) => (
    <>
       <TouchableHighlight
          style={style}
          onPress={onPress}
          activeOpacity={1}
          underlayColor={gColor.darkAdditionalColor}
       >
          <View
             style={{
                transformOrigin: "center",
                transform: [{ rotate: modalVisible ? "45deg" : "0deg" }],
             }}
          >
             <Add fill={"#ffffff"} width={32} height={32} />
          </View>
       </TouchableHighlight>
    </>
 );

export default AddExpenseTabNavButton

const styles = StyleSheet.create({})