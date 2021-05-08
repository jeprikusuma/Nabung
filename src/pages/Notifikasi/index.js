import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { withTheme } from 'react-native-paper';

import Search from '../Shared/Search';
import Back from '../Shared/Back';
import Pesan from './Pesan';

const Notifikasi = (props) => {
    const { layout } = props.theme;
    const styles = StyleSheet.create({
        semuaPesan: {
            alignSelf: 'stretch',
            marginTop: 25
        },
        search:{
            alignSelf: 'stretch',
            marginTop: 50
        }
    })
    return (
        <View style={layout.container}>
            {/* Back */}
            <Back theme = {props.theme} loc ="Notifikasi" navigation = {props.navigation}/>
            {/* Search */}
            <View style={styles.search}>
                <Search theme = {props.theme} placeholder = "Cari notifikasi"/>
            </View>
            {/* Notifications */}
            <ScrollView style={styles.semuaPesan}>
                <Pesan 
                theme ={props.theme} 
                judul = "Tabungan anda menurun!"
                redaksi = "Penurunan drastis terjadi pada tabungan Anda! Jangan lupa menabung dan kurangi pengeluaran!" 
                icon = "GraphDown"/>
                <Pesan 
                theme ={props.theme} 
                judul = "Rencana dari Bidikmisi Januari!"
                redaksi = "Tabungan telah ditambahkan dengan Rencana Bidikmisi Januari sebesar Rp. 700.000" 
                icon = "Up"/>
                <Pesan 
                theme ={props.theme} 
                judul = "Widya menyukai postingan Anda!"
                redaksi = "Widya telah menyukai postingan yang anda bagikan. Kelola postingan Anda sekarang!" 
                icon = "Like"/>
                <Pesan 
                theme ={props.theme} 
                judul = "Pasek mengomentari postingan Anda!"
                redaksi = "Pasek telah mengomentari postingan yang anda bagikan. Kelola postingan Anda sekarang!" 
                icon = "Comment"/>
            </ScrollView>
        </View>
    )
}
export default withTheme(Notifikasi);