import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import { withTheme } from 'react-native-paper';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';

import Back from '../Shared/Back';
import Search from '../Shared/Search';
import Add from '../Shared/Add';
import Transaksi from './Transaksi';

import ArrowIcon from "react-native-bootstrap-icons/icons/arrow-down-up";

const Tabungan = props => {
    const [page, setPage] = useState(1);
    const historyPage = useRef(null);

    const windowWidth = Dimensions.get('window').width;
    const { color, text, layout } = props.theme;

    const styles = StyleSheet.create({
        finance:{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            marginVertical: 70
        },
        nav:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            alignItems: 'center',
            marginVertical: 20
        },
        subnav: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        historyDiscover: {
            alignSelf: 'stretch',
            width: windowWidth - 20,
            marginLeft: -20
        },
        history:{
            alignSelf: 'stretch',
            width: windowWidth - 40,
            marginLeft: 20
        },
        blank:{
            height: 80
        }
    })
    const optionsStyles = {
        optionsContainer: {
          borderRadius: 13,
          overflow: 'hidden'
        },
        optionsWrapper: {  
            borderRadius: 13
        },
        optionWrapper: {
            borderRadius: 13,
            padding: 12,
        },
    }
    const pageHandler = pos => {
        if(pos <= windowWidth / 2){
            setPage(1);
        }else if(pos >= windowWidth / 2){
            setPage(2);
        }
    }
    const toPage = pos => {
        historyPage.current.scrollTo({ x: pos });
        pageHandler(pos);
    }

    return(
        <View style={layout.container}>
            {/* Back */}
            <Back theme = {props.theme} loc ="Tabungan"/>
            {/* Finance */}
            <View style={styles.finance}>
                <Text style={text.superTitle}>Rp. 140.000,-</Text>
            </View>
            {/* Search */}
            <Search theme = {props.theme} placeholder = "Cari riwayat transaksi"/>
            {/* Navigation */}
            <View style={styles.nav}>
                <View style={styles.subnav}>
                    <TouchableOpacity onPress={() => {toPage(0)}}>
                        <Text style={{...page == 1 ? text.subtitle : text.subtitleSec, ...layout.mr1}}>Hari ini</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {toPage(windowWidth)}}>
                        <Text style={ page == 2 ? text.subtitle : text.subtitleSec}>Semua</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.subnav}>
                    <Menu ref={r => (menu = r)} >
                        <MenuTrigger>
                            <ArrowIcon width="16" height="16" fill={color.secondary}/> 
                        </MenuTrigger>
                        <MenuOptions customStyles={optionsStyles} >
                            <MenuOption onSelect={() => alert(`Click`)} >
                                <Text style={text.subtitle}>Terbaru</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => alert(`Click`)} >
                                <Text style={text.paragraph}>Terdahulu</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => alert(`Click`)} >
                                <Text style={text.paragraph}>Nominal Terkecil</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => alert(`Click`)} >
                                <Text style={text.paragraph}>Nominal Terbesar</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
            </View>
            {/* History */}
            <ScrollView horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            style={styles.historyDiscover}
            pagingEnabled
            onScroll={e => pageHandler(e.nativeEvent.contentOffset.x)}
            ref= {historyPage}
             >
                <ScrollView style={styles.history}>
                    <Transaksi  
                    theme ={props.theme} 
                    judul = "Membeli kouta internet"
                    keterangan = "Pengeluaran sebesar Rp. 100.000 pada tanggal 12 Februari 2021" 
                    status = "Down"/>
                    <Transaksi 
                    theme ={props.theme} 
                    judul = "Bidikmisi bulan Januari"
                    keterangan = "Pemasukan sebesar Rp. 700.000 pada tanggal 2 Februari 2021" 
                    status = "Up"/>
                    <View style={styles.blank}></View>
                </ScrollView>
                <ScrollView style={styles.history}>
                    <Transaksi  
                    theme ={props.theme} 
                    judul = "Membeli kouta internet"
                    keterangan = "Pengeluaran sebesar Rp. 100.000 pada tanggal 12 Februari 2021" 
                    status = "Down"/>
                    <Transaksi  
                    theme ={props.theme} 
                    judul = "Membeli kouta internet"
                    keterangan = "Pengeluaran sebesar Rp. 100.000 pada tanggal 12 Februari 2021" 
                    status = "Down"/>
                    <Transaksi  
                    theme ={props.theme} 
                    judul = "Membeli kouta internet"
                    keterangan = "Pengeluaran sebesar Rp. 100.000 pada tanggal 12 Februari 2021" 
                    status = "Down"/>
                    <Transaksi  
                    theme ={props.theme} 
                    judul = "Membeli kouta internet"
                    keterangan = "Pengeluaran sebesar Rp. 100.000 pada tanggal 12 Februari 2021" 
                    status = "Down"/>
                    <View style={styles.blank}></View>
                </ScrollView>

            </ScrollView>
            {/* Add */}
            <Add theme = {props.theme}/>
        </View>
    )

}
export default withTheme(Tabungan);