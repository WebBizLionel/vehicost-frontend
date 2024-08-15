import { gColor, textSize, stepSize,diMension } from "./variablesCSS";

const helpers = {
    textLeft:{
        textAlign:'left'
    },
    textRight:{
        textAlign:'right'
    },
    textCenter:{
        textAlign:'center',
    },
    textBody:{
        fontSize:textSize.textBody,
    },
    textSubtitle:{
        fontSize:textSize.subTitle, 
    },
    textColor:{
        color:gColor.textColor, 
    }, 
    textLink:{
        color:gColor.mainColor, 
        textDecorationLine: 'underline'
    },
    flexDirectionRow: {
        flexDirection:'row'
    },
    w100:{
        width:diMension.d_12_12
    }, 
    jcEnd:{
        justifyContent:'flex-end', 
    },
    MontserratRegular:{
        fontFamily:'Montserrat-Regular'
    }
}

exports.helpers = helpers 