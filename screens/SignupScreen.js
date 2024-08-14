import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Pressable,Dimensions, TouchableHighlight } from 'react-native';
import Modal from "react-native-modal";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Checkbox from 'expo-checkbox';
import { url_backend } from '../configuration/config';
import { addUsername } from '../ reducers/user';
import PhoneInput from 'react-native-international-phone-number';
import { getLocales } from 'expo-localization';
import DropdownCountriesButton from '../components/dropdownCountriesButton';


const SignupScreen = ({ navigation, ...props}) => {

//Dispatch : send actions to STORE 
const dispatch = useDispatch(); 

//STATES OF INPUTS
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isChecked, setChecked] = useState(false);
const [isCheckedNewsletter, setCheckedNewsletter] = useState(false);

const [country, setCountry] = useState("");

const selectCountry = (country) => {
  setCountry(country);
};


const [selectedCountry, setSelectedCountry] = useState(null);

const [phone, setPhone] = useState("");
const [deviceLanguage, setDeviceLanguage] = useState(getLocales()[0].languageCode);
/* console.log(deviceLanguage) */


//STATE OF ERROR 
const [errorUsername, setErrorUsername] = useState("");
const [errorEmail, setErrorEmail] = useState("");
const [errorPassword,setErrorPassword] = useState("");
const [errorIsChecked,setErrorIsChecked] = useState(false);

//MODAL 
const [isModalVisible, setModalVisible] = useState(true)

const toggleModal = () => {
  setModalVisible(!isModalVisible)
}

const condition = "Lorem ipsum dolor sit amet. Sed repudiandae omnis aut voluptate voluptatem ut totam iure ab animi dolore. Qui architecto quisquam qui ducimus iste sed totam expedita quo culpa voluptatem quo aperiam numquam qui asperiores porro est aperiam minima. Et magnam ipsa et quia repellendus eum mollitia laboriosam et optio tempora ut vero natus ut fuga velit est dolor rerum. Ut neque consequatur ut eius eius ut consequatur obcaecati."
// @TODO refactor with await

const handleSubmit = () => {
  console.log({username, email, password, phone, country, accept_rgpd: isChecked, preferences:{language: 'fr'}})
  fetch(`${url_backend}/users/signup`, {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, email, password, phone, country, accept_rgpd: isChecked, preferences:{language: deviceLanguage}})
  }).then(response => response.json())
  .then(data => {
    !username ? setErrorUsername("Le nom d'utilisateur est requis") :  setErrorUsername('');
    !email ? setErrorEmail("L'email est requis") : setErrorEmail('');
    !password ? setErrorPassword('Le mot de passe est obligatoire') : password.length < 6 ? setErrorPassword('Mot de passe de plus de 6 caractere') : setErrorPassword('');
    !isChecked ? setErrorIsChecked("Vous n'avez pas accepté les conditions générales de Véhicost") : setErrorIsChecked('');
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

const vehicostText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={styles.container}>

        <View style={styles.backpage}>
          <TouchableOpacity onPress={() => handleBack()}>
          <Text style={styles.msgback}>Retour</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.backpage}>
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

        <DropdownCountriesButton country={country} selectCountry={selectCountry} setCountry={setCountry}/>

      <View style={styles.acceptcondition} >
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
      <Modal style={styles.bottomModalView} isVisible={isModalVisible} backdropOpacity={0} onBackdropPress={toggleModal}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>{condition}</Text>
          
        </View>
      </Modal>
      <TouchableHighlight style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>J'accepte les conditions générales de VéhiCost </Text>
      </TouchableHighlight>
      </View>
 

      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isCheckedNewsletter} onValueChange={setCheckedNewsletter} />
        <Text style={styles.paragraph}>Je souhaite m'abonner à la newsletter de Véhicost</Text>
        </View>
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
    marginTop: 10, 
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
  },
  acceptcondition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'flex-start'

  }, 
  button: {
    borderRadius: 20,
    padding: 1,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textCondition: {
    fontWeight: 'bold',
  },
  bottomModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  button: {
    borderStyle: 'solid',
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold"
  },
  modal: {
    width: "100%",
    height: "30%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: 'solid',
    backgroundColor: "white"
  },
  modalText: {
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
  }
})