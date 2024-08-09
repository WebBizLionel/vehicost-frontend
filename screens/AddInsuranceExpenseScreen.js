import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'


export default function AddInsuranceExpenseScreen({navigation}) {
    const leavePage = () => {
        navigation.navigate('Welcome');
    }
  return (


    <View style={styles.container}>

    <View style={styles.back}>
    <TouchableOpacity onPress={() => leavePage()} >
      <Text style={styles.leave} >Retour</Text> 
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
    }
})


