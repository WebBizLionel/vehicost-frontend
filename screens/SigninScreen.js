import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { url_backend } from '../configuration/config';
import { addUsername } from '../ reducers/user';
import SimpleButton from '../components/simpleButton';


const SigninScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);


  const dispatch = useDispatch(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleSubmit = () => {
    fetch(`${url_backend}/users/signin`, {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password})
    }).then(response => response.json())
    .then(data => { 
      !username ? setErrorUsername("L'email est requis") : setErrorUsername('');
      !password ? setErrorPassword('Le mot de passe est obligatoire') : password.length < 6 ? setErrorPassword('Mot de passe de plus de 6 caractere') : setErrorPassword('');
      if(data.result){
        navigation.navigate('Ajouter un vehicule');
        dispatch(addUsername({username,token: data.token})); 
      }else{
        Alert.alert('', data.error, [
         
          {text: 'OK', onPress: () => {setPassword(''), setUsername(''), setErrorPassword(''), setErrorUsername('')}},
        ]);
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

      <View style={styles.inputs}>

        <View style={styles.inputemail}>
          <TextInput style={styles.input} placeholder="Email ou Nom d’utilisateur *" keyboardType="text" onChangeText={(value) => setUsername(value)} value={username} type="text" id="username"/>
          <Text style={styles.error}>{errorUsername.length > 0 && errorUsername}</Text>
        </View>
        <View style={styles.inputpasseword}>
          <TextInput style={styles.input} placeholder="Mot de passe *" keyboardType="text" secureTextEntry = { true } onChangeText={(value) => setPassword(value)} value={password} type="text" id="password" />
          <Text style={styles.error}>{errorPassword.length > 0 && errorPassword}</Text>
       </View>
      </View>

      <View>
      <SimpleButton textButton={'Se connecter'} callback={handleSubmit} />
     

      </View>


    </View>
  )
}

export default SigninScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:16,
  },
  baseText: {
    fontSize: 25,
    marginBottom: 30, 
  }, 
  inputs: {
    width: '100%',
  },
  inputemail: {
    fontSize: 20,
    marginBottom: 70, 
    padding: 10,
    borderWidth: 1,
    borderColor: '#038737',
    marginBottom: 16,
  },
  inputpasseword: {
    fontSize: 20,
    marginBottom: 70, 
    padding: 10,
    borderWidth: 1,
    borderColor: '#038737',
    marginBottom: 16,
  },
  error: {
    color:'red',
    fontSize: 12,
  },
  textbtn: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  signin: {
    marginTop: 30,
    elevation: 8,
    backgroundColor: "#038737",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 300,
  },
})