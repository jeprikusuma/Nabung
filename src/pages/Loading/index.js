import React from 'react';
import { StyleSheet, Image, View, Dimensions} from 'react-native';
import {withTheme } from 'react-native-paper';

const Loading = props => {
    const {layout} = props.theme;
    const screenHeight = Dimensions.get('screen').height
    const styles = StyleSheet.create({
        loading:{
            alignItems: 'center',
            height: screenHeight,
            justifyContent: 'space-between',
        },

        logo: {
            width: 170,
            height: 60,
            marginTop: screenHeight / 4
        },
        loader: {
            width: 60,
            height: 60
        }
    })
    return (
        <View style={{...layout.container, ...styles.loading}}>
            <Image style={styles.logo} source={require('../../assets/img/system/logo.png')}></Image>
            <Image style={styles.loader} source={require('../../assets/img/system/loader.gif')}></Image>
        </View>
    )
}
export default withTheme(Loading);