import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView} from 'react-native';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import { withTheme, Button } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';

import Back from '../Shared/Back';
import Chevron from "react-native-bootstrap-icons/icons/chevron-down";

import {baseUrl} from "../../config/config";

const TambahTransaksi = props => {
    let menu;
    const [status, setStatus] = useState('Pemasukan');  
    const [title, setTitle] = useState('');  
    const [nominal, setNominal] = useState(0);
    const [loader, setLoader] = useState(false);  
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
        select:{
            borderRadius: 13,
            marginVertical: 7,
            height: 53,
            padding: 12,
            backgroundColor: "#EFEFEF",
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        bot:{
            display: 'flex',
            width: windowWidth - 40,
        },
        button:{
            borderRadius: 13,
            justifyContent: 'center'
        },
        tambah:{
            backgroundColor: color.primary,
        },
        buttonLabel:{
            textTransform: 'capitalize',
            paddingVertical: 9
        }
    })
    const optionsStyles = {
        optionsContainer: {
          borderRadius: 13,
          overflow: 'hidden',
          width: windowWidth - 40,
          marginTop: 70
        },
        optionsWrapper: {  
            borderRadius: 13
        },
        optionWrapper: {
            borderRadius: 13,
            padding: 12,
        },
    }
    const checkSelected = on => {
        return status == on ? text.subtitle : text.paragraph;
    }
    const AddTransactionHandler = () => {
        if(nominal != 0 && title != ""){
            setLoader(true);
            fetch(baseUrl+'transaction/add/'+props.route.params.id, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: title,
                    nominal: nominal,
                    status: status == 'Pemasukan' ? 'Up' : 'Down'
                })
            })
            .finally(() => {
                setLoader(false);
                setTimeout(() => {
                    props.navigation.goBack();
                },300)
            });
        }
    }
    return(
        <View>
            {/* Back> */}
            <Back theme = {props.theme} loc ="Tambah Transaksi" navigation = {props.navigation}/>
            <ScrollView>
                <View style={{ ...styles.contain,...layout.container}}>
                    <View style={styles.form}>
                        <TextInput style={styles.input}
                            placeholder="Nama transaksi"
                            placeholderTextColor= {color.secondary}
                            onChangeText = {text => setTitle(text)}
                        />
                        <TextInput style={styles.input}
                            placeholder="Jumlah"
                            placeholderTextColor= {color.secondary}
                            keyboardType = 'numeric'
                            onChangeText = {text => setNominal(text)}
                        />
                        <Menu ref={r => (menu = r)} >
                            <MenuTrigger style={styles.select}>
                                <Text style={text.primaryParagraph}>{status}</Text>
                                <Chevron width="16" height="16" fill={color.primary}/>
                            </MenuTrigger>
                            <MenuOptions customStyles={optionsStyles} >
                                <MenuOption onSelect={() => setStatus('Pemasukan')} >
                                    <Text style={checkSelected('Pemasukan')}>Pemasukan</Text>
                                </MenuOption>
                                <MenuOption onSelect={() => setStatus('Pengeluaran')} >
                                    <Text style={checkSelected('Pengeluaran')}>Pengeluaran</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                    <View style={styles.bot}>
                        <Button style={{...styles.button, ...styles.tambah, ...layout.mt1}} labelStyle={{...text.whiteSubtitle, ...styles.buttonLabel}} mode="contained" onPress={() => AddTransactionHandler()}>
                            Tambah
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
        </View> 
    )
}

export default withTheme(TambahTransaksi);