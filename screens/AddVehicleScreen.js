import { View, TextInput, StyleSheet, Text ,TouchableOpacity  } from 'react-native';
import React, { useState } from 'react';

const AddVehicleScreen = ({ navigation }) => {

  const [plate, setPlate] = useState('');

  
    
    return (
      <View style={styles.container}>
        <View style={styles.title}>
        <Text style={styles.thetitle}>Ajouter un véhicule</Text>
        </View>
        <View style={styles.search_vehicle}>
        <Text style={styles.addsearch}>Rechercher mon véhicule</Text>
        </View>
        <View style={styles.byplate}>
        <Text style={styles.searchbyplate}>PAR PLAQUE</Text>
        </View>
        <View style={styles.add_plate}>
            <View style={styles.view_theplate}>
            <Text style={styles.letter_plate}  >F</Text>
          </View>
        <View style={styles.view_input}>
          <TextInput style={styles.input} placeholder="AA-455-BB" keyboardType="text" onChangeText={(value) => setPlate(value)} value={plate} />
        </View>
        <View style={styles.view_theplate}>
          </View>
        </View>
        <TouchableOpacity style={styles.btn}>
        <Text style={styles.textbtn}>Ajouter mon véhicule</Text>
        </TouchableOpacity>
        <Text style={styles.searchbymodel}>OU</Text>

        <View style={styles.formgray_card}>
        <Text style={styles.searchbymodel}>PAR CARTE GRISE (VIN)</Text>
        <TextInput style={styles.gray_card} placeholder="VF7 SBHMZ0 EW55482" keyboardType="text"/>
        </View>

        <Text>INFORMATIONS DE MON VEHICULE</Text>

        <View style={styles.form}>
          <TextInput style={styles.addVin} placeholder="Marque" keyboardType="text"/>
          <TextInput style={styles.addVin} placeholder="Année de mise en circulation" keyboardType="text"/>
          <TextInput style={styles.addVin} placeholder="Modèle" keyboardType="text"/>
          <TextInput style={styles.addVin} placeholder="Motorisation" keyboardType="text"/>
        </View>
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
      padding: 20,
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
    form: {
      
    }
  })