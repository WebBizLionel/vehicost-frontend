import {
   StyleSheet,
   Text,
   View,
   TextInput,
   TouchableOpacity,
   KeyboardAvoidingView,
   TouchableHighlight,
   Pressable,
   SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Checkbox from "expo-checkbox";
import { url_backend } from "../configuration/config";
import { addUsername } from "../ reducers/user";
import PhoneInput from "react-native-international-phone-number";
import { getLocales } from "expo-localization";
import DropdownCountriesButton from "../components/dropdownCountriesButton";
import { global } from "../styles/style";
import SimpleButton from "../components/simpleButton";
import { gColor, stepSize } from "../styles/variablesCSS";

const SignupScreen = ({ navigation, ...props }) => {
   //Dispatch : send actions to STORE
   const dispatch = useDispatch();

   //STATES OF INPUTS
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isChecked, setChecked] = useState(false);
   const [isCheckedNewsletter, setCheckedNewsletter] = useState(false);

   const [country, setCountry] = useState("");

   const selectCountry = (country) => {
      setCountry(country);
   };

   const [selectedCountry, setSelectedCountry] = useState(null);

   const [phone, setPhone] = useState("");
   const [deviceLanguage, setDeviceLanguage] = useState(
      getLocales()[0].languageCode
   );
   /*console.log(deviceLanguage)*/

   //STATE OF ERROR
   const [errorUsername, setErrorUsername] = useState("");
   const [errorEmail, setErrorEmail] = useState("");
   const [errorPassword, setErrorPassword] = useState("");
   const [errorIsChecked, setErrorIsChecked] = useState("");

   //MODAL
   const [isModalVisible, setModalVisible] = useState(false);

   const toggleModal = () => {
      setModalVisible(!isModalVisible);
   };

   const condition =
      "Lorem ipsum dolor sit amet. Sed repudiandae omnis aut voluptate voluptatem ut totam iure ab animi dolore. Qui architecto quisquam qui ducimus iste sed totam expedita quo culpa voluptatem quo aperiam numquam qui asperiores porro est aperiam minima. Et magnam ipsa et quia repellendus eum mollitia laboriosam et optio tempora ut vero natus ut fuga velit est dolor rerum. Ut neque consequatur ut eius eius ut consequatur obcaecati.";
   // @TODO refactor with await

   const handleSubmit = () => {
      fetch(`${url_backend}/users/signup`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            username,
            email,
            password,
            phone,
            country,
            accept_rgpd: isChecked,
            preferences: {
               language: deviceLanguage,
               promotion: isCheckedNewsletter,
            },
         }),
      })
         .then((response) => response.json())
         .then((data) => {
            !username
               ? setErrorUsername("Le nom d'utilisateur est requis")
               : setErrorUsername("");
            !email ? setErrorEmail("L'email est requis") : setErrorEmail("");
            !password
               ? setErrorPassword("Le mot de passe est obligatoire")
               : password.length < 6
               ? setErrorPassword("Mot de passe de plus de 6 caractere")
               : setErrorPassword("");
            !isChecked
               ? setErrorIsChecked(
                    "Vous n'avez pas accepté les conditions générales de Vehicost"
                 )
               : setErrorIsChecked("");
            if (data.result) {
               dispatch(addUsername({ username, token: data.token }));
               navigation.navigate("Ajouter un vehicule");
            } else {
               Alert.alert("", data.error, [
                  {
                     text: "OK",
                     onPress: () => {
                        setPassword(""),
                           setUsername(""),
                           setErrorEmail(""),
                           setErrorPassword(""),
                           setErrorUsername(""),
                           setErrorEmail("");
                     },
                  },
               ]);
            }
         });
   };

   function handlephoneNumber(phone) {
      setPhone(phone);
   }

   function handleSelectedCountry(country) {
      setSelectedCountry(country);
   }

   function handleBack() {
      navigation.navigate("Welcome");
   }
   //console.log(errorIsChecked )
   return (
      <SafeAreaView style={global.mainContainer}>
         <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={0}
            style={styles.container}
         >
            <View style={global.mainWrapper}>
               <View style={styles.backpage}>
                  <TouchableOpacity onPress={() => handleBack()}>
                     <Text style={styles.msgback}>Retour</Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.backpage}>
                  <Text style={styles.baseText}>Bienvenue sur VehiCost</Text>
               </View>

               <View style={styles.field}>
                  <View style={styles.inputusername}>
                     <TextInput
                        style={styles.input}
                        placeholder={"Nom d'utilisateur *"}
                        keyboardType="text"
                        onChangeText={(value) => setUsername(value)}
                        value={username}
                        type="text"
                        id="username"
                     />
                     <Text style={styles.error}>
                        {errorUsername.length > 0 && errorUsername}
                     </Text>
                  </View>
                  <View style={styles.inputemail}>
                     <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Email *"
                        keyboardType="text"
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        type="text"
                        id="email"
                     />
                     <Text style={styles.error}>
                        {errorEmail.length > 0 && errorEmail}
                     </Text>
                  </View>
                  <View style={styles.inputpassword}>
                     <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Mot de passe *"
                        keyboardType="text"
                        secureTextEntry={true}
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                        id="password"
                     />
                     <Text style={styles.error}>
                        {errorPassword.length > 0 && errorPassword}
                     </Text>
                  </View>

                  <PhoneInput
                     onChangeText={(value) => setPhone(value)}
                     value={phone}
                     onChangePhoneNumber={handlephoneNumber}
                     selectedCountry={selectedCountry}
                     onChangeSelectedCountry={handleSelectedCountry}
                     language={deviceLanguage}
                     defaultCountry={deviceLanguage}
                     /* showOnly={['FR', 'ES']}
        modalDisabled */
                     autoFormat
                     placeholder="Téléphone"
                     customCarret={"<></>"}
                     phoneInputStyles={{
                        container: {
                           backgroundColor: "#ffffff",
                           borderWidth: 1,
                           borderStyle: "solid",
                           borderColor: gColor.mainColor,
                           height: 56,
                        },

                        flagContainer: {
                           borderTopLeftRadius: 7,
                           borderBottomLeftRadius: 7,
                           backgroundColor: gColor.lightColor,
                           justifyContent: "center",
                        },
                     }}
                  />
                  <View style={styles.selectcountry}>
                     <DropdownCountriesButton
                        country={country}
                        selectCountry={selectCountry}
                        setCountry={setCountry}
                     />
                  </View>

                  <View style={styles.acceptcondition}>
                     <Modal
                        style={styles.bottomModalView}
                        isVisible={isModalVisible}
                        backdropOpacity={0}
                        onBackdropPress={toggleModal}
                     >
                        <View style={styles.modal}>
                           <Text style={styles.modalText}>{condition}</Text>
                        </View>
                     </Modal>
                     <View style={styles.firstvalidation}>
                        <View style={styles.combinaison}>
                           <Checkbox
                              style={styles.checkbox}
                              value={isChecked}
                              onValueChange={(e) => setChecked(!isChecked)}
                           />
                           <Pressable
                              style={styles.button}
                              onPress={toggleModal}
                           >
                              <Text style={styles.buttonText}>
                                 J'accepte les conditions générales de VéhiCost
                              </Text>
                           </Pressable>
                        </View>
                        {errorIsChecked && (
                           <Text style={styles.errorCheck}>
                              {errorIsChecked}
                           </Text>
                        )}
                     </View>
                  </View>
                  <View style={styles.section}>
                     <Checkbox
                        style={styles.checkbox}
                        value={isCheckedNewsletter}
                        onValueChange={setCheckedNewsletter}
                     />
                     <Text style={styles.paragraph}>
                        Je souhaite m'abonner à la newsletter de Véhicost
                     </Text>
                  </View>
               </View>

               <View style={{ marginTop: 40 }}>
                  <SimpleButton
                     textButton={"S'inscrire"}
                     callback={handleSubmit}
                  />
               </View>
            </View>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
};

export default SignupScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
   },
   section: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
   },
   paragraph: {
      fontSize: 15,
   },
   checkbox: {
      margin: 8,
      padding: 8,
      borderColor: gColor.mainColor,
   },
   baseText: {
      fontSize: 25,
      marginBottom: 30,
   },
   inputusername: {
      fontSize: 20,
      marginBottom: 70,
      padding: 10,
      borderWidth: 1,
      borderColor: "#038737",
      marginBottom: 16,
   },
   inputemail: {
      fontSize: 20,
      marginBottom: 70,
      padding: 10,
      borderWidth: 1,
      borderColor: "#038737",
      marginBottom: 16,
   },
   inputpassword: {
      fontSize: 20,
      marginBottom: 70,
      padding: 10,
      borderWidth: 1,
      borderColor: "#038737",
      marginBottom: 16,
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
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
   },
   error: {
      color: "red",
      fontSize: 12,
   },
   acceptcondition: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      justifyContent: "flex-start",
   },
   button: {
      borderRadius: 20,
      padding: 1,
      elevation: 2,
   },
   buttonClose: {
      backgroundColor: "#2196F3",
   },
   textStyle: {
      fontWeight: "bold",
      textAlign: "center",
   },
   textCondition: {
      fontWeight: "bold",
   },
   bottomModalView: {
      justifyContent: "flex-end",
      margin: 0,
   },
   button: {
      borderStyle: "solid",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
   },
   buttonText: {
      fontWeight: "bold",
   },
   modal: {
      width: "100%",
      height: "30%",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      borderStyle: "solid",
      backgroundColor: "white",
      shadowColor: "#474141",
      shadowOffset: { width: -7, height: -5 },
      shadowOpacity: 1,
      shadowRadius: 14,
      elevation: -10,
   },
   modalText: {
      padding: 2 * stepSize,
   },
   selectcountry: {
      marginTop: 15,
   },
   combinaison: {
      flexDirection: "row",
      alignItems: "center",
   },
   errorCheck: {
      color: "red",
      fontSize: 12,
      alignItems: "center",
      paddingHorizontal: 30,
   },
});
