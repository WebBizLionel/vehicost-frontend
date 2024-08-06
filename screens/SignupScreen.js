import { StyleSheet, Text, View , Image, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import React, { useState, useEffect  } from 'react';
import { useDispatch } from 'react-redux';

import Checkbox from 'expo-checkbox';
import { url_backend } from '../configuration/config';
import { addUsername } from '../ reducers/user';


const SignupScreen = ({ navigation }) => {

  //Dispatch : send actions to STORE 
  const dispatch = useDispatch(); 

//STATES OF INPUTS
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [isChecked, setChecked] = useState(false);

//STATE OF ERROR 
const [errorUsername, setErrorUsername] = useState("");
const [errorEmail, setErrorEmail] = useState("");
const [errorPassword, setErrorPassword] = useState("");

// @TODO refactor with await
const handleSubmit = () => {
  console.log({username, email, password})
  fetch(`${url_backend}/users/signup`, {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, email, password})
  }).then(response => response.json())
  .then(data => {
    !username ? setErrorUsername("Le nom d'utilisateur est requis") :  setErrorUsername('');
    !email ? setErrorEmail("L'email est requis") : setErrorEmail('');
    !password ? setErrorPassword('Le mot de passe est obligatoire') : password.length < 6 ? setErrorPassword('Mot de passe de plus de 6 caractere') : setErrorPassword('');
    if(data.result){
      dispatch(addUsername({username,token}));
      navigation.navigate('Sign in')
    } 
  })
};

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={styles.container}>   
      <View>
      <Text style={styles.baseText}>Bienvenue sur VehiCost</Text>
      </View>
      <View style={styles.field} >
      <TextInput style={styles.input} placeholder="Username*" keyboardType="text" onChangeText={(value) => setUsername(value)} value={username}  type="text" id="username"/>
        <Text style={styles.error}>{errorUsername.length > 0 && errorUsername}</Text>
      <TextInput style={styles.input} placeholder="Email*" keyboardType="text" onChangeText= {(value)=> setEmail(value)} value={email} type="text" id="email"/>
      <Text style={styles.error}>{errorEmail.length > 0 && errorEmail}</Text>
       <TextInput style={styles.input} placeholder="Mot de passe *" keyboardType="text" onChangeText=  {(value) => setPassword(value)} value={password} id="password"/>
       <Text style={styles.error}>{errorPassword.length > 0 && errorPassword}</Text>
       <TextInput style={styles.input} placeholder="Telephone" keyboardType="numeric" onChangeText= {(value) => setMobile(value)} value={mobile} id="mobile"/>
       <TextInput style={styles.input} placeholder="Pays" keyboardType="text" onChangeText= {(value)  => setCountry(value)} value={country} id="country"/>
      </View>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text style={styles.paragraph}>J'accepte les conditions générales de VéhiCost</Text>
      </View>

      <View>
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.textbtn}>S'inscrire</Text>
      </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40, 
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15, 
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 10,
    padding: 10,

  },
  baseText: {
    fontSize: 25,
    marginBottom: 70, 
  }, 
  input: {
    fontSize: 20,
    marginBottom: 15, 
    padding: 10,
    borderWidth: 1,
    borderColor: '#038737',
    margin: 12,

  },
  btn: {
    alignItems: 'center',
    paddingTop: 15,
    marginTop: 60,
    backgroundColor: '#038737',
    borderRadius: 5,
    padding: 10,
  },
  textbtn: {
    color: "#ffff",
    fontSize: 18,
  },
  error: {
    color:'red',
    fontSize: 12,
  }
})