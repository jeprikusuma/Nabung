import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, withTheme, Button } from 'react-native-paper';

import NotifIcon from "react-native-bootstrap-icons/icons/bell-fill";
import GoIcon from "react-native-bootstrap-icons/icons/arrow-right-short";


// Components
import Ucapan from './Ucapan'
import Tabungan from './Tabungan';
import Grafik from './Grafik';
import Artikel from './Artikel';
import ListRencana from '../Rencana/ListRencana'

const Home = (props) => {
    const { color, text, layout } = props.theme;

    const artikels = [
        {  
            id: 11,           
            title: "Belajar bisnis ala Film Startup",
            img: require('../../assets/img/user/artikel/1.png'),
            date: "2021-03-12",
            user: "Mbak Lisa",
            like: [1,],
            saved: [1,3, 4],
            comment: [{from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Jepri Kusuma", comment: "Mantapp"}],
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            
        },
        {  
            id: 12,           
            title: "Manajemen Kesibukan ala Mbak Lisa Blackpink",
            img: require('../../assets/img/user/artikel/2.jpg'),
            date: "2021-04-02",
            user: "Mbak Lisa",
            like: [1, 2, 3, 4, 19, 5, 9],
            saved: [3, 4],
            comment: [{from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Rio Ariawan", comment: "Bagus banget"},{from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Jepri Kusuma", comment: "Mantapp"}],
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {  
            id: 13,           
            title: "Definisi kesuksesan menurut Pendiri Microsoft: Bill Gates",
            img: require('../../assets/img/user/artikel/3.jpg'),
            date: "2021-05-10",
            user: "Jepri Kusuma",
            like: [1, 2],
            saved: [1, 3, 4],
            comment: [{from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Jepri Kusuma", comment: "Mantapp"}],
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {  
            id: 14,           
            title: "Sudut pandang uang dari orang terkaya di Dunia",
            img: require('../../assets/img/user/artikel/4.png'),
            date: "2021-05-12",
            user: "Jepri Kusuma",
            like: [1, 2, 3],
            saved: [ 3, 4],
            comment: [{from: "Jepri Kusuma", comment: "Mantapp"}],
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
    ]
    const dataRencana = [
        {
            judul : "Acara keluarga",
            redaksi : "Pengeluaran yang direncanakan sebesar Rp. 100.000" ,
            tema : "Purple",
            tgl : "2021-04-01",
            des : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&&n&&Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesett"
        },
        {
            judul : "Uang Bidikmisi cair 2 bulan",
            redaksi : "Pemasukan yang direncanakan sebesar Rp. 1.400.000",
            tema : "Blue",
            tgl : "2021-03-02",
            des : "Lorem Ipsum is hen an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&&n&&Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesett"
        },
        {
            judul : "Uang untuk kegiatan KKN",
            redaksi : "Pengeluaran yang direncanakan sebesar Rp. 500.000", 
            tema : "Orange",
            tgl : "2021-06-28",
            des : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&&n&&Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesett"

        }
    ]

    const styles = StyleSheet.create({
        header:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            alignItems: 'center',
        },
        body:{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'stretch',
        },
        profile:{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1
        },
        
        area:{
            alignSelf: 'stretch',
            marginTop: 20
        },
        lainnya:{
            flexDirection: 'row',
            textAlign:'center',
            justifyContent: 'space-between',
            alignSelf:'stretch'
        },
        rencana:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            alignItems: 'flex-start',
        },  
        rencanaTgl:{
            width: 60,
            height: 60,
            backgroundColor: color.secondary,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center'
        },
        rencanaIsi:{
            flex: 1
        },
        rencanaLainnya:{
            backgroundColor: color.grey,
            borderRadius: 15,
            marginTop: 5,
            
        },
        rencanaLainnyaLabel:{
            textTransform: 'capitalize',
            paddingTop: 6,
            paddingBottom: 6,
        },
        artikel:{
            width: 100,
            marginRight: 15,
            position: 'relative'
        },
        artikelArea: {
            borderRadius: 16,
            marginBottom: 5,
            width: 100,
            height: 110,
            backgroundColor: color.primary,
            justifyContent: 'center',
            alignItems:'center'
        }
      });
    
    const listArtikel = () => {
        return artikels.map((data, i) => {
            return(
                <Artikel key={i} theme={props.theme} data = {data} navigation={props.navigation}/>
            )
        })
    }
    const listRencana = () => {
        return dataRencana.map((data, i) => {
            return(
                <ListRencana theme ={props.theme} data={data} key = {i} navigation = {props.navigation}/>
            )
        })
    }
    return (
        <ScrollView>
            <View style={layout.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.profile} onPress ={() => props.navigation.navigate('Pengaturan')}>
                        <Avatar.Image size={40} source={require('../../assets/img/user/profile/1.jpg')} />
                        <Text style={{...text.subtitle, ...layout.ml1}}>Jepri Kusuma </Text>
                    </TouchableOpacity>            
                    <TouchableOpacity style={styles.notif} onPress={() =>props.navigation.navigate('Notifikasi')}>
                        <NotifIcon width="23" style={{flex: 1}} height="23" fill={color.secondary} /> 
                    </TouchableOpacity>            
                </View>
                <View style={styles.body}>
                    {/* Ucapan */}
                    <Ucapan theme={props.theme}/>
                    {/* Tabungan */}
                    <Tabungan theme={props.theme} navigation={props.navigation}/>
                    {/* Grafik */}
                    <Grafik theme={props.theme}/>
                    {/* Artikel */}
                    <View style={styles.area}>
                        <View style={{...styles.lainnya, ...layout.mb1}}>
                            <Text style={text.subtitle}>Artikel Baru</Text>
                        </View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} disableIntervalMomentum = {true}>
                            {listArtikel()}
                            <TouchableOpacity style={styles.artikel} onPress={() => props.navigation.navigate('ArtikelNavigation')}>
                                <View style={styles.artikelArea}>
                                    <GoIcon width="35" style={styles.backIcon} height="35" fill="#fff"/>
                                </View>
                                <Text style={text.subtitle}>Lihat Artikel lainnya</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    {/* Rencana */}
                    <View style={styles.area}>
                        <View style={{...styles.lainnya, ...layout.mb1}}>
                            <Text style={text.subtitle}>Rencana Anda</Text>
                        </View>
                        {listRencana()}
                        <Button style={{...styles.rencanaLainnya}} labelStyle={{...text.subtitle, ...styles.rencanaLainnyaLabel}} onPress={() => props.navigation.navigate('RencanaNavigation')}>
                                Atur rencana
                        </Button>
                    </View>
                    
                </View>
            </View>
        </ScrollView>
    );
}

  export default withTheme(Home);