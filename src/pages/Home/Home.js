import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, withTheme, Button } from 'react-native-paper';

import NotifIcon from "react-native-bootstrap-icons/icons/bell-fill";
import GoIcon from "react-native-bootstrap-icons/icons/arrow-right-short";

// Components
import Loading from '../Loading';
import Ucapan from './Ucapan';
import Tabungan from './Tabungan';
import Grafik from './Grafik';
import Artikel from './Artikel';
import ListRencana from '../Rencana/ListRencana'

const Home = (props) => {
    const { color, text, layout } = props.theme;
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState({}) ;
    const [artikels, setArtikels] = useState([]) ;
    const [rencanas, setRencanas] = useState([]) ;

    const fetchData = async () => {
        await fetch('http://47.254.194.71/nabung_api/public/API/getUser/1')
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(e => console.log(e))

        await fetch('http://47.254.194.71/nabung_api/public/API/newArtikels/')
        .then(res => res.json())
        .then(data => setArtikels(data))
        .catch(e => console.log(e))

        await fetch('http://47.254.194.71/nabung_api/public/API/newRencana/1')
        .then(res => res.json())
        .then(data => setRencanas(data))
        .catch(e => console.log(e))
        .finally(() => setLoading(false))
    }

    useEffect(() =>{
        fetchData();
    }, [])

    if(isLoading){
        return <Loading/>
    }

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
        return rencanas.map((data, i) => {
            return(
                <ListRencana theme ={props.theme} data={data} key = {i} navigation = {props.navigation}/>
            )
        })
    }
    return (
        <ScrollView>
            <View style={layout.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.profile} onPress ={() => props.navigation.push('Pengaturan', user)}>
                        <Avatar.Image size={40} source={{uri: "http://47.254.194.71/nabung_api/public/img/user/profile/" + user.profil}} />
                        <Text style={{...text.subtitle, ...layout.ml1}}>{user.name}</Text>
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