import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, TouchableHighlight, Input} from 'react-native';;
import React, { useState, useEffect, useRef } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';


const AddFuelExpenseScreen = ({ navigation }) => {

//STATE OF INPUT 
 const [liter, setLiter] = useState('');
 const [receipt, setReceipt] = useState('');
 const [price, setPrice] = useState('');
 const [location, setLocation] = useState('');
 const [comment, setComment] = useState('');

 
 //DATE 
 const [date, setDate] = useState(dayjs());



 const leavePage = () => {
    navigation.navigate('Welcome');
  }


 //IMPORT DOCUMENT :

_pickDocument = async () => {

    let result = await DocumentPicker.getDocumentAsync({});
    
    alert(result.assets[0]);
    
    console.log(result);
    
}

//FETCH BACKEND
const handleSubmit = () => {
    const testToken = "arXJRx5Vb1uqgpam6W5Y6g15MWxno91B"
    console.log({token: testToken, infos:{purchase_Date: year},})
   fetch(`${url_backend}/expenses/add`, {
     method: "POST", 
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify({token: testToken, expenses:{receipt}, expenses:{liters: liter}, expenses:{amount: price},  expenses:{place: location},  expenses:{note: comment}})
   }).then(response => response.json())
   .then(data => {
     console.log(data)
     if(data.result){
       navigation.navigate('Welcome') 
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

           {/* TITLE*/}
        <View style={styles.title}>
            <Text style={styles.thetitle} >Ajouter une dépense de carburant</Text>
        </View>



        {/* DROPDOWN BUTTON IF THE USER HAVE MORE THAN 1 VEHICLE*/}


          {/*  ADD PHOTO*/}
        <View style={styles.addreceipt}>
            <TouchableOpacity onPress={() => navigation.navigate('Camera', {type: "receipt", redirection:'Add Fuel Exprense'})}  >
                <Text style={styles.receipt} >Ajouter un reçu</Text>
            </TouchableOpacity>
        </View>


        {/*  UPLOAD*/}
           <View style={styles.addupload}>
            <TouchableOpacity onPress={this._pickDocument} >
                <Text style={styles.theupload} > Joindre un fichier</Text>
            </TouchableOpacity>
        </View> 

        <DateTimePicker
        locale='fr'
        mode="single"
        date={date}
        onChange={(params) => setDate(params.date)}
      />

        <View style={styles.addliter}>
            <TextInput style={styles.liter} placeholder="5L" keyboardType="numeric" onChangeText={(value) => setLiter(value)} value={liter}/>
        </View>        

          {/*  ADD PRICE*/}
        <View style={styles.addprice}>
            <TextInput style={styles.price} placeholder="50 €" keyboardType="numeric" onChangeText={(value) => setPrice(value)} value={price}/>
            <Text>Prix total et non unitaire</Text>   
        </View>

        {/*  ADD LOCATION*/}
        <View style={styles.addadress}>
            <TextInput style={styles.location} placeholder="50 €" keyboardType="numeric" onChangeText={(value) => setLocation(value)} value={location}/>
        </View>

        {/*  ADD COMMENT*/}
            <View style={styles.addcomment}>
                <TextInput style={styles.note} placeholder="50 €" keyboardType="numeric" onChangeText={(value) => setComment(value)} value={comment}/>
                    <Text>Prix total</Text>  
            </View>


        {/*  ADD COMMENT*/}
        <View style={styles.btnaddexpense}>
        <TouchableOpacity onPress={() => handleSubmit()}>
            <Text style={styles.addexpense}>Ajouter cette dépense</Text> 
        </TouchableOpacity>
        </View>

     </View>
  )
}

export default AddFuelExpenseScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  baseText: {
    fontSize: 25,
  }, 
  addpicture: {

  },
  thetitle: {
    fontSize: 25,
  },
  camera: {
    flex: 1,
    
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 25,
  },
  theupload: {
    fontSize: 25,
    color: 'black',
  }

})

