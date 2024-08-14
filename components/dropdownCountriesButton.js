import { countries } from 'react-native-international-phone-number/lib/constants/countries';
import Dropdown from 'react-native-input-select';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const DropdownCountriesButton = ({ callback, ...props}) => {

    const countriesList = countries;

    
    const count = countriesList.map((e) => {return {label: e.flag + e.name.fr, value:e.name.fr}}) 

    return (

        <View>
        <Dropdown
        label="Pays"
        options={count?.map((e) => {return e})}
        selectedValue={props.country}
        onValueChange={(value) => props.setCountry(value)}
        primaryColor={'green'}/> 
        </View>

        
        

        /* const [thevehicle, setTheVehicle] = useState([]);
           const [selectedVehicle, setSelectedVehicle] = useState("") */
    
        /* <Dropdown
        label="Vehicle"
        placeholder="Choisir le vehicule"
        options={thevehicle?.map((e) => {return {label: e.name, value: e._id}})}
        selectedValue={selectedVehicle}
        onValueChange={(value) => setSelectedVehicle(value)}
        primaryColor={'green'}/>  */
    )



}

export default DropdownCountriesButton;            