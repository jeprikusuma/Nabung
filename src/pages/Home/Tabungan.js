import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';

const Tabungan = props => {
    const {layout, color, text} = props.theme;
    const windowWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        tabungan:{
            backgroundColor: color.secondary,
            alignSelf: 'stretch',
            width: windowWidth - 40,
            padding: 20,
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
    const formatRp = saving => {
        const text = String(saving);
        let rest = "";
        let a = 1;
        for(i = text.length - 1 ; i >= 0 ; i--){
            a % 3 == 0 && a != text.length ? rest = '.' + text[i] + rest : rest = text[i] + rest ;
            a++;
        }
        return `Rp. ${rest}`
    }
    const makeDesc = () => {
        const monthIn = ["Januari", "Februari", "Maret", "April", "Mei",
        "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

        if(props.data.lastTransaction == null){
            return 'Anda belum pernah melakukan transaksi keuangan.';
        }else{
            const susDate = new Date(props.data.lastTransaction.date).getDate() - new Date().getDate();

            switch (susDate) {
                case 0:
                    return `${props.data.lastTransaction.status == 'Up' ? 'Pemasukan':'Pengeluaran'} terakhir hari ini sebesar ${formatRp(props.data.lastTransaction.nominal)}`;
                case 1:
                    return `${props.data.lastTransaction.status == 'Up' ? 'Pemasukan':'Pengeluaran'} terakhir kemarin sebesar ${formatRp(props.data.lastTransaction.nominal)}`;
                case 2:
                    return `${props.data.lastTransaction.status == 'Up' ? 'Pemasukan':'Pengeluaran'} terakhir 2 hari yang lalu sebesar ${formatRp(props.data.lastTransaction.nominal)}`;
                case 3:
                    return `${props.data.lastTransaction.status == 'Up' ? 'Pemasukan':'Pengeluaran'} terakhir 3 hari yang lalu sebesar ${formatRp(props.data.lastTransaction.nominal)}`;
                default:
                    const date = new Date(props.data.lastTransaction.date);
                    return `${props.data.lastTransaction.status == 'Up' ? 'Pemasukan':'Pengeluaran'} terakhir ${date.getDate()} ${monthIn[date.getMonth()]} ${date.getFullYear()} sebesar ${formatRp(props.data.lastTransaction.nominal)}`;
            }
        }
    }
    return (
        <View style={styles.area} >
            <Text style={{...text.subtitle, ...layout.mb1, ...layout.mt1}}>Tabungan</Text>
            <View style={styles.tabungan}>
                <Text style={text.whiteSuperTitle}>{formatRp(props.data.saving)}</Text>
                <Text style={text.whiteParagraph}>{makeDesc()}</Text>
                <Button style={{...styles.kelola, ...layout.mt1}} labelStyle={{...text.whiteSubtitle, ...styles.kelolaLabel}} mode="contained" onPress={() => props.navigation.navigate('TabunganNavigation', {data: props.data})}>
                    Kelola
                </Button>
            </View>
        </View>
    )
}


export default Tabungan;