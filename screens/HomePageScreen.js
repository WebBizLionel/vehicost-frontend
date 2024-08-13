import { StyleSheet, Text, View,  TouchableOpacity, Image} from 'react-native'
import React from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { url_backend } from '../configuration/config';
import { useState, useEffect} from 'react'; 
import { useSelector } from 'react-redux'; 
import moment from "moment"

export default function HomePageScreen({ navigation }) {

  const user = useSelector((state) => state.user.value);

  const [vehData, setvehData] = useState({id:null, name:null, expenses:null}); 
  const [totalCost, setTotalCost] = useState(0); 

  const leavePage = () => {
    navigation.navigate('Welcome');
  }

 //ROUTE GET VEHICULE
 useEffect(() => {  
  fetch(`${url_backend}/vehicles/get`, {
    headers: {Authorization: `Bearer ${user.token}`, "Content-Type": "application/json"},
  })  
    .then(response => response.json())  
     .then(data => {  
      if(data.result){
        setvehData({...vehData, id: data.vehicles[0]._id, name:data.vehicles[0].name, expenses:data.vehicles[0].expenses})
      }
     });

 }, []);

  //FETCH DEPENSE
  useEffect(()=>{
    const start = moment().utc().startOf("month").valueOf();
    const end = moment().utc().valueOf();


    const query = start && end ? `?start_date${start}&end_date${end}` : ''; 
    console.log(vehData.id)
    if(vehData.id){

      fetch(`${url_backend}/vehicles/expenses/get/${vehData.id}${query}`, {
        headers: {Authorization: `Bearer ${user.token}`, "Content-Type": "application/json"},
      })
      .then(response => response.json())
           .then(data => {    
      setTotalCost(data.vehicle[0].total_cost)
      
    }
  )}
  }, [vehData])

const expenSes = vehData.expenses; 
console.log(expenSes)
/* const expenses = expenSes.map(exp=>{
  return (
    <View>
      <Text>{exp.category}</Text>
      <Text>{exp.amount}</Text>
      <Text>{moment.utc(exp.createdAt).local().format("dd-mm-yyyy")}</Text> 
  
    </View>
  )
});  */

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
            <Text style={styles.text}>{vehData.name}</Text>
            <View style={styles.image}>
            <View style={styles.image_area}>
            <Image style={styles.vehicle_image} source={require('../assets/favicon.png')} />
              </View>
              </View>
            </View>
        </View>
        <View style={styles.expense}>
        <Text style={styles.text}>Vous avez dépensé {totalCost} euros ce mois-ci</Text>
        </View>
        <View style={styles.list_expense}>
        <Text style={styles.text}></Text>
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