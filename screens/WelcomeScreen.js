import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React from 'react'; 

const WelcomeScreen = ({ navigation }) => {

  return (
    
    <View style={styles.container}>
      {/* Title */}

      <View>
      <Text style={styles.baseText}>Bienvenue sur VehiCost</Text>
      </View>

      {/* Carrousel */}
      <View>
      <Image style={styles.image} source={require('../assets/favicon.png')} />
      </View>
      

      {/* Button section */}
      <View>
      <TouchableOpacity onPress={() => navigation.navigate('Sign up') }>
        <Text>INSCRIPTION</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Sign in') }>
        <Text>Se connecter</Text>
      </TouchableOpacity>

      </View>
  
  

    </View>
  )
}

export default WelcomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  baseText: {
    fontSize: 25,
  }, 


})

