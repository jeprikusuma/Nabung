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
        blank: {
            marginBottom: 50
        }
    })
    return (
        <View >
            <StatusBar backgroundColor={color.secondary}/>
            {/* Back */}
            <Back theme = {props.theme} loc ="Detail Rencana"/>
            {/* Time */}
            <View style={styles.header}>
                <Text style={{...text.superTitle, ...layout.mt1, ...{color: '#fff'}}}>
                    1 April 2021
                </Text>
                <Text style={{...text.primaryParagraph, ...{color: '#fff'}}}>
                    Total biaya Rp. 100.000
                </Text>
            </View>
            {/* Rencana */}
            <ScrollView style={styles.content}>
                <Text style={{...text.title, ...layout.mb1}}>Acara Keluarga</Text>
                <Text style={{...text.paragraph, ...styles.blank}}>
                    {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    `}
                </Text>
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