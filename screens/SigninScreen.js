import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { url_backend } from '../configuration/config';
import { addUsername } from '../ reducers/user';

const SigninScreen = ({ navigation }) => {

  const dispatch = useDispatch(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleSubmit = () => {
    console.log({username, password})
    fetch(`${url_backend}/users/signin`, {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password})
    }).then(response => response.json())
    .then(data => {
      !username ? setErrorUsername("L'email est requis") : setErrorUsername('');
      !password ? setErrorPassword('Le mot de passe est obligatoire') : password.length < 6 ? setErrorPassword('Mot de passe de plus de 6 caractere') : setErrorPassword('');
      if(data.result){
        dispatch(addUsername({username,token: data.token}
          
        ));
        navigation.navigate('Add Vehicle');
      } 
    })
  
  };

  function handleBack() {
    navigation.navigate('Welcome');
  }

  return (

    <View style={styles.container}>
      
      <View>
      <Text style={styles.baseText}>Bienvenue sur VehiCost</Text>
      </View>

   
      <View style={styles.backpage}>
      <TouchableOpacity onPress={() => handleBack()}>
        <Text style={styles.msgback}>Retour</Text>
      </TouchableOpacity>
      </View>

      <View>
      <Image style={styles.image} source={require('../assets/favicon.png')} />
      </View>

      <View>
      <TextInput style={styles.input} placeholder="Email ou Nom d’utilisateur *" keyboardType="text" onChangeText={(value) => setUsername(value)} value={username} type="text" id="username"/>
      <Text style={styles.error}>{errorUsername.length > 0 && errorUsername}</Text>
       <TextInput style={styles.input} placeholder="Mot de passe *" keyboardType="text" secureTextEntry = { true } onChangeText={(value) => setPassword(value)} value={password} type="text" id="password" />
       <Text style={styles.error}>{errorPassword.length > 0 && errorPassword}</Text>
      </View>

      <View>
      <TouchableOpacity>
        <Text>Se connecter avec Google</Text>
      </TouchableOpacity>
      </View>
       {/*   https://www.youtube.com/watch?v=T-zTZn_xRBM */}
     

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
  msgback: {
    textAlign: 'center',
  },
  backpage: {
    borderWidth: 1,
    width: 90,
    height: 20,
    marginTop: 10,
  },
  error: {
    color:'red',
    fontSize: 12,
  }
})