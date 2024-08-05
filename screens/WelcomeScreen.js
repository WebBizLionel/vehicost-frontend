import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'; 


const WelcomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>WelcomeScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Sign up') }>
        <Text>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Sign in') }>
        <Text>Sign in</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})