import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView,Platform, Alert} from 'react-native';;
import React, { useState, useEffect, useRef } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { url_backend } from '../configuration/config';
import { useSelector } from 'react-redux';
import Dropdown from 'react-native-input-select';


const AddFuelExpenseScreen = ({ navigation }) => {

  const user = useSelector((state) => state.user.value);


//STATE OF INPUT 
 const [liter, setLiter] = useState('');
 const [receipt, setReceipt] = useState('');
 const [price, setPrice] = useState('');
 const [location, setLocation] = useState('');
 const [comment, setComment] = useState('');


 //DATE 
 const [date, setDate] = useState(new Date());
 const [inputDate, setInputDate] = useState(moment().local().format("DD-MM-YYYY"))
 const [show, setShow] = useState(false);
 const [mode, setMode] = useState('date');


const [thevehicle, setTheVehicle] = useState([]);
const [selectedVehicle, setSelectedVehicle] = useState("")
/* console.log("selectedVehicle =>", selectedVehicle); */



 const handleDate = (e, selectedDate) => {
    setDate(selectedDate);
    setInputDate(moment(selectedDate).local().format("DD-MM-YYYY"))
    setShow(false);
 };

 const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
 }

 const leavePage = () => {
    navigation.navigate('Welcome');
  }

 //IMPORT DOCUMENT :

_pickDocument = async () => {

    let result = await DocumentPicker.getDocumentAsync({});
    
    alert(result.assets[0]);
    
    // console.log(result);
    
}

const photoUri =  user.pic[0];
const formData = new FormData();

if(photoUri) {
  // console.log({coucou: photoUri});

  formData.append('fileUpload', {
    uri:photoUri, 
    name:'receiptPhoto', 
    type:'image/jpeg',
  }); 
}

const category = "carburant"; 
const expenses = { liter, price, location, comment, category }

formData.append('vehicle_id',selectedVehicle);
formData.append('liter', liter);
formData.append('amount', price);
formData.append('location', location);
formData.append('comment', comment);
formData.append('category', category);

//FETCH BACKEND
const handleSubmit = () => {
fetch(`${url_backend}/vehicles/expenses/add`,{
    method: "POST",
    headers: {Authorization: `Bearer ${user.token}`, "Content-Type": "application/json"},
    body: formData,
  }).then(res => res.json())
    .then(data => {
      if(data.result){
       Alert.alert("Succès", "Dépense ajoutée avec succès !") 
      }else {
        Alert.alert("Erreur", data.error)        
      }
    }) 
 };

 //FETCH VEHICLE 
  useEffect(() => {  
    fetch(`${url_backend}/vehicles/get`, {
      headers: {Authorization: `Bearer ${user.token}`, "Content-Type": "application/json"},
    })  
      .then(response => response.json())  
       .then(data => {  
          setTheVehicle(data.vehicles);  
       });  
   }, []); 
 

  return (
    
    <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>

  <ScrollView style={styles.scrollView}>
          <TouchableOpacity onPress={() => leavePage()} >
            <Text style={styles.leave} >Retour</Text> 
        </TouchableOpacity>
        

           {/* TITLE*/}
        <View style={styles.title}>
            <Text style={styles.thetitle} >Ajouter une dépense de carburant</Text>
        </View>


               {/*  -----------------ADD PHOTO-------------------------------*/}
               <View style={styles.addreceipt}>
            <TouchableOpacity onPress={() => navigation.navigate('Camera', {type: "receipt", redirection:'Add Fuel Exprense'})}  >
                <Text style={styles.receipt} >Ajouter un reçu</Text>
            </TouchableOpacity>
        </View>

        

        <Dropdown
      label="Vehicle"
      placeholder="Choisir le vehicule"
      options={thevehicle?.map((e) => {return {label: e.name, value: e._id}})}
      selectedValue={selectedVehicle}
      onValueChange={(value) => setSelectedVehicle(value)}
      primaryColor={'green'}/>

                {/*  -----------------UPLOAD -------------------------------*/}
                <View style={styles.addupload}>
            <TouchableOpacity onPress={this._pickDocument} >
                <Text style={styles.theupload} > Joindre un fichier</Text>
            </TouchableOpacity>
        </View> 


               {/*  -----------------DATE -------------------------------*/}
        <View>
        <TextInput onPress= {() => showMode("date")} title="DATE" color="#841584"  placeholder='dd/mm/yyyy' value={inputDate} />
          {
            show && (
              <DateTimePicker
              value = {date}
              locale= {'fr'}
              mode={mode}
              display={"date"}
              is24Hour={true}
              onChange={handleDate}
              />
            )
          }
        </View>

  {/*  -----------------LITTRE-------------------------------*/}
        <View style={styles.addliter}>
        <TextInput style={styles.price} placeholder="Nombre de littre" keyboardType="numeric" onChangeText={(value) => setLiter(value)} value={liter}/>
        </View>        

          {/*  ADD PRICE*/}
        <View style={styles.addprice}>
            <TextInput style={styles.price} placeholder="50 €" keyboardType="numeric" onChangeText={(value) => setPrice(value)} value={price}/>
        </View>

        {/*  ADD LOCATION*/}
        <View style={styles.addadress}>
            <TextInput style={styles.location} placeholder="Adresse" onChangeText={(value) => setLocation(value)} value={location}/>
        </View>

        {/*  ADD COMMENT*/}
        <View style={styles.addadress}>
            <TextInput style={styles.location} placeholder="Note" onChangeText={(value) => setComment(value)} value={comment}/>
        </View>


        <View style={styles.btnaddexpense}>
        <TouchableOpacity onPress={() => handleSubmit()}>
            <Text style={styles.addexpense}>Ajouter cette dépense</Text> 
        </TouchableOpacity>
        </View>

        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
  )
}

export default AddFuelExpenseScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontSize: 25,
  }, 
  addpicture: {
    padding: 34,
  },
  thetitle: {
    fontSize: 25,
    padding: 34,
  },
  camera: {
    flex: 1,
    padding: 34,
    
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 25,
    padding: 34,
  },
  theupload: {
    fontSize: 25,
    color: 'black',
    padding: 34,
  },
  addliter: {
    padding: 34,
  },
  location: {
    padding: 34,
  }
})

