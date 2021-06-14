import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Dimensions, ScrollView} from 'react-native';
import { withTheme, Button } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';

import Back from '../Shared/Back';

import {baseUrl} from "../../config/config";

const GantiPassword = props => {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loader, setLoader] = useState(false);
    const [failed, setFailed] = useState(false);
    const [failedMessage, setFailedMessage] = useState("");
    const { color, text, layout } = props.theme;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const styles = StyleSheet.create({
        contain: {
            alignItems: 'center', 
            justifyContent: 'center',
            flex: 1,
            height: windowHeight
        },
        form:{
            display: 'flex',
            alignSelf: 'stretch',
        },
        input:{
            borderRadius: 13,
            marginVertical: 7,
            height: 53,
            padding: 12,
            overflow: 'hidden',
            backgroundColor: "#EFEFEF",
            color: color.primary,
        },
        bot:{
            display: 'flex',
            width: windowWidth - 40,
        },
        button:{
            borderRadius: 13,
            justifyContent: 'center'
        },
        ganti:{
            backgroundColor: color.primary,
        },
        buttonLabel:{
            textTransform: 'capitalize',
            paddingVertical: 9
        }
    })
    const changeHandler = () => {
        if(password != "" && confirm != ""){
            setLoader(true);
            fetch(baseUrl+'change/password/' + props.route.params.id, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    password: password,
                    confirm: confirm
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
                }
            })
        }
    }

    return(
        <View>
            {/* Back> */}
            <Back theme = {props.theme} loc ="Ganti Password" navigation = {props.navigation}/>
            <ScrollView>
                <View style={{ ...styles.contain,...layout.container}}>
                    <View style={styles.form}>
                        <TextInput style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor= {color.secondary}
                            autoCapitalize = 'none'
                            onChangeText = {text => setPassword(text)}
                        />
                        <TextInput style={styles.input}
                            placeholder="Konfirmasi Password"
                            secureTextEntry={true}
                            placeholderTextColor= {color.secondary}
                            autoCapitalize = 'none'
                            onChangeText = {text => setConfirm(text)}
                        />
                    </View>
                    <View style={styles.bot}>
                        <Button style={{...styles.button, ...styles.ganti, ...layout.mt1}} labelStyle={{...text.whiteSubtitle, ...styles.buttonLabel}} mode="contained" onPress={() => console.log('add')} onPress={changeHandler}>
                            Simpan
                        </Button>
                    </View>
                </View>
            </ScrollView>
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
                title="Gagal Mengganti"
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
        </View> 
    )
}

export default withTheme(GantiPassword);