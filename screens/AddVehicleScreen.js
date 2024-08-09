import { View, TextInput, StyleSheet, Text ,TouchableOpacity, Image  } from 'react-native';
import React, { useState, useEffect } from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import { addVehicle } from '../ reducers/user';
import { useSelector } from 'react-redux';
import { url_backend } from '../configuration/config';
import { addPic } from '../ reducers/user';


const AddVehicleScreen = ({ navigation }) => {

  //REDIRECTION
const leavePage = () => {
  navigation.navigate('Welcome');
}

//USE SELECTOR
const user = useSelector((state) => state.user.value);
  
//STATE STYLE
const [identification, setIdentification] = useState("")
const [regexValidCar, setRegexValidCar] = useState(false)
const [regexValidImma, setRegexValidImma] = useState(false)

//STATE OF INPUT 
const [brand, setBrand] = useState('');
const [year, setYear] = useState('');
const [model, setModel] = useState('');
const [motorization, setMotorization] = useState('');

//STATE TOOLTIP
const [toolTip, setToolTip] = useState(false);

//USEEFFECT ADAPT STYLE
useEffect(() => {
  //REGEX 
  const regexCheckCarDocument = /\b[(A-H|J-N|P|R-Z|0-9)]{17}\b/gm
  const regexImmatriculation = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
  setRegexValidCar(regexCheckCarDocument.test(identification))
  setRegexValidImma(regexImmatriculation.test(identification))
}, [identification])

/* //STATE DISPLAY OR HIDE INPUT
const [color, setColor] = useState('white') */


//FETCH BACKEND
const handleSubmit = () => {
   const testToken = "arXJRx5Vb1uqgpam6W5Y6g15MWxno91B"
   console.log({token: testToken, licence_plate : regexValidImma ? identification : null, vin: regexValidCar ? identification : null, brand, infos:{purchase_Date: year}, model, motorization})
  fetch(`${url_backend}/vehicles/add`, {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({token: testToken, licence_plate : regexValidImma ? identification : null, vin: regexValidCar ? identification : null, brand, infos:{purchase_Date: year}, model, motorization})
  }).then(response => response.json())
  .then(data => {
    console.log(data)
    if(data.result){
      dispatch(addVehicle (data._id));
      navigation.navigate('Sign in') 
    } 
  })
};


return (

      <View style={styles.container}>

        <View style={styles.back}>
          <TouchableOpacity onPress={() => leavePage()} >
            <Text style={styles.leave} >Retour</Text> 
        </TouchableOpacity>
        </View>

        <View style={styles.title}>
        <Text style={styles.thetitle}>Ajouter un véhicule</Text>
        </View>

        <View style={styles.byplate}>
          <Text style={styles.searchbyplate}>Rechercher mon véhicule par plaque ou par carte grise</Text>
        </View>
        
          <View style={styles.add_plate}>

          {regexValidImma &&
            <View style={styles.view_theplate}>
           
            <Text style={styles.letter_plate}>F</Text>
            </View> }

            <View style={styles.view_input}>
              <TextInput style={styles.input} keyboardType="text" onChangeText={(e) => setIdentification(e)} value={identification}/>
            </View>

            {regexValidImma&&
            <View style={styles.view_theplate}>
            </View>
            }
          </View>
           
          {/* {regexValidCar &&
          <View style={styles.vin_registration}>
            <View style={styles.input_registration}>
              <TextInput style={styles} keyboardType="text" onChangeText={() => informationCar()}/>
            </View>
          </View>} */}

        <TouchableOpacity style={styles.btn}  >
        <Text style={styles.textbtn} >Ajouter mon véhicule</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Camera', {type: "vehicule"})}>
        <Text style={styles.textbtn} >Photo de mon véhicule</Text> 
        </TouchableOpacity>

        <View style={styles.toolTip}>
        <Tooltip
        isVisible={toolTip}
        content={
        <View style={styles.toolTipText}>
          <Text style={styles.chcohcocho}>Saisissez le code national d'identification du type qui apparaît sur le champ D.2.1 de la carte grise.</Text>
          </View>
          }
          placement="top" onClose={() => setToolTip(false)}>
           <TouchableOpacity onPress={() => setToolTip(true)} style={styles.toolHelp}>
              <Text>AIDE</Text>
            </TouchableOpacity>
            </Tooltip>
            </View>
            
         
          <View style={styles.form}>
            <Text style={styles.title2}>LES INFORMATIONS DE MON VEHICULE</Text>
          <TextInput style={styles.brand} placeholder="Marque" keyboardType="text" onChangeText={(value) => setBrand(value)} value={brand}/>
          <TextInput style={styles.year} placeholder="Année de mise en circulation" keyboardType="text" onChangeText={(value) => setYear(value)} value={year}/>
          <TextInput style={styles.model} placeholder="Modèle" keyboardType="text" onChangeText={(value) => setModel(value)} value={model}/>
          <TextInput style={styles.motorization} placeholder="Motorisation" keyboardType="text" onChangeText={(value) => setMotorization(value)} value={motorization}/>
        </View>

        <TouchableOpacity style={styles.buton} onPress={handleSubmit}>
        <Text style={styles.textbtn}>Ajouter une première dépense</Text>
        </TouchableOpacity>
      </View>
    )
} 
 export default AddVehicleScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      padding: 20,
    },
    thetitle: {
      color: '#000000',
      fontSize: '25',
    },
    search_vehicle: {
      padding: 20,
    },
    addsearch: {
      fontSize: '18',
      fontWeight: 'bold',
    },
    byplate: {
      padding: 20,
    },
    searchbyplate: {
      fontWeight: 'bold',
    },
    add_plate: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection : "row" , 
    },
    input: {
      borderWidth: 1,
      width: 300,
      textAlign: 'center',
      fontSize: 30,
    },
    view_theplate: {
      borderWidth: 1,
      width: 28,
      height: 38,
      backgroundColor: '#00008b',
    },
    letter_plate: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: '20',
      marginTop: 6,
    },
    searchbymodel: {
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center',
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
      fontSize: 12,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    },
    gray_card: {
      borderWidth: 1,
      borderColor: '#038737',
      fontSize: 25,
      width: 300,
      textAlign: 'center',
    },
    choice: {
      fontSize: '18',
      fontWeight: 'bold',
      padding: 30,
    },
    title2: {
      fontSize: '16',
      fontWeight: 'bold',
      padding: 40,
    },
    form: {
      padding: 10,
    },
    brand: {
      fontSize: 20,
      marginBottom: 70, 
      padding: 10,
      borderWidth: 1,
      borderColor: '#038737',
      marginBottom: 16,
    },
    year:{
      fontSize: 20,
      marginBottom: 70, 
      padding: 10,
      borderWidth: 1,
      borderColor: '#038737',
      marginBottom: 16,
    },
    model: {
      fontSize: 20,
      marginBottom: 70, 
      padding: 10,
      borderWidth: 1,
      borderColor: '#038737',
      marginBottom: 16,
    },
    motorization: {
      fontSize: 20,
      marginBottom: 70, 
      padding: 10,
      borderWidth: 1,
      borderColor: '#038737',
      marginBottom: 16,
    },
    buton: {
      elevation: 8,
      backgroundColor: "#038737",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 300,
    },
    image: {
      width: '100%',
      height: '70%',
    },
    toolTip: {
      flexDirection: 'row',

    },
    chcohcocho: {
      textAlign: 'center',
    }
  }) 