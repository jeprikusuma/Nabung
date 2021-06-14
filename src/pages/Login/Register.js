import React, {useState, useRef} from 'react';
import {Animated, Text, View,  StyleSheet, TextInput, Dimensions, ScrollView} from 'react-native';
import { withTheme, Button } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';

import {baseUrl} from "../../config/config";

const Register = props => {
    const { color, text, layout } = props.theme;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const [failed, setFailed] = useState(false);
    const [failedMessage, setFailedMessage] = useState("");

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
        },
        button:{
            borderRadius: 13,
            justifyContent: 'center'
        },
        login:{
            backgroundColor: color.primary,
        },
        register:{
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
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }).start();
    };
    fadeIn();

    const registered = async (id) => {
        try {
          const jsonValue = JSON.stringify({
              id: id,
          })
          await AsyncStorage.setItem('@user_data', jsonValue);
          props.navigation.reset({index: 0, routes: [{ name: 'HomeNavigation'}]});
        } catch (e) {
          console.log(e)
        }
    }

    const registerHandler = () => {
        if(name != "" && email != "" && password != ""){
            setLoader(true);
            fetch(baseUrl+'register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            .then(async res => {
                return {status: res.status, value: await res.text()}
            })
            .then(data => {
                setLoader(false);
                if(data.status == 400){
                    setTimeout(() => {
                        setFailedMessage(data.value);
                        setFailed(true);
                    }, 200)
                }else{
                    registered(data.value);
                }
            })
        }
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
                        onChangeText = {text => setName(text)}
                    />
                    <TextInput style={styles.input}
                        placeholder="Email"
                        placeholderTextColor= {color.secondary}
                        autoCapitalize = 'none'
                        onChangeText = {text => setEmail(text)}
                        />
                    <TextInput style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor= {color.secondary}
                        autoCapitalize = 'none'
                        onChangeText = {text => setPassword(text)}
                    />
                </View>
                <View style={styles.bot}>
                <Text style={{...text.paragraph, ...layout.mb1, ...layout.mt1}}>Sudah punya akun? <Text style={text.primaryParagraphBold} onPress={() => props.navigation.navigate('Login')}>Login</Text></Text>
                    <Button style={{...styles.button, ...styles.login, ...layout.mt1}} labelStyle={{...text.whiteSubtitle, ...styles.buttonLabel}} mode="contained" onPress={() => registerHandler()}>
                        Registrasi
                    </Button>
                </View>
            </View>
            <AwesomeAlert
                show={loader}
                showProgress={false}
                useNativeDriver={true}
                message="Loading..."
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                overlayStyle={{
                    height: '100%'
                }}
                messageStyle={text.paragraph}
                />
            <AwesomeAlert
                show={failed}
                showProgress={false}
                title="Gagal Registrasi"
                message={failedMessage}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                cancelText="Okay"
                contentContainerStyle={{
                    width: '80%',
                    alignItems: 'center'
                }}
                onCancelPressed={() => {
                    setFailed(false);
                }}
                titleStyle={text.title}
                messageStyle={text.paragraph}
                />
        </ScrollView>
    )
}

export default withTheme(Register);