import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import { withTheme, Button } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AwesomeAlert from 'react-native-awesome-alerts';


import Back from '../Shared/Back';

import Chevron from "react-native-bootstrap-icons/icons/chevron-down";
import Calendar from "react-native-bootstrap-icons/icons/calendar";
import {baseUrl} from '../../config/config'
const TambahRencana = props => {
    let menu;
    const data = props.route.params.data;
    const isEdit = data != undefined;
    // state
    const [status, setStatus] = useState(isEdit ? data.status == 'Up'?'Pemasukan':'Pengeluaran':'Pemasukan');
    const [title, setTitle] = useState(isEdit ? data.title :'');
    const [nominal, setNominal] = useState(isEdit ? data.nominal :0);
    const [content, setContent] = useState(isEdit ? data.content :'');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [showDate, setShowDate] = useState(isEdit ? data.date :"Jadwal");
    const [date, setDate] = useState(isEdit ? data.date :0);
    const [tema, setTema] = useState(isEdit ? data.theme :"Purple");
    const [loader, setLoader] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    
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
        nav:{
            backgroundColor: `rgba(255, 255, 255, 1)`, 
            zIndex: 9999, 
            width: windowWidth, 
            height: 80, 
            position: 'absolute',
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
    const checkDate= () => {
        return showDate != "Jadwal" ? text.primaryParagraph : text.paragraph;
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    }
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }
    
    const handleConfirm = (tgl) => {
        setDate(tgl);

        let show = `${tgl.getDate()}-${tgl.getMonth()+1}-${tgl.getFullYear()}`;
        setShowDate(show);
        setDatePickerVisibility(false);
        
    }

    const addRencanaHandler = () => {
        if(
            date != 0 &&
            title != '' &&
            nominal != 0 &&
            content != '' &&
            Number.isInteger(parseInt(nominal))
        ){
            setLoader(true);
            const planData = {
                title: title,
                content: content,
                nominal: parseInt(nominal),
                status: status == 'Pemasukan' ? 'Up' : 'Down',
                date: date,
                theme: tema
            }
            const getParams = isEdit ? data._id : props.route.params.id;

            fetch(baseUrl+'plan/'+getParams, {
                method: isEdit ? 'PUT':'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(planData)
            })
            .finally(() => {
                setLoader(false);
                setTimeout(() => {
                    props.navigation.goBack();
                    props.route.params.reload(true);
                    props.route.params.reloadHome && props.route.params.reloadHome(true);
                },300)
            });
        }else{
            setErrAlert(true);
        }
    }

    return(
        <View>
            {/* Back> */}
            <View style={styles.nav}>
                <Back theme = {props.theme} loc ={`${isEdit ? 'Edit': 'Tambah'} Rencana`} navigation = {props.navigation}/>
            </View>
            <ScrollView>
                <View style={{ ...styles.contain,...layout.container}}>
                    <View style={styles.form}>
                        {/* nama rencana */}
                        <TextInput style={styles.input}
                            placeholder="Nama rencana"
                            placeholderTextColor= {color.secondary}
                            onChangeText = {text => setTitle(text)}
                            defaultValue = {isEdit ? data.title :''}
                        />
                        {/* anggaran biaya */}
                        <TextInput style={styles.input}
                            placeholder="Anggaran biaya"
                            placeholderTextColor= {color.secondary}
                            onChangeText = {text => setNominal(text)}
                            defaultValue = {isEdit ? String(data.nominal) :''}
                        />
                        {/* jadwal */}
                        <TouchableOpacity style={styles.select} onPress={showDatePicker}>
                            <Text style={checkDate()}>{showDate}</Text>
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
                            onChangeText = {text => setContent(text)}
                            defaultValue = {isEdit ? data.content :''}
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
                        <Button style={{...styles.button, ...styles.tambah, ...layout.mt1}} labelStyle={{...text.whiteSubtitle, ...styles.buttonLabel}} mode="contained" onPress={addRencanaHandler}>
                            {isEdit ? 'Edit': 'Tambah'}
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
                show={errAlert}
                showProgress={false}
                title="Data Tidak Valid"
                message="Lengkapi semua kolom dengan data yang sesuai!"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                showCancelButton={false}
                confirmText="Okay"
                confirmButtonColor={color.primary}
                contentContainerStyle={{
                    width: '80%',
                    alignItems: 'center'
                }}
                actionContainerStyle={{
                    justifyContent:'center',
                    width: '60%',
                    marginTop: 12
                }}
                overlayStyle={{
                    height: '100%'
                }}
                onConfirmPressed={() => {
                    setErrAlert(false);
                }}
                titleStyle={text.title}
                messageStyle={text.paragraph}
                confirmButtonTextStyle={text.paragraphWhiteBold}
                cancelButtonTextStyle={text.white}
                />           
        </View> 
    )
}

export default withTheme(TambahRencana);