import React, {useState} from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity } from 'react-native';
import { withTheme, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import AwesomeAlert from 'react-native-awesome-alerts';

import Back from '../Shared/Back';

import Trash from "react-native-bootstrap-icons/icons/trash";
import Editable from "react-native-bootstrap-icons/icons/pencil-square";

import {baseUrl} from '../../config/config';

const DetailRencana = (props) => {
    const { layout, text, color } = props.theme;
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const data = props.route.params;
    const [loader, setLoader] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [transAlert, setTransAlert] = useState(false);

    const makeTgl = () => {
        const monthIn = ["Januari", "Februari", "Maret", "April", "Mei",
                        "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const date = new Date(data.date)
        return `${date.getDate()} ${monthIn[date.getMonth()]} ${date.getFullYear()}`
    }

    const formatRp = saving => {
        const text = String(saving);
        let rest = "";
        let a = 1;
        for(i = text.length - 1 ; i >= 0 ; i--){
            a % 3 == 0 && a != text.length ? rest = '.' + text[i] + rest : rest = text[i] + rest ;
            a++;
        }
        return `Rp. ${rest}`
    }

    const getBg = () => {
        let tema = data.theme;
        if(tema == "Red"){
            return color.redBg;
        }else if(tema == "Blue"){
            return color.blueBg;
        }else if(tema == "Orange"){
            return color.orangeBg;
        }else{
            return color.secondary;
        }
    }
    const getColor = () => {
        let tema = data.theme;
        if(tema == "Red"){
            return color.red;
        }else if(tema == "Blue"){
            return color.blue;
        }else{
            return "#fff";
        }
    }
    const getContentColor = () => {
        let tema = data.theme;
        if(tema == "Red"){
            return color.red;
        }else if(tema == "Blue"){
            return color.blue;
        }else if(tema == "Orange"){
            return color.orange;
        }else{
            return color.secondary;
        }
    }

    const getButtonColor = () => {
        let tema = data.theme;
        if(tema == "Red"){
            return color.red;
        }else if(tema == "Blue"){
            return color.blue;
        }else if(tema == "Orange"){
            return color.orangeBg;
        }else{
            return color.secondary;
        }
    }

    const makeParagraph = str => {
        str = str.split("&&n&&");
        return str.map((data, i) => <Text style={{...text.primaryParagraph, ...styles.paragraph, ...{color: getContentColor()}}} key={i}>{data}</Text>)
    }

    const doneHandler = (isAdd) => {
        setTransAlert(false);
        setTimeout(() => {
            setLoader(true);
            if(isAdd){
                fetch(baseUrl+'transaction/add/'+data.user, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        title: data.title,
                        nominal: data.nominal,
                        status: data.status
                    })
                })
            }
            
            fetch(`${baseUrl}plan/${data._id}`, {method: 'patch'})
            .then(() => {
                setLoader(false);
                setTimeout(() => {
                    props.navigation.goBack();
                    data.reload(true);
                    data.reloadHome && data.reloadHome(true);
                },300)
            })

        },300)
    }
    
    const editHandler = () => {
        props.navigation.goBack();
        props.navigation.push('TambahRencana', {...{data: data}, ...{reload: data.reload, reloadHome: data.reloadHome}});
    }

    const deleteHandler = () => {
        setDeleteAlert(false);
        setTimeout(() => {
            setLoader(true);
            fetch(`${baseUrl}plan/${data._id}`, {method: 'delete'})
            .then(() => {
                setLoader(false);
                setTimeout(() => {
                    props.navigation.goBack();
                    data.reload(true);
                    data.reloadHome && data.reloadHome(true);
                },300)
            })
        },300)
    }

    const styles = StyleSheet.create({
        semuaPesan: {
            alignSelf: 'stretch',
            marginTop: 25
        },
        search:{
            alignSelf: 'stretch',
            marginTop: 50
        },
        header:{
            alignSelf: 'stretch',
            paddingVertical: 90,
            backgroundColor: color.secondary,
            justifyContent: 'center',
            alignItems: 'center'
        },
        contentContainer:{
            position: 'relative',
            height: windowHeight-200,
        },
        content:{
            paddingTop: 20,
            paddingBottom: 40,
            paddingRight: 20,
            paddingLeft: 20,
            height: windowHeight-300, 
        },
        bot:{
            alignSelf: 'stretch',
            marginTop: 20,
            marginBottom: 20,
            paddingHorizontal: 20,
            flexDirection: 'row-reverse',
            position: 'absolute',
            bottom: -90,
            justifyContent: 'flex-start',
            width: windowWidth
        },
        buttonView:{
            borderRadius: 13,
            justifyContent: 'center',
            padding: 16,
            borderWidth: 1
        },
        button:{
            borderRadius: 13,
            justifyContent: 'center'
        },
        selesai:{
            backgroundColor: getButtonColor(),
            flex: 2
        },
        edit:{
            backgroundColor: '#fff',
            borderColor: getButtonColor()
        },
        delete:{
            backgroundColor: '#fff',
            borderColor: color.red
        },
        buttonLabel:{
            textTransform: 'capitalize',
            paddingVertical: 9
        },
        paragraph: {
            marginBottom: 5,
        },
        blank: {
            marginBottom: 50
        }
    })
    
    return (
        <View >
            <StatusBar backgroundColor={getBg()}/>
            {/* Back */}
            <Back theme = {props.theme} loc ="Detail Rencana" navigation={props.navigation} color={getColor()}/>
            {/* Time */}
            <View style={{...styles.header, ...{backgroundColor: getBg()}}}>
                <Text style={{...text.superTitle, ...layout.mt1, ...{color: getColor()}}}>
                    {makeTgl()}
                </Text>
                <Text style={{...text.primaryParagraph, ...{color: getColor()}}}>
                {`${data.status == 'Up' ? 'Pemasukan' : 'Pengeluaran'} yang direncanakan sebesar ${formatRp(data.nominal)}`}
                </Text>
            </View>
                {/* Rencana */}
                <ScrollView style={styles.content}>
                    <Text style={{...text.title, ...layout.mb1, ...{color: getContentColor()}}}>{data.title}</Text>
                    <View style={{ ...styles.blank}}>
                        {makeParagraph(data.content)}
                    </View>
                </ScrollView>
                {/* Bot */}
                <View style={styles.bot}>
                    {data.isDone == 0 && (
                        <>
                            <Button style={{...styles.button, ...styles.selesai}} labelStyle={{...text.whiteSubtitle, ...styles.buttonLabel}} onPress ={() => setTransAlert(true)} mode="contained">
                                            Selesai
                            </Button>
                            <TouchableOpacity style={{...styles.buttonView, ...styles.edit, ...layout.mr1}} onPress={editHandler}>
                                <Editable width="18" height="18" fill={getButtonColor()}/>
                            </TouchableOpacity>
                        </>
                    )}
                    <TouchableOpacity style={{...styles.buttonView, ...styles.delete, ...layout.mr1}} onPress={() => setDeleteAlert(true)}>
                        <Trash width="18" height="18" fill={color.red}/>
                    </TouchableOpacity>
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
                    show={deleteAlert}
                    showProgress={false}
                    title="Hapus Rencana"
                    message="Apakah kamu yakin ingin menghapus rencana ini?"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Tidak"
                    confirmText="Hapus"
                    confirmButtonColor="#DD6B55"
                    contentContainerStyle={{
                        width: '80%',
                        alignItems: 'center'
                    }}
                    actionContainerStyle={{
                        justifyContent:'space-between',
                        width: '60%',
                        marginTop: 12
                    }}
                    overlayStyle={{
                        height: '100%'
                    }}
                    onCancelPressed={() => {
                        setDeleteAlert(false);
                    }}
                    onConfirmPressed={() => {
                        deleteHandler();
                    }}
                    titleStyle={text.title}
                    messageStyle={text.paragraph}
                    confirmButtonTextStyle={text.paragraphWhiteBold}
                    cancelButtonTextStyle={text.white}
                />
                <AwesomeAlert
                    show={transAlert}
                    showProgress={false}
                    title="Tambah Tabungan"
                    message="Apakah kamu ingin menambahkan uang dari rencana ke tabungan?"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Tidak"
                    confirmText="Tambah"
                    confirmButtonColor={color.primary}
                    contentContainerStyle={{
                        width: '80%',
                        alignItems: 'center'
                    }}
                    actionContainerStyle={{
                        justifyContent:'space-between',
                        width: '60%',
                        marginTop: 12
                    }}
                    overlayStyle={{
                        height: '100%'
                    }}
                    onCancelPressed={() => {
                        doneHandler(false);
                    }}
                    onConfirmPressed={() => {
                        doneHandler(true);
                    }}
                    titleStyle={text.title}
                    messageStyle={text.paragraph}
                    confirmButtonTextStyle={text.paragraphWhiteBold}
                    cancelButtonTextStyle={text.white}
                />
        </View>
    )
}
export default withTheme(DetailRencana);