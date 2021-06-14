import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { withTheme, Button } from 'react-native-paper';

import Back from '../Shared/Back';
import { abs } from 'react-native-reanimated';

const BuatArtikel = props => {
    const { color, text, layout } = props.theme;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [image, setImage] = useState("");

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
            width: 150,
            height: 150,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color.grey,
            marginVertical: 7
        },
        image:{
            width:150,
            height:150,
            position: 'absolute'
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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        })
        if (!result.cancelled) {
          setImage(result.uri);
        }
    }

    const selectImageHandler = () => {
        pickImage();
    }
    const isImageSelected = () => {
        return image == "" ? <Text style={text.paragraph}>Pilih gambar</Text> : <Image style={styles.image} source={{uri: image}} />;
    }
    return(
        <View>
            {/* Back> */}
            <Back theme = {props.theme} loc ="Buat Artikel" navigation={props.navigation}/>
            <ScrollView>
                <View style={{ ...styles.contain,...layout.container}}>
                    <TouchableOpacity style={styles.selectImage} onPress={() => selectImageHandler()}>
                        {isImageSelected()}
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
                        <Button style={{...styles.button, ...styles.tambah, ...layout.mt1}} labelStyle={{...text.whiteSubtitle, ...styles.buttonLabel}} mode="contained" >
                            Tambah
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View> 
    )
}

export default withTheme(BuatArtikel);