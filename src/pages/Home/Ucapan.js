import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Ucapan = props => {
    const { text} = props.theme;

    const styles = StyleSheet.create({
        ucapan:{
            marginTop: 30,
        }
    });

    return (
        <View style={styles.ucapan}>
            <Text style={text.paragraph}>1 Maret 2021</Text>
            <Text style={text.title}>Selamat Malam</Text>
        </View>
    )
}


export default Ucapan;