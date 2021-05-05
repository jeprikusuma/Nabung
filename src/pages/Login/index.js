import React, {useState, useRef} from 'react';
import {Animated, View,  StyleSheet, TextInput, Dimensions, ScrollView} from 'react-native';
import { withTheme, Button } from 'react-native-paper';

import Home from "../Home";

const Login = props => {
    const  [toHome, setToHome] = useState(false);
    const { color, text, layout } = props.theme;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const styles = StyleSheet.create({
        form:{
            display: 'flex',
            alignSelf: 'stretch',
        },
        discoverLogo:{
            marginBottom: 50
        },
        logo:{
            width: 140,
            height: 50,
        },
        input:{
            borderRadius: 13,
            marginVertical: 7,
            height: 53,
            padding: 12,
            overflow: 'hidden',
            backgroundColor: "#EFEFEF",
            color: color.primary
        },
        contain: {
            alignItems: 'center', 
            justifyContent: 'center',
            flex: 1,
            height: windowHeight
        },
        bot:{
            display: 'flex',
            width: windowWidth - 40,
            marginTop: 50,
            position: 'absolute',
            bottom: 0
        },
        button:{
            borderRadius: 13,
            justifyContent: 'center'
        },
        register:{
            backgroundColor: color.primary,
        },
        login:{
            backgroundColor: '#fff',
            borderColor: color.primary
        },
        buttonLabel:{
            textTransform: 'capitalize',
            paddingVertical: 9
        }
    })

    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true
        }).start();
    };
    fadeIn();

    if (toHome) {
        // return <Home/>;
    }
    return( 
        <ScrollView>
            <View style={{ ...styles.contain,...layout.container}}>
                <View style={styles.discoverLogo}>
                    <Animated.Image source={require('../../assets/img/system/logo.png')} style={{...{opacity: fadeAnim}, ...styles.logo}}/>
                </View>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder="Nama"
                        placeholderTextColor= {color.secondary}
                        autoCapitalize = 'words'
                    />
                    <TextInput style={styles.input}
                        placeholder="Email"
                        placeholderTextColor= {color.secondary}
                        autoCapitalize = 'none'
                        />
                    <TextInput style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor= {color.secondary}
                        autoCapitalize = 'none'
                    />
                </View>
                <View style={styles.bot}>
                    <Button style={{...styles.button, ...styles.register, ...layout.mt1}} labelStyle={{...text.whiteSubtitle, ...styles.buttonLabel}} mode="contained" onPress={() => setToHome(true)}>
                        Registrasi
                    </Button>
                    <Button style={{...styles.button, ...styles.login, ...layout.mt1}} labelStyle={{...text.subtitle, ...styles.buttonLabel}} mode="outlined" onPress={() => setToHome(true)}>
                        Login
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}

export default withTheme(Login);