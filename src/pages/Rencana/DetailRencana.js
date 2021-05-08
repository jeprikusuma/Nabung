import React from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity } from 'react-native';
import { withTheme, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import Back from '../Shared/Back';

import Trash from "react-native-bootstrap-icons/icons/trash";
import Editable from "react-native-bootstrap-icons/icons/pencil-square";

const DetailRencana = (props) => {
    const { layout, text, color } = props.theme;
    const windowHeight = Dimensions.get('window').height;
    const data = props.route.params;
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
            bottom: -90
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
            backgroundColor: color.primary,
            flex: 2
        },
        edit:{
            backgroundColor: '#fff',
            borderColor: color.primary
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
    const makeTgl = () => {
        const monthIn = ["Januari", "Februari", "Maret", "April", "Mei",
                        "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const date = new Date(data.tgl)
        return `${date.getDate()} ${monthIn[date.getMonth()]} ${date.getFullYear()}`
    }
    const getBg = () => {
        let tema = data.tema;
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
        let tema = data.tema;
        if(tema == "Red"){
            return color.red;
        }else if(tema == "Blue"){
            return color.blue;
        }else{
            return "#fff";
        }
    }
    const getContentColor = () => {
        let tema = data.tema;
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
    const makeParagraph = str => {
        str = str.split("&&n&&");
        return str.map((data, i) => <Text style={{...text.primaryParagraph, ...styles.paragraph, ...{color: getContentColor()}}} key={i}>{data}</Text>)
    }
    return (
        <View >
            <StatusBar backgroundColor={getBg()}/>
            {/* Back */}
            <Back theme = {props.theme} loc ="Detail Rencana"/>
            {/* Time */}
            <View style={{...styles.header, ...{backgroundColor: getBg()}}}>
                <Text style={{...text.superTitle, ...layout.mt1, ...{color: getColor()}}}>
                    {makeTgl()}
                </Text>
                <Text style={{...text.primaryParagraph, ...{color: getColor()}}}>
                    {data.redaksi}
                </Text>
            </View>
            {/* Rencana */}
            <ScrollView style={styles.content}>
                <Text style={{...text.title, ...layout.mb1, ...{color: getContentColor()}}}>{data.judul}</Text>
                <View style={{ ...styles.blank}}>
                    {makeParagraph(data.des)}
                </View>
            </ScrollView>
            {/* Bot */}
            <View style={styles.bot}>
                <Button style={{...styles.button, ...styles.selesai}} labelStyle={{...text.whiteSubtitle, ...styles.buttonLabel}} mode="contained">
                                Selesai
                </Button>
                <TouchableOpacity style={{...styles.buttonView, ...styles.edit, ...layout.mr1}}>
                    <Editable width="18" height="18" fill={color.primary}/>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.buttonView, ...styles.delete, ...layout.mr1}}>
                    <Trash width="18" height="18" fill={color.red}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default withTheme(DetailRencana);