import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-paper';

const Tabungan = props => {
    const {layout, color, text} = props.theme;

    const styles = StyleSheet.create({
        tabungan:{
            backgroundColor: color.secondary,
            alignSelf: 'stretch',
            flexDirection: 'column',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 18,
        },
        kelola:{
            alignSelf: 'flex-start',
            backgroundColor: color.primary,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,
            elevation: 24
        },
        kelolaLabel:{
            textTransform: 'capitalize',
            paddingLeft: 20,
            paddingRight: 20,
        }
    });

    return (
        <View style={styles.area} >
            <Text style={{...text.subtitle, ...layout.mb1, ...layout.mt1}}>Tabungan</Text>
            <View style={styles.tabungan}>
                <Text style={text.whiteSuperTitle}>Rp.140.000,-</Text>
                <Text style={text.whiteParagraph}>Pengeluaran terakhir 5 hari yang lalu sebesar Rp. 110.000,-</Text>
                <Button style={{...styles.kelola, ...layout.mt1}} labelStyle={{...text.whiteSubtitle, ...styles.kelolaLabel}} mode="contained" onPress={() => props.navigation.navigate('Tabungan')}>
                    Kelola
                </Button>
            </View>
        </View>
    )
}


export default Tabungan;