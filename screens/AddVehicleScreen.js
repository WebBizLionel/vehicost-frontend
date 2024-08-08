/* import { View, TextInput, StyleSheet, Text ,TouchableOpacity, Image  } from 'react-native';
import React, { useState } from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';

const AddVehicleScreen = ({ navigation }) => {
  
//STATE OF INPUT 
  const [plate, setPlate] = useState('');
  const [car_registration, setCar_Registration] = useState('');

  const [toolTip, setToolTip] = useState(false);

//STATE CHANGE STYLE 
/* 

const [color, setColor] = useState('white')
const carStyle = ['white', 'add_plate', 'vin_registration']

const renderButtons = carStyle => {
  return carStyle.map( (color, index) => {
    return ( <li key={index}
      className={'color-selector ' + color}
      onClick={() => setColor(color)}>
    </li> )
  })
} */


//FONCTIONS REGEX 
/* const validatePlate = (plate = null) => {

  if(!plate) {
  return;

} 
  const regexImmatriculation = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
  return regexImmatriculation.test(plate) 
}

const validateCarRegistration = (car_registration = null) => {

  if(!car_registration) {
  return;
  }
  
  const regexCheckCarDocument = \b[(A-H|J-N|P|R-Z|0-9)]{17}\b; 
  return regexCheckCarDocument.test(car_registration) && setColor(vin_registration)
  
}  */

//FONCTION ADAPTE STYLE 
/* 
const renderButtons = carStyle => {

  if (validatePlate){
    setColor(add_plate)
  }
  else if(validateCarRegistration){
    setColor(vin_registration)
  }
}  */

//FETCH LE BACK



//PHOTO DE PROFIL 

  /*   return (

      <View style={styles.container}>

        <View style={styles.back}>
          <Text style={styles.leave}>Retour</Text>
        </View>

        <View style={styles.title}>
        <Text style={styles.thetitle}>Ajouter un véhicule</Text>
        </View>

        <View style={styles.byplate}>
          <Text style={styles.searchbyplate}>Rechercher mon véhicule par plaque ou par carte grose</Text>
        </View>

          <View style={styles.add_plate}>
            <View style={styles.view_theplate}>
            <Text style={styles.letter_plate}>F</Text>
            </View>
            <View style={styles.view_input}>
            <TextInput style={styles.input} placeholder="AA-455-BB" keyboardType="text" onChangeText={(value) => setPlate(value)} value={plate}/>
            </View>
            <View style={styles.view_theplate}>
            </View>
          </View>

          <View style={styles.vin_registration}>
            <View style={styles.input_registration}>
              <TextInput style={styles.input} placeholder="AA-455-BB" keyboardType="text" onChangeText={(value) => setCar_Registration(value)} value={car_registration}/>
            </View>
          </View>
  

        <TouchableOpacity onPress={() => renderButtons()} style={styles.btn}  >
        <Text style={styles.textbtn} >Ajouter mon véhicule</Text>
        </TouchableOpacity>
        

        <View style={styles.toolTip}>
        <Tooltip
        isVisible={toolTip}
        content={
        <View style={styles.toolTipText}>
          <Text>Saisissez le code national d'identification du type qui apparaît sur le champ D.2.1 de la carte grise.</Text>
          <Image style={styles.image} source={require('../assets/vehicle_document.jpeg')} />
          </View>
          }
          placement="top" onClose={() => setToolTip(false)}>
           <TouchableOpacity onPress={() => setToolTip(true)}>
              <Text>AIDE</Text>
            </TouchableOpacity>
            </Tooltip>
            </View>

        <Text style={styles.title2}>LES INFORMATIONS DE MON VEHICULE</Text>

        <View style={styles.form}>
          <TextInput style={styles.addVin} placeholder="Marque" keyboardType="text"/>
          <TextInput style={styles.addVin} placeholder="Année de mise en circulation" keyboardType="text"/>
          <TextInput style={styles.addVin} placeholder="Modèle" keyboardType="text"/>
          <TextInput style={styles.addVin} placeholder="Motorisation" keyboardType="text"/>
        </View>

        <TouchableOpacity style={styles.buton}>
        <Text style={styles.textbtn}>Ajouter une première dépense</Text>
        </TouchableOpacity>
      </View>
    )
} 
 export default AddVehicleScreen */

  /* const styles = StyleSheet.create({
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
    addVin: {
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
  })  */