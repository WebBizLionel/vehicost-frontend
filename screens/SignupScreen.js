import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Checkbox from 'expo-checkbox';
import { url_backend } from '../configuration/config';
import { addUsername } from '../ reducers/user';
import PhoneInput from 'react-native-international-phone-number';
import { getLocales } from 'expo-localization';


const SignupScreen = ({ navigation }) => {

//Dispatch : send actions to STORE 
const dispatch = useDispatch(); 

//STATES OF INPUTS
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [country, setCountry] = useState("");
const [isChecked, setChecked] = useState(false);
const [selectedCountry, setSelectedCountry] = useState(null);
const [phone, setPhone] = useState("");
const [deviceLanguage, setDeviceLanguage] = useState(getLocales()[0].languageCode);
console.log(deviceLanguage)

//STATE OF ERROR 
const [errorUsername, setErrorUsername] = useState("");
const [errorEmail, setErrorEmail] = useState("");
const [errorPassword,setErrorPassword] = useState("");

// @TODO refactor with await
const handleSubmit = () => {

  fetch(`${url_backend}/users/signup`, {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, email, password, phone, country, accept_rgpd: isChecked, preferences:{language: 'fr'}})
  }).then(response => response.json())
  .then(data => {
    !username ? setErrorUsername("Le nom d'utilisateur est requis") :  setErrorUsername('');
    !email ? setErrorEmail("L'email est requis") : setErrorEmail('');
    !password ? setErrorPassword('Le mot de passe est obligatoire') : password.length < 6 ? setErrorPassword('Mot de passe de plus de 6 caractere') : setErrorPassword('');
    if(data.result){
      dispatch(addUsername({username, token: data.token}));
      navigation.navigate('Sign in')
    } 
  })
};

function handlephoneNumber(phone) {
  setPhone(phone);
}

function handleSelectedCountry(country) {
  setSelectedCountry(country);
}

function handleBack() {
  navigation.navigate('Welcome');
}

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={styles.container}>
      <View style={styles.container}>
      <View style={styles.backpage}>
        
      <TouchableOpacity onPress={() => handleBack()}>
        <Text style={styles.msgback}>Retour</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.baseText}>Bienvenue sur VehiCost</Text>
      </View>
      <View style={styles.field} >
      <TextInput style={styles.input} placeholder="Nom d'utilisateur *" keyboardType="text" onChangeText={(value) => setUsername(value)} value={username}  type="text" id="username"/>
        <Text style={styles.error}>{errorUsername.length > 0 && errorUsername}</Text>
      <TextInput style={styles.input} placeholder="Email *" keyboardType="text" onChangeText= {(value)=> setEmail(value)} value={email} type="text" id="email"/>
      <Text style={styles.error}>{errorEmail.length > 0 && errorEmail}</Text>
       <TextInput style={styles.input} placeholder="Mot de passe *" keyboardType="text" secureTextEntry = { true }  onChangeText=  {(value) => setPassword(value)} value={password} id="password"/>
       <Text style={styles.error}>{errorPassword.length > 0 && errorPassword}</Text>
       
       <PhoneInput onChangeText={(value) => setPhone(value) }  
       value={phone}
        onChangePhoneNumber={handlephoneNumber}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
        language='fr'
        defaultCountry='fr'
        showOnly={['FR', 'ES']}
        modalDisabled
        placeholder='Téléphone'
        customCarret={'<></>'}/>

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
    paddingHorizontal:16,
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
    margin: 8,
    padding: 8,

  },
  baseText: {
    fontSize: 25,
    marginBottom: 30, 
  }, 
  input: {
    fontSize: 20,
    marginBottom: 70, 
    padding: 10,
    borderWidth: 1,
    borderColor: '#038737',
    marginBottom: 16,

  },
  btn: {
    marginTop: 30,
    elevation: 8,
    backgroundColor: "#038737",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 300,
  },
  textbtn: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  error: {
    color:'red',
    fontSize: 12,
  }
})