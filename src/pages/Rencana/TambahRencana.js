import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import { withTheme, Button } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import Back from '../Shared/Back';

import Chevron from "react-native-bootstrap-icons/icons/chevron-down";
import Calendar from "react-native-bootstrap-icons/icons/calendar";

const TambahRencana = props => {
    let menu;
    // state
    const [status, setStatus] = useState('Pemasukan');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [jadwalTampil, setJadwalTampil] = useState("Jadwal");
    const [jadwal, setJadwal] = useState(0);
    const [tema, setTema] = useState("Purple");
    
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
        desc:{
            height: 200,
            textAlignVertical: 'top',
            paddingVertical: 20
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
        },
        temaPicker:{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'stretch',
            marginTop: 8
        },
        tema:{
            height: 40,
            width: 40,
            borderRadius: 20,
            marginRight: 10
        },
        temaActive: {
            borderColor: color.primary,
            borderWidth: 3
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
    const checkJadwal= () => {
        return jadwalTampil != "Jadwal" ? text.primaryParagraph : text.paragraph;
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    }
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }
    
    const handleConfirm = (tgl) => {
        setJadwal(tgl);

        let tampil = `${tgl.getDate()}-${tgl.getMonth()+1}-${tgl.getFullYear()}`;
        setJadwalTampil(tampil);
        setDatePickerVisibility(false);
        
    }

    return(
        <View>
            {/* Back> */}
            <Back theme = {props.theme} loc ="Tambah Rencana"/>
            <ScrollView>
                <View style={{ ...styles.contain,...layout.container}}>
                    <View style={styles.form}>
                        {/* nama rencana */}
                        <TextInput style={styles.input}
                            placeholder="Nama rencana"
                            placeholderTextColor= {color.secondary}
                        />
                        {/* anggaran biaya */}
                        <TextInput style={styles.input}
                            placeholder="Anggaran biaya"
                            placeholderTextColor= {color.secondary}
                            keyboardType = 'numeric'
                        />
                        {/* jadwal */}
                        <TouchableOpacity style={styles.select} onPress={showDatePicker}>
                            <Text style={checkJadwal()}>{jadwalTampil}</Text>
                            <Calendar width="16" height="16" fill={color.primary}/>
                        </TouchableOpacity>
                        {/* status */}
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
                        {/* Deskripsi */}
                        <TextInput style={{...styles.input, ...styles.desc}}
                            placeholder="Deskripsi"
                            placeholderTextColor= {color.secondary}
                            multiline = {true}
                        />
                        {/* tema */}
                        <View style={styles.temaPicker}>
                            <TouchableOpacity 
                            style={{...styles.tema, ...{backgroundColor: color.secondary}, ...tema == "Purple" && styles.temaActive}}
                            onPress={() => setTema("Purple")}></TouchableOpacity>
                            <TouchableOpacity 
                            style={{...styles.tema, ...{backgroundColor: color.blueBg}, ...tema == "Blue" && styles.temaActive}}
                            onPress={() => setTema("Blue")}></TouchableOpacity>
                            <TouchableOpacity 
                            style={{...styles.tema, ...{backgroundColor: color.orangeBg}, ...tema == "Orange" && styles.temaActive}}
                            onPress={() => setTema("Orange")}></TouchableOpacity>
                            <TouchableOpacity 
                            style={{...styles.tema, ...{backgroundColor: color.redBg}, ...tema == "Red" && styles.temaActive}}
                            onPress={() => setTema("Red")}></TouchableOpacity>
                        </View>
                        {/* date picker */}
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
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