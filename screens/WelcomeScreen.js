import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { Fragment } from 'react'; 
import Simplelinking from '../components/simpleLinking';
import SimpleButton from '../components/simpleButton';
import SimpleLink from '../components/simpleLink';
import {global} from '../styles/style';
import { diMension, gColor, stepSize } from '../styles/variablesCSS';
import Email from '@material-design-icons/svg/outlined/email.svg';
import WelcomeSlider from '../components/welcomeSlider';

const WelcomeScreen = ({ navigation }) => {

  return (
    <Fragment>
    <SafeAreaView style={global.mainContainer}>
      <View style={{...global.w100, ...styles.topScreen}}>
        <WelcomeSlider/>
      </View>
      <View style={{...global.w100, ...styles.bottomScreen}}>
        <View style={{...global.mainWrapper, ...styles.bottomWrapper}}>
          <View>
            <SimpleButton callback={handlePress = () => navigation.navigate('Sign Up')}/>
            <Text style={{...global.defaultH6,...global.textCenter, ...styles.signIntext}}>Vous avez déjà un compte ?</Text> 
            <SimpleLink text={'Se connecter'} txtstyle={{...styles.signInLink,...global.textCenter, ...global.textLink}} callback={() => navigation.navigate('Sign in')} txtColor={gColor.mainColor} txtHoverColor={gColor.additionalColor}/>
          </View>
          <View style={styles.contactLinkWrapper}>
            <Simplelinking style={styles.contactLink} txtStyle={{...global.link, ...{lineHeight:22}}}  txtHoverStyle={{...global.linkPressed,...{lineHeight:22}}} icon={<Email fill={gColor.mainColor} width={20}  height={20}/>} iconPress={<Email fill={gColor.additionalColor} width={20}  height={20}/>} url='mailto:support@vehicost.com?subject=Contacter le support VehiCost&body=Bonjour le support !  ❤️' text='Contacter le support'/>
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
    height:diMension.d_65,
    backgroundColor:gColor.bgColor2,
  },
  bottomScreen:{
    height:diMension.d_35,
  }, 
  bottomWrapper:{
     paddingTop:5*stepSize,
     flexDirection:'column',
     justifyContent:'space-between',
     height:diMension.d_12_12, 
  },
  contactLinkWrapper:{
    paddingBottom:2*stepSize,
    textAlign:'right',
    justifyContent:'flex-end'
  },
  contactLink:{
    flexDirection:'row', 
    alignContent:'center', 
    justifyContent:'flex-end',
    gap:2,
  },
  signIntext:{
    marginTop:3.5*stepSize,
  },
  signInLink:{
    marginTop:2*stepSize,
    fontSize:18,
  },
 
 
  
})

