import { StyleSheet, Text, View, TouchableOpacity, Image, Linking, Button} from 'react-native'
import React from 'react'; 

const WelcomeScreen = ({ navigation }) => {

    const message = "Bonjour le support !  ❤️ "

  const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
        await Linking.openURL(url);
    } else {
        Alert.alert(`Don't know how to open this url: ${url}`);
    }
}

  return (
    
    <View style={styles.container}>
      {/* Title */}

      <View>
      <Text style={styles.baseText}>Bienvenue sur VehiCost</Text>
      </View>

      {/* Carrousel */}
      <View>
      <Image style={styles.image} source={require('../assets/favicon.png')} />
      </View>
      
      

      {/* Button section */}
      <View>
      <TouchableOpacity onPress={() => navigation.navigate('Sign Up') }>
        <Text>INSCRIPTION</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Sign in') }>
        <Text>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Add Vehicle') }>
        <Text>Ajouter un véhicule</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Add Fuel Exprense') }>
        <Text>Ajouter une dépense [carburant]</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Add Insurance Expense') }>
        <Text>Ajouter une dépense [assurance]</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('Acceuil') }>
        <Text>Profil</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
                <Button title="Contacter le support" onPress={() => {
                    Linking.openURL(`mailto:support@vehicost.com?subject=Contacter le support VehiCost&body=${message}`)
                }} />
            </View>

      </View>


    </View>
  )
}

export default WelcomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  baseText: {
    fontSize: 25,
  }, 


})

