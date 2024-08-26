import { useState } from "react";
import {
   StyleSheet,
   View,
   Animated,
   Dimensions,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

import HomePageScreen from "../screens/HomePageScreen";
import FuelScreen from "../screens/FuelScreen";
import MaintenanceScreen from "../screens/MaintenanceScreen";
import InsuranceScreen from "../screens/InsuranceScreen";
import { gColor, stepSize } from "../styles/variablesCSS";
import Modal from "react-native-modal";
import AddExpenseTabNavButton from "../components/AddExpenseTabNavButton";
import ModalNavMenuItem from "../components/ModalNavMenuItem";

//Icons
import Home from "../assets/icons/home.svg";
import Gas from "@material-design-icons/svg/outlined/local_gas_station.svg";
import Build from "@material-design-icons/svg/outlined/build.svg";
import Beenhere from "../assets/icons/beenhere.svg";

// Windows dimension
const wWidth = Dimensions.get("window").width;
const wHeight = Dimensions.get("window").height;

// Add a fake Screen
const AddExpenseComponent = () => {
   return null;
};

// Bottom tab
const TabNavigator = ({ navigation }) => {
   //Modal useState
   const [modalVisible, setModalVisible] = useState(false);

   const toggleModal = () => {
      setModalVisible(!modalVisible);
   };

   // Create menu
   const modalNavMenuItems = [
      {
         text: "Dépense de carburant",
         navigate: "Dépense carburant",
         icon: Gas,
      },
      {
         text: "Dépense d'entretien",
         navigate: "Dépense entretien",
         icon: Build,
      },
      {
         text: "Dépense d'assurance",
         navigate: "Dépense assurance",
         icon: Beenhere,
      },
      
   ];

   const modalNavMenu = modalNavMenuItems.map((item,index) => {
      return (
         <ModalNavMenuItem item={item} navigation={navigation} key={index} />
      )
   });

   const AddExpenseModal = (
      <Modal
         backdropOpacity={0.25}
         isVisible={modalVisible}
         onBackdropPress={toggleModal}
         onBackButtonPress={toggleModal}
         useNativeDriverForBackdrop
         coverScreen={false}
         style={styles.modalWrapper}
      >
         <View style={styles.modalContent}>
            {modalNavMenu}
         </View>
      </Modal>
   );

   return (
      <>
         <Tab.Navigator    
            screenOptions={({ route }) => ({
               headerShown:false, 
               tabBarIcon: ({ color, size, focused }) => {

                  const icons = {
                     Accueil: Home,
                     Carburant: Gas,
                     Entretien: Build,
                     Assurance: Beenhere,
                   };

                  const IconTab = icons[route.name]; 

                  return (
                     <View
                        style={{
                           position: "relative",
                           paddingHorizontal: 20,
                           paddingVertical: 4,
                        }}
                     >
                        <View
                           style={{
                              position: "absolute",
                              backgroundColor: focused
                                 ? "#025A25"
                                 : "transparent",
                              borderRadius: 25,
                              paddingHorizontal: 20,
                              paddingVertical: 4,
                              left: 0,
                              right: 0,
                              top: 0,
                              bottom: 0,
                           }}
                        ></View>
                        {IconTab && <IconTab fill={color} width={size} height={size} />}
                     </View>
                  );
               },
               tabBarActiveTintColor: "#ffffff",
               tabBarInactiveTintColor: "#ffffff",
               tabBarStyle: {
                  backgroundColor: gColor.mainColor,
                  paddingBottom: 14,
                  paddingTop: 13,
                  height: 80,
               },
               tabBarLabelStyle: {
                  fontSize: 12,
                  fontFamily: "SourceSansPro-Semibold",
               },
            })}
         >
            <Tab.Screen name="Accueil" component={HomePageScreen} />
            <Tab.Screen name="Carburant" component={FuelScreen} />
            <Tab.Screen
               name="Ajouter une dépense"
               component={AddExpenseComponent}
               options={{
                  tabBarButton: (props) => (
                     <AddExpenseTabNavButton
                        onPress={toggleModal}
                        modalVisible={modalVisible}
                        style={[
                           styles.tabNabButton,
                           modalVisible && { opacity: 0 },
                        ]}
                     />
                  ),
               }}
            />
            <Tab.Screen name="Entretien" component={MaintenanceScreen} />
            <Tab.Screen name="Assurance" component={InsuranceScreen} />
         </Tab.Navigator>
         {modalVisible && (
            <AddExpenseTabNavButton
               onPress={toggleModal}
               modalVisible={modalVisible}
               style={{ ...styles.tabNabButton, ...styles.tabNavButtonzIndex }}
            />
         )}
         {AddExpenseModal}
      </>
   );
};

export default TabNavigator;

const styles = StyleSheet.create({
   tabNabButton: {
      width: 56,
      height: 56,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      top: -48,
      backgroundColor: gColor.additionalColor,
      marginHorizontal: -22,
      position: "relative",
      zIndex: 95,
      elevation: 3,
   },
   tabNavButtonzIndex: {
      position: "absolute",
      top: "",
      bottom: 59,
      left: wWidth / 2 - 6,
   },
   modalWrapper: {
      alignItems: "center",
      justifyContent: "flex-end",
      elevation:3
   },
   modalContent: {
      borderRadius: 8,
      backgroundColor: "#ffffff",
      paddingVertical: 2 * stepSize,
      bottom: 104,
      width: "auto",
   },
});
