import { useState } from 'react';
import { 
  StyleSheet,
  View, 
} from 'react-native';

import React from 'react';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList, 
} from '@react-navigation/drawer';

//Navigation TabNavigator
import TabNavigator from './TabNavigator';

//Style
import { gColor, stepSize } from '../styles/variablesCSS';
import {global} from '../styles/style';

//Logo
import LogoTitle from '../components/LogoTitle';

//Screen
import AccountScreen from '../screens/AccountScreen';
import ManageVehiclesScreen from '../screens/ManageVehiclesScreen';

//Icon
import Person from '@material-design-icons/svg/filled/person_outline';
import Home from '../assets/icons/home.svg';
import Car from '@material-design-icons/svg/outlined/directions_car_filled';
import HamburgerMenu from '../components/HamburgerMenu';


// Create Drawer Navigation
const Drawer = createDrawerNavigator();


//Drawer Content
const CustomDrawerContent = (props) => {

  return (
    <DrawerContentScrollView style={styles.drawerScrollWrapper} {...props}>
      <View style={styles.logoWrapper}>
        <LogoTitle width={156} tintColor={gColor.mainColor} {...props}/>
      </View>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = ({navigation}) => {

  return (
    <Drawer.Navigator 
      initialRouteName='Acceuil'
      screenOptions={{
        headerTitle: (props) => <LogoTitle width={160} {...props} />,
        headerStyle: {
           backgroundColor:gColor.mainColor,
        },
        headerLeft:() => <HamburgerMenu bgColor={'#ffffff'}/>,
        headerTintColor: '#ffffff',
        headerTitleAlign:'center',
        headerTitleStyle: {fontFamily:'Montserrat-SemiBold'},
        drawerItemStyle:styles.drawerItemStyle, 
        drawerActiveBackgroundColor:gColor.mainColor,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor:gColor.textColor,
        drawerLabelStyle:styles.drawerLabelStyle, 
        drawerType: 'slide' 
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name='Acceuil'
        component={TabNavigator} 
        initialParams={{ screen: 'Accueil' }}
        options={{
          drawerIcon:({focused,size}) => (
            <Home  style={{marginLeft:4, marginRight:-14}} fill={focused ? '#ffffff' : gColor.textColor} width={size} heigth={size} />
          ),
        }}
      />
      <Drawer.Screen
        name='Mon compte'
        component={AccountScreen}
        options={{
          drawerIcon:({focused,size}) => (
            <Person style={{marginLeft:4, marginRight:-14}} fill={focused ? '#ffffff' : gColor.textColor} width={size} heigth={size} />
          ),
          headerTitle:'Mon compte'
        }}
      />
      <Drawer.Screen
        name='Mes véhicules'
        component={ManageVehiclesScreen}
        options={{
          drawerIcon:({focused,size}) => (
            <Car style={{marginLeft:4, marginRight:-14}} fill={focused ? '#ffffff' : gColor.textColor} width={size} heigth={size} />
          ),
          headerTitle:'Mes véhicules'
        }}
      />
      
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({
  logoWrapper:{
    width:'100%', 
    borderBottomColor:gColor.greyColor, 
    borderBottomWidth:1,
    paddingTop:3, 
    paddingBottom:4, 
    paddingLeft:2*stepSize, 
    marginBottom:1.25*stepSize
  }, 
  drawerItemStyle:{
    marginLeft:0,
    marginRight:2*stepSize,
    borderRadius:0, 
    borderBottomRightRadius:50, 
    borderTopRightRadius:50,
  },
  drawerLabelStyle:{
    fontFamily:'Montserrat-Medium',
    fontSize:16, 
  }
})

