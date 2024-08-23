/**
 * Global style
 */

import { helpers } from "./helperStyle";
import { gColor, textSize, stepSize,diMension } from "./variablesCSS";

const global = {
    ...helpers, 
    mainContainer : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainWrapper:{
        paddingHorizontal:2*stepSize,
        width:diMension.d_12_12, 
    },
    mainBackground:{
        backgroundColor:gColor.bgColor,
    },
    secondBackground:{
        backgroundColor:gColor.bgColor2
    },
    link:{
        color:gColor.mainColor,
        fontSize:textSize.textBody,
        fontFamily:'SourceSansPro-Regular'
    },
    linkPressed:{
        color:gColor.additionalColor,
        fontSize:textSize.textBody,
        fontFamily:'SourceSansPro-Regular',
    },  
    button:{
        backgroundColor:gColor.mainColor,
        paddingHorizontal:2*stepSize,
        borderRadius:4,
        width:diMension.d_12_12, 
        height:48,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonPressed:{
        backgroundColor:gColor.secondColor, 
    }, 
    buttonTxt:{
        fontSize:textSize.subTitle, 
        color:gColor.wColor,
        fontFamily:'SourceSansPro-Regular'
    },
    ghostbutton:{

    },
    defaultText:{
        fontSize:textSize.textBody,
        color:gColor.textColor,
        fontFamily:'SourceSansPro-Regular', 
    }, 
    defaultH6:{
        fontSize:textSize.subTitle,
        fontFamily:'Montserrat-Regular',
        color:gColor.textColor,
    }
}

module.exports = {global}; 
