import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';


const Artikel = props => {
    const { text} = props.theme;

    const styles = StyleSheet.create({
        artikel:{
            width: 100,
            marginRight: 15,
            position: 'relative'
        },
        artikelImg:{
            borderRadius: 16,
            marginBottom: 5,
            width: 100,
            height: 110,
            resizeMode: 'cover'
        },
    });
    const getName = () => {
        let title = props.data.title;
        return title.length > 20 ? title.substring(0, 20) + '...' : title;
    }
    return (
        <TouchableOpacity style={styles.artikel} onPress={() => props.navigation.push('DetailArtikel', props.data)}>
            <SharedElement id={`artikel.${props.id}.img`}>
                <Image style={styles.artikelImg} source={{uri: "http://192.168.43.60/nabung_api/public/img/user/artikel/" + props.data.img}}></Image>
            </SharedElement>
            <Text style={text.subtitle}>{getName()}</Text>
        </TouchableOpacity>
    )
}


export default Artikel;