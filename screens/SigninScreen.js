import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { url_backend } from '../configuration/config';
import { addUsername } from '../ reducers/user';

const SigninScreen = ({ navigation }) => {

  const dispatch = useDispatch(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = () => {
    console.log({username, password})
    fetch(`${url_backend}/users/signin`, {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password})
    }).then(response => response.json())
    .then(data => {
      if(data.result){
        dispatch(addUsername({username,token: data.token}));
        navigation.navigate('Welcome');
      } 
    })
  
  };

  return (

    <View style={styles.container}>
      
      <View>
      <Text style={styles.baseText}>Bienvenue sur VehiCost</Text>
      </View>

      <View>
      <Image style={styles.image} source={require('../assets/favicon.png')} />
      </View>

      <View>
      <TextInput style={styles.input} placeholder="Email ou Nom d’utilisateur *" keyboardType="text" onChangeText={(value) => setUsername(value)} value={username} type="text" id="username"/>
       <TextInput style={styles.input} placeholder="Mot de passe *" keyboardType="text" secureTextEntry = { true } onChangeText={(value) => setPassword(value)} value={password} type="text" id="password" />
      </View>

      <View>
      <TouchableOpacity onPress={() => handleSubmit()}>
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