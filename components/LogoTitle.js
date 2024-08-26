import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// Import logo
import Logo from '../assets/img/logo.svg';

const LogoTitle = ({tintColor, width, ...props}) => {

  return (
    <View style={styles.logocontainer}>
      <Logo fill={tintColor}  width={width}/>
    </View>
  )
}

export default LogoTitle

const styles = StyleSheet.create({
    logoContaier : {
        padding:2,
    }
})