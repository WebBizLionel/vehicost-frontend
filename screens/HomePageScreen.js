import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { url_backend } from "../configuration/config";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import ListOfExpenses from "../components/listOfExpenses";

const HomePageScreen = ({ navigation, ...props }) => {
   const user = useSelector((state) => state.user.value);

   const [vehData, setvehData] = useState({
      id: null,
      name: null,
      expenses: null,
   });

   const [totalCost, setTotalCost] = useState(0);

   const leavePage = () => {
      navigation.navigate("Bienvenue");
   };

   //ROUTE GET VEHICULE
   useEffect(() => {
      fetch(`${url_backend}/vehicles/get`, {
         headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
         },
      })
         .then((response) => response.json())
         .then((data) => {
            if (data.result) {
               setvehData({
                  ...vehData,
                  id: data.vehicles[0]._id,
                  name: data.vehicles[0].name,
                  expenses: data.vehicles[0].expenses,
               });
            }
         });
   }, []);

   //FETCH DEPENSE
   useEffect(() => {
      const start = moment().utc().startOf("month").valueOf();
      const end = moment().utc().valueOf();

      const query = start && end ? `?start_date${start}&end_date${end}` : "";
      /* console.log(vehData.id) */
      if (vehData.id) {
         fetch(`${url_backend}/vehicles/expenses/get/${vehData.id}${query}`, {
            headers: {
               Authorization: `Bearer ${user.token}`,
               "Content-Type": "application/json",
            },
         })
            .then((response) => response.json())
            .then((data) => {
               const totalCost =
                  data.vehicle && data.vehicle.length > 0
                     ? data.vehicle[0].total_cost
                     : 0;
               setTotalCost(totalCost);
            });
      }
   }, [vehData]);

   const expenSes = vehData.expenses;

   const expenses =
      expenSes &&
      expenSes.map((item, index) => {
         return <ListOfExpenses key={index} item={item} />;
      });

   return (
      <View style={styles.container}>
         <View>
            <TouchableOpacity
               onPress={() => leavePage()}
               style={{ cursor: "pointer" }}
            >
               <FontAwesome
                  name="arrow-left"
                  size={40}
                  color="rgba(220, 86, 78, 1)"
               />
            </TouchableOpacity>
         </View>

         {/*  INFORMATION SUR LA VOITURE*/}

         <View style={styles.element}>
            <View style={styles.litlecontainer}>
               <View style={styles.information}>
                  <Text style={styles.title}>Informations de mon véhicule</Text>
                  <Text style={styles.text}>{vehData.name}</Text>
               </View>
            </View>
            <View style={styles.expense}>
               <Text style={styles.text}>
                  Vous avez dépensé {totalCost} euros ce mois-ci
               </Text>
            </View>
            <View style={styles.list_expense}>{expenses}</View>
         </View>
         <View>
            <View style={styles.arrow}>
               <TouchableOpacity>
                  <FontAwesome
                     name="plus"
                     size={40}
                     color="rgba(220, 86, 78, 1)"
                  />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};

export default HomePageScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   element: {
      width: "100%",
      alignItems: "center",
   },
   litlecontainer: {
      height: 200,
      borderRadius: 10,
      flexDirection: "row",
   },

   title: {
      fontSize: 15,
      fontWeight: "bold",
      color: "#015A25",
   },
   expense: {
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
   },
   text: {
      fontSize: 15,
      fontWeight: "bold",
      color: "#015A25",
   },
});