import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'react-native-image-crop-picker';
import { withTheme, Button } from 'react-native-paper';

import Back from '../Shared/Back';

const BuatArtikel = props => {
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
        selectImage: {
            width: 120,
            height: 150,
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color.grey,
            marginVertical: 7
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
    const selectImageHandler = () => {
        console.log(ImagePicker)
    }
    return(
        <View>
            {/* Back> */}
            <Back theme = {props.theme} loc ="Buat Artikel"/>
            <ScrollView>
                <View style={{ ...styles.contain,...layout.container}}>
                    <TouchableOpacity style={styles.selectImage}>
                        <Text style={text.paragraph}>Pilih gambar</Text>
                    </TouchableOpacity>
                    <View style={styles.form}>
                        <TextInput style={styles.input}
                            placeholder="Judul Artikel"
                            placeholderTextColor= {color.secondary}
                        />
                        <TextInput style={{...styles.input, ...styles.desc}}
                            placeholder="Deskripsi"
                            placeholderTextColor= {color.secondary}
                            multiline = {true}
                        />
                    </View>
                    <View style={styles.bot}>
                        <Button style={{...styles.button, ...styles.tambah, ...layout.mt1}} labelStyle={{...text.whiteSubtitle, ...styles.buttonLabel}} mode="contained" onPress={() => selectImageHandler()}>
                            Tambah
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View> 
    )
}

export default withTheme(BuatArtikel);