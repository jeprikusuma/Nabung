import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { withTheme, Button } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';

import Back from '../Shared/Back';

import {articleUrl,baseUrl} from '../../config/config';

const BuatArtikel = props => {
    const data = props.route.params.data;
    const isEdit = data != undefined;
    const { color, text, layout } = props.theme;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [image, setImage] = useState(isEdit ? data.img : "");
    const [title, setTitle] = useState(isEdit ? data.title : "");
    const [content, setContent] = useState(isEdit ? data.content : "");
    const [loader, setLoader] = useState(false);
    const [errAlert, setErrAlert] = useState(false);

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
            height: 250,
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
        return image == "" ? <Text style={text.paragraph}>Pilih gambar</Text> : <Image style={styles.image} source={{uri: isEdit ? articleUrl + image : image}} />;
    }

    const addHandler = () => {
        if(
            title != '' &&
            image != '' &&
            content != ''
        ){
            setLoader(true);
            if(isEdit){
                fetch(baseUrl + 'article/' + data._id, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        title: title,
                        content: content,
                    })
                })
                .finally(() => {
                    props.navigation.goBack();
                    setLoader(false);
                    data.reload(true);
                })
            }else{
                const img = {
                    uri: image,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                }
                const formData = new FormData();
                formData.append('file', img);
                formData.append('title', title);
                formData.append('content', content);
                formData.append('username', props.route.params.name);
                console.log(formData)
                fetch(baseUrl + 'article/' + props.route.params.id, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .finally(() => {
                    props.navigation.goBack();
                    setLoader(false);
                    props.route.params.reload(true);
                })
            }
        }
    }

    return(
        <View>
            {/* Back> */}
            <Back theme = {props.theme} loc ={`${isEdit ? "Edit" : "Buat"} Artikel`} navigation={props.navigation}/>
            <ScrollView>
                <View style={{ ...styles.contain,...layout.container}}>
                    <TouchableOpacity disabled={isEdit} style={styles.selectImage} onPress={() => selectImageHandler()}>
                        {isImageSelected()}
                    </TouchableOpacity>
                    <View style={styles.form}>
                        <TextInput style={styles.input}
                            placeholder="Judul Artikel"
                            placeholderTextColor= {color.secondary}
                            onChangeText={text => setTitle(text)}
                            defaultValue = {isEdit ? data.title :''}
                        />
                        <TextInput style={{...styles.input, ...styles.desc}}
                            placeholder="Deskripsi"
                            placeholderTextColor= {color.secondary}
                            multiline = {true}
                            onChangeText={text => setContent(text)}
                            defaultValue = {isEdit ? data.content :''}
                        />
                    </View>
                    <View style={styles.bot}>
                        <Button style={{...styles.button, ...styles.tambah, ...layout.mt1}} labelStyle={{...text.whiteSubtitle, ...styles.buttonLabel}} mode="contained" onPress={addHandler}>
                        {`${isEdit ? "Edit" : "Buat"}`}
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

export default withTheme(BuatArtikel);