import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'

const SigninScreen = ({ navigation }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      
      <View>
      <Text style={styles.baseText}>Bienvenue sur VehiCost</Text>
      </View>

      <View>
      <Image style={styles.image} source={require('../assets/favicon.png')} />
      </View>

      <View>
      <TextInput style={styles.input} placeholder="Email ou Nom d’utilisateur *" keyboardType="text" onChange= {(e) => setUsername(e.target.value)} value={username} type="text" id="username"/>
       <TextInput style={styles.input} placeholder="Mot de passe *" keyboardType="text" onChange= {(e) => setPassword(e.target.value)} value={password} />
      </View>

      <View>
      <TouchableOpacity onPress={() => navigation.navigate('Sign up') }>
        <Text>Se connecter</Text>
      </TouchableOpacity>

      </View>
    </View>
  )
}

export default SigninScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },



})