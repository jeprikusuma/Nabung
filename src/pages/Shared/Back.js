import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import BackIcon from "react-native-bootstrap-icons/icons/arrow-left-short";

const Back = (props) => {
    const {color, text} = props.theme;
    const styles = StyleSheet.create({
        back:{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignSelf: 'stretch',
            alignItems: 'center',
            position: 'absolute',
            top: 40,
            left: 20,
            zIndex: 9999
        },
        backIcon: {
            marginRight: 5
        },
    })
    return(
        <TouchableOpacity style={styles.back} onPress={() => props.navigation.goBack()}>
            <BackIcon width="23" style={styles.backIcon} height="23" fill={color.primary}/> 
            <Text style={text.subtitle}>{props.loc}</Text>
        </TouchableOpacity >
    )
}
export default Back;