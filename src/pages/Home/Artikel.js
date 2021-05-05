import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, Image} from 'react-native';



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

    return (
        <TouchableOpacity style={styles.artikel} onPress={() => alert("yes")}>
            <Image style={styles.artikelImg} source={props.imgUrl}></Image>
            {/* <View style={{...styles.artikelTitle, ...art ? {zIndex: 0}:{}}}>
                <Text style={text.whiteSubtitle}>{props.title}</Text>
                <Go width="20" height="20" fill="#FAFAFA"/> 
            </View> */}
            <Text style={text.subtitle}>{props.title}</Text>
        </TouchableOpacity>
    )
}


export default Artikel;