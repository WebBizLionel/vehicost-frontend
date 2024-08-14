import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { Fragment } from 'react'; 
import Simplelinking from '../components/simpleLinking';
import SimpleButton from '../components/simpleButton';
import {global} from '../styles/style';
import { diMension, gColor, stepSize } from '../styles/variablesCSS';

const WelcomeScreen = ({ navigation }) => {

  return (
    <Fragment>
    <SafeAreaView style={global.mainContainer}>
      <View style={{...global.w100, ...styles.topScreen}}>

      </View>
      <View style={{...global.w100, ...styles.bottomScreen}}>
        <View style={{...global.mainWrapper, ...styles.bottomWrapper}}>
          <View>
            <SimpleButton callback={handlePress = () => navigation.navigate('Sign Up')}/>
          </View>
          <View style={styles.contactLink}>
            <Simplelinking style={{...global.link, ...global.textRight}} hoverStyle={{...global.linkPressed,...global.textRight}} url='mailto:support@vehicost.com?subject=Contacter le support VehiCost&body=Bonjour le support !  ❤️' text='Contacter le support'/>
          </View>
        </View>
      </View>
    </SafeAreaView>
    </Fragment>
  )
}

export default WelcomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topScreen:{
    height:diMension.d_60,
    backgroundColor:gColor.bgColor2,
  },
  bottomScreen:{
    height:diMension.d_40,
  }, 
  bottomWrapper:{
     paddingTop:5*stepSize,
     flexDirection:'column',
     justifyContent:'space-between',
     height:diMension.d_12_12, 
  },
  contactLink:{
    paddingBottom:2*stepSize,
  },
 
  
})

