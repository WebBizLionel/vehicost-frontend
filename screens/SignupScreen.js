import { StyleSheet, Text, View , Image, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';


const SignupScreen = ({ navigation }) => {


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");

  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.baseText}>Bienvenue sur VehiCost</Text>
      </View>

      <View>
      <Image style={styles.image} source={require('../assets/favicon.png')} />
      </View>

      <View>
      <TextInput style={styles.input} placeholder="Username*" keyboardType="text" onChange= {(e) => setUsername(e.target.value)} value={username} type="text" id="username"/>
      <TextInput style={styles.input} placeholder="Email*" keyboardType="text" onChange= {(e) => setEmail(e.target.value)} value={email} type="text" id="email"/>
       <TextInput style={styles.input} placeholder="Mot de passe *" keyboardType="text" onChange= {(e) => setPassword(e.target.value)} value={password} id="password"/>
       <TextInput style={styles.input} placeholder="Telephone" keyboardType="numeric" onChange= {(e) => setMobile(e.target.value)} value={mobile} id="mobile"/>
       <TextInput style={styles.input} placeholder="Pays" keyboardType="text" onChange= {(e) => setCountry(e.target.value)} value={country} id="country"/>
      </View>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text style={styles.paragraph}>J'accepte les conditions générales de VéhiCost</Text>
      </View>

      <View>
      <TouchableOpacity onPress={() => navigation.navigate('Sign up') }>
        <Text>S'inscrire</Text>
      </TouchableOpacity>

      </View>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  baseText: {
    fontSize: 25,
  }, 
  input: {
    borderWidth: 1,
    fontSize: 20,
  }
})