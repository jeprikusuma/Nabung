import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import More from "react-native-bootstrap-icons/icons/three-dots-vertical";


const Rencana = props => {
    const {color, text, layout} = props.theme;
    const styles = StyleSheet.create({
        area:{
            alignSelf: 'stretch',
            marginTop: 20
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
    
    return (
        <View style={styles.area}>
                        <View style={{...styles.lainnya, ...layout.mb1}}>
                            <Text style={text.subtitle}>Rencana</Text>
                        </View>
                        <View>
                            <View style={{...styles.rencana, ...layout.mb1}}>
                                <View style={{...styles.rencanaTgl, ...layout.mr1, ...{backgroundColor: '#DEF0FC'}}}>
                                    <Text style={text.blueSubtitle}>Apr</Text>
                                    <Text style={text.blueParagraph}>2021</Text>
                                </View>
                                <View style={styles.rencanaIsi}>
                                    <Text style={text.subtitle}>Acara keluarga</Text>
                                    <Text style={text.paragraph}>Pengeluaran uang yang direncanakan sebesar Rp. 100.000</Text>
                                </View>
                                <View>
                                    <More width="20" height="20" fill="#B7B1E2"/> 
                                </View>
                            </View>
                            <View style={{...styles.rencana, ...layout.mb1}}>
                                <View style={{...styles.rencanaTgl, ...layout.mr1, ...{backgroundColor: '#FFC391'}}}>
                                    <Text style={text.whiteSubtitle}>Mar</Text>
                                    <Text style={text.whiteParagraph}>2021</Text>
                                </View>
                                <View style={styles.rencanaIsi}>
                                    <Text style={text.subtitle}>Uang Bidikmisi cair 2 bulan</Text>
                                    <Text style={text.paragraph}>Pemasukan uang yang direncanakan sebesar Rp. 1.400.000</Text>
                                </View>
                                <View>
                                    <More width="20" height="20" fill="#B7B1E2"/> 
                                </View>
                            </View>
                            <View style={{...styles.rencana, ...layout.mb1}}>
                                <View style={{...styles.rencanaTgl, ...layout.mr1, ...{backgroundColor: '#FCDEDE'}}}>
                                    <Text style={text.redSubtitle}>Jul</Text>
                                    <Text style={text.redParagraph}>2021</Text>
                                </View>
                                <View style={styles.rencanaIsi}>
                                    <Text style={text.subtitle}>Uang untuk kegiatan KKN</Text>
                                    <Text style={text.paragraph}>Pengeluaran uang yang direncanakan sebesar Rp. 500.000</Text>
                                </View>
                                <View>
                                    <More width="20" height="20" fill="#B7B1E2"/> 
                                </View>
                            </View>
                            <Button style={{...styles.rencanaLainnya}} labelStyle={{...text.subtitle, ...styles.rencanaLainnyaLabel}} onPress={() => props.navigation.navigate('Rencana')}>
                                Atur rencana
                            </Button>
                        </View>
                    </View>
    )
}

export default Rencana;