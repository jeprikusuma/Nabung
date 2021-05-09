import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Avatar, withTheme } from 'react-native-paper';
import ToIcon from "react-native-bootstrap-icons/icons/arrow-right-short";
import Back from '../Shared/Back';

const Pengaturan = props => {
    const data = props.route.params;
    const {color, text, layout} = props.theme;
    const styles = StyleSheet.create({
        profil: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'center',
            marginTop: 50
        },
        name: {
            textAlign: 'center'
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
        }
    })
    const makeTgl = () => {
        const monthIn = ["Januari", "Februari", "Maret", "April", "Mei",
                        "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const date = new Date(data.register_at)
        return `${date.getDate()} ${monthIn[date.getMonth()]} ${date.getFullYear()}`
    }
    return (
        <View style={layout.container}>
            {/* Back> */}
            <Back theme = {props.theme} loc ="Pengaturan" navigation = {props.navigation}/>
            {/* Profile */}
            <View style={styles.profil}>
                <Avatar.Image size={150} source={{uri: "http://47.254.194.71/nabung_api/public/img/user/profile/" + data.profil}} />
                <Text style={{...text.title, ...styles.name, ...layout.mt1}}>{data.name}</Text>
                <Text style={{...text.paragraph, ...styles.desc}}>Terdaftar pada {makeTgl()}</Text>
            </View>
            {/* Settings */}
            <View style={styles.settings}>
                {/* profil */}
                <TouchableOpacity style={styles.setting}>
                    <Text style={text.subtitle}>Profil</Text>
                    <ToIcon width="23" style={styles.backIcon} height="23" fill={color.primary}/> 
                </TouchableOpacity>
                {/* Notifikasi */}
                <TouchableOpacity style={styles.setting}>
                    <Text style={text.subtitle}>Notifikasi</Text>
                    <ToIcon width="23" style={styles.backIcon} height="23" fill={color.primary}/> 
                </TouchableOpacity>
                {/* Lapor */}
                <TouchableOpacity style={styles.setting}>
                    <Text style={text.subtitle}>Lapor</Text>
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
                <TouchableOpacity style={styles.setting}>
                    <Text style={text.redSubtitle}>Keluar</Text>
                    <ToIcon width="23" style={styles.backIcon} height="23" fill={color.red}/> 
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default withTheme(Pengaturan);