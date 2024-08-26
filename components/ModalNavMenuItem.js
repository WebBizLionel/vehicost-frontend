import { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React from 'react';
import { gColor, stepSize } from "../styles/variablesCSS";
import { global } from "../styles/style";

const ModalNavMenuItem = ({item, navigation}) => {
   
    const [Colors, setColors] = useState({
        fill: gColor.mainColor,
        color: gColor.textColor,
    });

    const IconItem = item.icon;

    return (
        <TouchableHighlight 
            style={{
                paddingHorizontal: 3 * stepSize,
                paddingVertical: 2 * stepSize,
            }}
                underlayColor={gColor.mainColor}
                onPress={() => navigation.navigate(item.navigate)}
                onPressIn={() => setColors({ fill: "#ffffff", color: "#ffffff" })}
                onPressOut={() =>
                setColors({ fill: gColor.mainColor, color: gColor.textColor })
            }
        >
            <View
            style={{
                ...global.flexDirectionRow,
                ...global.alignItemsCenter,
                ...{ gap: 12 },
            }}
            >
            {IconItem && <IconItem fill={Colors.fill} width={25} height={25} />}
            <Text
                style={{ ...global.defaultText, ...{ color: Colors.color } }}
            >
                {item.text}
            </Text>
            </View>
        </TouchableHighlight>
    )
}

export default ModalNavMenuItem

const styles = StyleSheet.create({})