import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, withTheme } from 'react-native-paper';
import NotifIcon from "react-native-bootstrap-icons/icons/bell-fill";

// Components
import Ucapan from './Ucapan'
import Tabungan from './Tabungan';
import Grafik from './Grafik';
import Artikel from './Artikel';
import Rencana from './Rencana';

const Home = (props) => {
    const { color, text, layout } = props.theme;

    const artikels = [
        {
            title: 'Judul Atikel nomor 1', 
            link: require('../../assets/img/user/artikel/1.png')
        },
        {
            title: 'Judul Atikel nomor 2', 
            link: require('../../assets/img/user/artikel/2.jpg')
        },
        {
            title: 'Judul Atikel nomor 3', 
            link: require('../../assets/img/user/artikel/3.jpg')
        },
        {
            title: 'Judul Atikel nomor 4', 
            link: require('../../assets/img/user/artikel/4.png')
        },
        {
            title: 'Judul Atikel nomor 5', 
            link: require('../../assets/img/user/artikel/5.png')
        },
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
      });
    
    const listArtikel = () => {
        return artikels.map((data, i) => {
            return(
                <Artikel key={i} theme={props.theme} title={data.title} imgUrl={data.link}/>
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
                            <Text style={text.subtitle}>Artikel</Text>
                        </View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} disableIntervalMomentum = {true}>
                            {listArtikel()}
                        </ScrollView>
                    </View>
                    {/* Rencana */}
                    <Rencana theme={props.theme} navigation={props.navigation}/>
                    
                </View>
            </View>
        </ScrollView>
    );
}

  export default withTheme(Home);