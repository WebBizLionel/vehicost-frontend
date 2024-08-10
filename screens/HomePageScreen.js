import { StyleSheet, Text, View,  TouchableOpacity, Image} from 'react-native'
import React from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HomePageScreen({ navigation }) {

  const leavePage = () => {
    navigation.navigate('Welcome');
  }

   {/*  ROUTE GET :
    - RÉCUPERER LES DONNÉES DU VEHICULE
    - RECUPÉRER LE TOTAL DES DEPENSES
    - AFFICHER LA LISTE DES DEPENSE
    
    */}


  return (
    <View style={styles.container}>

      <View>
        <TouchableOpacity onPress={() => leavePage()} style={{ cursor: "pointer" }}>
          <FontAwesome name="arrow-left" size={40} color="rgba(220, 86, 78, 1)" />
        </TouchableOpacity>
      </View>

       {/*  INFORMATION SUR LA VOITURE*/}

      <View style={styles.element}>
        <View style={styles.litlecontainer}> 
            <View style={styles.information}>
            <Text style={styles.text}>Marque du véhicule</Text>
            <Text style={styles.text}>Plaque ou VIN</Text>
            <View style={styles.image}>
            <View style={styles.image_area}>
            <Image style={styles.vehicle_image} source={require('../assets/favicon.png')} />
              </View>
              </View>
            </View>
        </View>
        <View style={styles.expense}>
        <Text style={styles.text}>Vous avez dépensé X euros ce mois-ci</Text>
        </View>
        <View style={styles.list_expense}>
        <Text style={styles.text}>Voici la liste de toutes vos dépenses</Text>
        </View>
      </View>

      {/*  AJOUTER UNE DEPENSE*/}
      <View>
        <TouchableOpacity style={{ cursor: "pointer" }}>
          <FontAwesome name="plus" size={40} color="rgba(220, 86, 78, 1)" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
    element: {
      width: '100%',
      height: 400,
      backgroundColor: 'red'
    },
    litlecontainer: {
      backgroundColor: '#fffaf0',
      height: 200,
      borderRadius: 10,
      flexDirection: 'row',

    },
    image_area: {
      flex: 1,
    },
 
    
})