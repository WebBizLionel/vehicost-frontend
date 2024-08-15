
import { StyleSheet, Text, Pressable} from 'react-native';
import { useState } from 'react';


const SimpleLink = ({text, callback,txtstyle,txtColor,txtHoverColor,  ...props}) => {


    const handlePress= () =>{
        callback(); 
    }

    const [pressColor, setpressColor] = useState(txtColor);

    return (
    <Pressable  onPress={handlePress} onPressIn={()=>setpressColor(txtHoverColor)} onPressOut={()=>setpressColor(txtColor)}>
        <Text style={{...txtstyle, ...{color:pressColor}}}>{text}</Text>
    </Pressable>
    )
}

export default SimpleLink



