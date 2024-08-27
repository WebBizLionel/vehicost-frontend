import {
   StyleSheet,
   Text,
   View,
   Image,
   TextInput,
   TouchableOpacity,
   Alert,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { url_backend } from "../configuration/config";
import { addUsername } from "../ reducers/user";
import SimpleButton from "../components/simpleButton";

const SigninScreen = ({ navigation }) => {
   const dispatch = useDispatch();

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const [errorUsername, setErrorUsername] = useState("");
   const [errorPassword, setErrorPassword] = useState("");

   const CheckUserVehicle = async (token) => {
      const options = {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
      };
      const response = await fetch(`${url_backend}/vehicles/get`, options);
      const result = await response.json();
      return result.result;
   };

   const handleSubmit = () => {
      // Manage Input Form Error
      !username && setErrorUsername("L'email est requis");
      !password
         ? setErrorPassword("Le mot de passe est obligatoire")
         : password.length < 6 &&
           setErrorPassword("Mot de passe de plus de 6 caractere");

      if (!username || !password) {
         return;
      }

      fetch(`${url_backend}/users/signin`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ username, password }),
      })
         .then((response) => response.json())
         .then((data) => {
            if (data.result) {
               const token = data.token;
               dispatch(addUsername({ username, token }));

               //Destination
               if (CheckUserVehicle(token)) {
                  navigation.navigate("DrawerNavigator", {
                     screen: "TabNavigator",
                     params: { screen: "Accueil" },
                  });
               } else {
                  navigation.navigate("Ajouter un vehicule");
               }
            } else {
               Alert.alert("", data.error, [
                  {
                     text: "OK",
                     onPress: () => {
                        setPassword(""),
                           setUsername(""),
                           setErrorPassword(""),
                           setErrorUsername("");
                     },
                  },
               ]);
            }
         });
   };

   function handleBack() {
      navigation.navigate("Bienvenue");
   }

   return (
      <View style={styles.container}>
         <View>
            <Text style={styles.baseText}>Bienvenue sur VehiCost</Text>
         </View>

         <View style={styles.backpage}>
            <TouchableOpacity onPress={() => handleBack()}>
               <Text style={styles.msgback}>Retour</Text>
            </TouchableOpacity>
         </View>

         <View style={styles.inputs}>
            <View style={styles.inputemail}>
               <TextInput
                  style={styles.input}
                  placeholder="Email ou Nom d’utilisateur *"
                  keyboardType="text"
                  onChangeText={(value) => setUsername(value)}
                  value={username}
                  type="text"
                  id="username"
                  autoCapitalize="none"
                  onFocus={() => setErrorUsername("")}
               />
               <Text style={styles.error}>
                  {errorUsername.length > 0 && errorUsername}
               </Text>
            </View>
            <View style={styles.inputpasseword}>
               <TextInput
                  style={styles.input}
                  placeholder="Mot de passe *"
                  keyboardType="text"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={(value) => setPassword(value)}
                  value={password}
                  type="text"
                  id="password"
                  onFocus={() => setErrorPassword("")}
               />
               <Text style={styles.error}>
                  {errorPassword.length > 0 && errorPassword}
               </Text>
            </View>
         </View>

         <View>
            <SimpleButton textButton={"Se connecter"} callback={handleSubmit} />
         </View>
      </View>
   );
};

export default SigninScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
   },
   baseText: {
      fontSize: 25,
      marginBottom: 30,
   },
   inputs: {
      width: "100%",
   },
   inputemail: {
      fontSize: 20,
      marginBottom: 70,
      padding: 10,
      borderWidth: 1,
      borderColor: "#038737",
      marginBottom: 16,
   },
   inputpasseword: {
      fontSize: 20,
      marginBottom: 70,
      padding: 10,
      borderWidth: 1,
      borderColor: "#038737",
      marginBottom: 16,
   },
   error: {
      color: "red",
      fontSize: 12,
   },
   textbtn: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
   },
   signin: {
      marginTop: 30,
      elevation: 8,
      backgroundColor: "#038737",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 300,
   },
});