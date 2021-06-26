import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';

import {articleUrl} from '../../config/config';
const Artikel = props => {
    const {text} = props.theme;
    const [isPress, setIsPress] = useState(false);

    const styles = StyleSheet.create({
        artikel:{
            width: 100,
            marginRight: 15,
            position: 'relative'
        },
        artikelImg:{
            borderRadius: 16,
            width: 100,
            height: 110,
            resizeMode: 'cover'
        },
        imageLoading:{
            backgroundColor: '#C1BEDF',
            borderRadius: 16,
            width: 100,
            height: 110,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        },
        discoverImage:{
            borderRadius: 16,
            marginBottom: 5,
            width: 100,
            height: 110,
            position: 'relative'
        },
        loader: {
            position: 'absolute',
            width: 50,
            height: 50,
            margin: 'auto',
            top: 30,
            left: 25,
        },
    });
    const getName = () => {
        let title = props.data.title;
        return title.length > 20 ? title.substring(0, 20) + '...' : title;
    }
    return (
        <TouchableOpacity style={styles.artikel} onPress={() => props.navigation.push('DetailArtikel', props.data)} onPressIn={() => setIsPress(true)} onPressOut={() => setIsPress(false)}>
            <View style={styles.discoverImage}>
                <View style={styles.imageLoading}>
                    {!isPress && (
                        <Image style={styles.loader} source={require('../../assets/img/system/loader.gif')}></Image>
                    )}
                    <Image style={styles.artikelImg} source={{uri: articleUrl + props.data.img}}></Image>
                </View>
            </View>
            <Text style={text.subtitle}>{getName()}</Text>
        </TouchableOpacity>
    )
}


export default Artikel;