import React from 'react';
import { StyleSheet, Image, View, Dimensions} from 'react-native';
import {withTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const Blank = props => {
    const {layout} = props.theme;
    const screenHeight = Dimensions.get('window').height
    const styles = StyleSheet.create({
        loading:{
            alignItems: 'center',
            height: screenHeight,
            justifyContent: 'space-between',
        },

        logo: {
            width: 55,
            height: 105,
            marginTop: screenHeight / 4
        },
        loader: {
            width: 50,
            height: 50
        }
    })
    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@user_data');
          if(jsonValue != null){
            const value = JSON.parse(jsonValue);
            props.navigation.reset({index: 0, routes: [{ name: 'HomeNavigation'}]});
          }else{
            props.navigation.reset({index: 0, routes: [{ name: 'LoginNavigation' }]});
          }
        } catch(e) {
            console.log(e)
        }
    }
    getData();
    return (
        <View style={{...layout.container, ...styles.loading}}>
            <Image style={styles.logo} source={require('../../assets/img/system/logo.png')}></Image>
            <Image style={styles.loader} source={require('../../assets/img/system/loader.gif')}></Image>
        </View>
    )
}
export default withTheme(Blank);