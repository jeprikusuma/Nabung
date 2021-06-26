import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { Avatar, withTheme } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { SharedElement } from 'react-navigation-shared-element';

import ToIcon from "react-native-bootstrap-icons/icons/arrow-right-short";
import PenIcon from "react-native-bootstrap-icons/icons/pencil-square";
import ChangeIcon from "react-native-bootstrap-icons/icons/arrow-repeat";

import Back from '../Shared/Back';

// config
import {profileUrl,baseUrl} from '../../config/config';

const Pengaturan = props => {
    const data = props.route.params.data;
    const {color, text, layout} = props.theme;
    const [showAlert, setShowAlert] = useState(false);
    const [loader, setLoader] = useState(false);
    const [newName, setNewName] = useState("");
    const [image, setImage] = useState("");

    const styles = StyleSheet.create({
        profil: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'center',
            marginTop: 50
        },
        name: {
            backgroundColor: 'transparent'
        },
        desc: {
            textAlign: 'center',
            marginTop: 3
        },
        settings:{
            flexDirection: 'column',
            alignSelf: 'stretch',
            marginTop: 30
        },
        setting: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            alignItems: 'center',
            paddingVertical: 10
        },
        nameContainer:{
            flexDirection: 'row',
            alignItems: 'center'
        },
        pen:{
            marginLeft: 10
        },
        img:{
            position: 'relative'
        },
        change:{
            position: 'absolute',
            bottom: 5,
            right: 10,
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 20
        }
    })
    const makeTgl = () => {
        const monthIn = ["Januari", "Februari", "Maret", "April", "Mei",
                        "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const date = new Date(data.register_at)
        return `${date.getDate()} ${monthIn[date.getMonth()]} ${date.getFullYear()}`
    }

    const clearData = async () => {
        try {
          await AsyncStorage.clear()
          setData(null)
        } catch(e) {
          // clear error
        }
    }

    const logoutHandler = () => {
        setShowAlert(false);
        clearData();
        props.navigation.reset({index: 0, routes: [{ name: 'LoginNavigation'}]});
    }

    const renameHandler = () => {
        if(newName != ""){
            setLoader(true);
            fetch(baseUrl+'change/name/'+data.id, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: newName,
                })
            })
            .finally(() => {
                setNewName("");
                setLoader(false);
            })
        }
    }
    const changeProfileHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        })
        if (!result.cancelled) {   
            setLoader(true);      
            const img = {
                uri: result.uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            }
            const formData = new FormData();
            formData.append('file', img);

            fetch(baseUrl + 'change/profile/' + data.id, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .finally(() => {
                setImage(result.uri);
                setLoader(false);
            })
        }
    }

    return (
        <View style={layout.container}>
            {/* Back> */}
            <Back theme = {props.theme} loc ="Pengaturan" navigation = {props.navigation}/>
            {/* Profile */}
            <View style={styles.profil}>
                <TouchableOpacity style={styles.img} onPress={changeProfileHandler}>
                    <SharedElement id={`avatar.img`}>
                        <Avatar.Image size={150} source={{uri: image == "" ? profileUrl + data.profile : image}} />
                    </SharedElement>
                    <View style={styles.change}>
                        <ChangeIcon width="25"height="25" fill={color.primary}/> 
                    </View>
                </TouchableOpacity>
                <View style={{...styles.nameContainer, ...layout.mt1}}>
                    <TextInput 
                        style={{...text.title, ...styles.name}} 
                        defaultValue={data.name}
                        onChangeText = {text => setNewName(text)}
                        onBlur = {renameHandler}
                        />
                    <PenIcon width="15" style={styles.pen} height="15" fill={color.primary}/> 
                </View>
                <Text style={{...text.paragraph, ...styles.desc}}>Terdaftar pada {makeTgl()}</Text>
            </View>
            {/* Settings */}
            <View style={styles.settings}>
                {/* Lapor */}
                <TouchableOpacity style={styles.setting}  onPress={() => props.navigation.navigate('GantiPassword', {id: data.id})}>
                    <Text style={text.subtitle}>Ganti Password</Text>
                    <ToIcon width="23" style={styles.backIcon} height="23" fill={color.primary}/> 
                </TouchableOpacity>
                {/* Privasi */}
                <TouchableOpacity style={styles.setting}>
                    <Text style={text.subtitle}>Privasi</Text>
                    <ToIcon width="23" style={styles.backIcon} height="23" fill={color.primary}/> 
                </TouchableOpacity>
                {/* Tentang */}
                <TouchableOpacity style={styles.setting}>
                    <Text style={text.subtitle}>Tentang</Text>
                    <ToIcon width="23" style={styles.backIcon} height="23" fill={color.primary}/> 
                </TouchableOpacity>
                {/* Keluar */}
                <TouchableOpacity style={styles.setting} onPress = {() => setShowAlert(true)}>
                    <Text style={text.redSubtitle}>Keluar</Text>
                    <ToIcon width="23" style={styles.backIcon} height="23" fill={color.red}/> 
                </TouchableOpacity>
            </View>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Keluar"
                message="Apakah kamu yakin ingin keluar?"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancel"
                confirmText="Logout"
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
                    setShowAlert(false);
                }}
                onConfirmPressed={() => {
                    logoutHandler();
                }}
                titleStyle={text.title}
                messageStyle={text.paragraph}
                confirmButtonTextStyle={text.paragraphWhiteBold}
                cancelButtonTextStyle={text.white}
            />
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
// Pengaturan.sharedElements = () => {
//     return `avatar.img`;
// }
export default withTheme(Pengaturan);