import React, {useState, useRef} from 'react';
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';
import { withTheme } from 'react-native-paper';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';

import Search from '../Shared/Search';
import Back from '../Shared/Back';
import Add from '../Shared/Add';
import ListRencana from './ListRencana';

import ArrowIcon from "react-native-bootstrap-icons/icons/arrow-down-up";

const Rencana = (props) => {
    let menu;
    const [page, setPage] = useState(1);
    const rencanaListPage = useRef(null);
    const { layout, text, color } = props.theme;
    const windowWidth = Dimensions.get('window').width;

    const dataRencana = [
        {
            judul : "Acara keluarga",
            redaksi : "Pengeluaran yang direncanakan sebesar Rp. 100.000" ,
            tema : "Purple",
            tgl : "2021-04-01",
            des : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&&n&&Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesett"
        },
        {
            judul : "Uang Bidikmisi cair 2 bulan",
            redaksi : "Pemasukan yang direncanakan sebesar Rp. 1.400.000",
            tema : "Blue",
            tgl : "2021-03-02",
            des : "Lorem Ipsum is hen an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&&n&&Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesett"
        },
        {
            judul : "Uang untuk kegiatan KKN",
            redaksi : "Pengeluaran yang direncanakan sebesar Rp. 500.000", 
            tema : "Orange",
            tgl : "2021-06-28",
            des : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&&n&&Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesett"

        },
        {
            judul : "Sembahyang",
            redaksi : "Pengeluaran yang direncanakan sebesar Rp. 200.000", 
            tema : "Red",
            tgl : "2021-12-21",
            des : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&&n&&Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesett"
        }
    ]
    const dataRencanaSelesai = [
        {
            judul : "Acara keluarga",
            redaksi : "Pengeluaran yang direncanakan sebesar Rp. 100.000" ,
            tema : "Purple",
            tgl : "2021-04-01",
            des : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&&n&&Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesett"
        },
        {
            judul : "Uang Bidikmisi cair 2 bulan",
            redaksi : "Pemasukan yang direncanakan sebesar Rp. 1.400.000",
            tema : "Blue",
            tgl : "2021-03-02",
            des : "Lorem Ipsum is hen an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&&n&&Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesett"
        },
    ]

    const styles = StyleSheet.create({
        search:{
            alignSelf: 'stretch',
            marginTop: 50
        },
        blank:{
            height: 80
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
        rencanaDiscover: {
            alignSelf: 'stretch',
            width: windowWidth - 20,
            marginLeft: -20,
        },
        listRencana:{
            alignSelf: 'stretch',
            width: windowWidth - 40,
            marginLeft: 20
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
        rencanaListPage.current.scrollTo({ x: pos });
        pageHandler(pos);
    }
    const listRencana = () => {
        return dataRencana.map((data, i) => {
            return(
                <ListRencana theme ={props.theme} data={data} key = {i} navigation = {props.navigation}/>
            )
        })
    }
    const listRencanaSelesai = () => {
        return dataRencanaSelesai.map((data, i) => {
            return(
                <ListRencana theme ={props.theme} data={data} key = {i} navigation = {props.navigation}/>
            )
        })
    }
    return (
        <View style={layout.container}>
            {/* Back */}
            <Back theme = {props.theme} loc ="Rencana" navigation = {props.navigation}/>
            {/* Search */}
            <View style={styles.search}>
                <Search theme = {props.theme} placeholder = "Cari rencana"/>
            </View>
            {/* Nav */}
            <View style={styles.nav}>
                <View style={styles.subnav}>
                    <TouchableOpacity onPress={() => {toPage(0)}}>
                        <Text style={{...page == 1 ? text.subtitle : text.subtitleSec, ...layout.mr1}}>Semua</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {toPage(windowWidth)}}>
                        <Text style={ page == 2 ? text.subtitle : text.subtitleSec}>Selesai</Text>
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
            {/* Rencana */}
            <ScrollView horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            style={styles.rencanaDiscover}
            pagingEnabled
            onScroll={e => pageHandler(e.nativeEvent.contentOffset.x)}
            ref= {rencanaListPage}
             >
                <ScrollView style={styles.listRencana}>
                    {listRencana()}
                    {/* black */}
                    <View style={styles.blank}></View>
                </ScrollView>
                <ScrollView style={styles.listRencana}>
                    {listRencanaSelesai()}
                    {/* black */}
                    <View style={styles.blank}></View>
                </ScrollView>
            </ScrollView>
            {/* Add */}
            <Add theme = {props.theme} toPage = 'TambahRencana' navigation={props.navigation}/>
        </View>
    )
}
export default withTheme(Rencana);