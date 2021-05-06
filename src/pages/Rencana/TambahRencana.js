import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import { withTheme, Button } from 'react-native-paper';


import Back from '../Shared/Back';

import Chevron from "react-native-bootstrap-icons/icons/chevron-down";

const TambahRencana = props => {
    let menu;
    const [status, setStatus] = useState('Pemasukan');
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
            marginTop: 50,
            position: 'absolute',
            bottom: 0
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
    return(
        <View>
            {/* Back> */}
            <Back theme = {props.theme} loc ="Tambah Rencana"/>
            <ScrollView>
                <View style={{ ...styles.contain,...layout.container}}>
                    <View style={styles.form}>
                        <TextInput style={styles.input}
                            placeholder="Nama rencana"
                            placeholderTextColor= {color.secondary}
                        />
                        <TextInput style={styles.input}
                            placeholder="Anggaran biaya"
                            placeholderTextColor= {color.secondary}
                            keyboardType = 'numeric'
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
                        <TouchableOpacity style={styles.select}>
                            <Text style={text.secondary}>Jadwal</Text>
                            <Chevron width="16" height="16" fill={color.primary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bot}>
                        <Button style={{...styles.button, ...styles.tambah, ...layout.mt1}} labelStyle={{...text.whiteSubtitle, ...styles.buttonLabel}} mode="contained" onPress={() => console.log('add')}>
                            Tambah
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View> 
    )
}

export default withTheme(TambahRencana);