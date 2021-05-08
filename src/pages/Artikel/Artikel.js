import React, {useState, useRef} from 'react';
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';
import { withTheme } from 'react-native-paper';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';


import Search from '../Shared/Search';
import Back from '../Shared/Back';
import Add from '../Shared/Add';

import ArrowIcon from "react-native-bootstrap-icons/icons/arrow-down-up";
import LayoutArtikel from './LayoutArtikel';

const Artikel = (props) => {
    let menu;
    const [page, setPage] = useState(2);
    const artikelListPage = useRef(null);
    const [onOption, setOnOption] = useState('terbaru');

    const { layout, text, color } = props.theme;
    const windowWidth = Dimensions.get('window').width;

    const allData = [
        {  
            id: 1,           
            title: "Belajar bisnis ala Film Startup",
            img: require('../../assets/img/user/artikel/1.png'),
            date: "2021-03-12",
            user: "Mbak Lisa",
            like: [1,],
            saved: [1,3, 4],
            comment: [{from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Jepri Kusuma", comment: "Mantapp"}],
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            
        },
        {  
            id: 2,           
            title: "Manajemen Kesibukan ala Mbak Lisa Blackpink",
            img: require('../../assets/img/user/artikel/2.jpg'),
            date: "2021-04-02",
            user: "Mbak Lisa",
            like: [1, 2, 3, 4, 19, 5, 9],
            saved: [3, 4],
            comment: [{from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Rio Ariawan", comment: "Bagus banget"},{from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Jepri Kusuma", comment: "Mantapp"}],
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {  
            id: 3,           
            title: "Definisi kesuksesan menurut Pendiri Microsoft: Bill Gates",
            img: require('../../assets/img/user/artikel/3.jpg'),
            date: "2021-05-10",
            user: "Jepri Kusuma",
            like: [1, 2],
            saved: [1, 3, 4],
            comment: [{from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Jepri Kusuma", comment: "Mantapp"}],
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {  
            id: 4,           
            title: "Sudut pandang uang dari orang terkaya di Dunia",
            img: require('../../assets/img/user/artikel/4.png'),
            date: "2021-05-12",
            user: "Jepri Kusuma",
            like: [1, 2, 3],
            saved: [ 3, 4],
            comment: [{from: "Jepri Kusuma", comment: "Mantapp"}],
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {  
            id: 5,           
            title: "Mengulik perjalanan Facebook",
            img: require('../../assets/img/user/artikel/5.png'),
            date: "2021-06-21",
            user: "Rio Ariawan",
            like: [1, 2, 3, 9, 1],
            saved: [1, 3, 4],
            comment: [{from: "Rio Ariawan", comment: "Bagus banget"},{from: "Rio Ariawan", comment: "Bagus banget"}, {from: "Jepri Kusuma", comment: "Mantapp"}],
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {  
            id: 6,           
            title: "Menanam saham di Perusahaan Ternama IPhone",
            img: require('../../assets/img/user/artikel/6.jpg'),
            date: "2021-06-27",
            user: "Rio Ariawan",
            like: [1, 2, 1],
            saved: [3, 4],
            comment: [],
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
    ]
    
    const [data, setData] = useState(allData);
    let dataUser = [], dataSaved = [];
    data.map(item => {
        item.user == "Jepri Kusuma" && dataUser.push(item);
        item.saved.includes(1) &&  dataSaved.push(item);
    })

    dataUser.map(item => {
        item.on = `${item.id}dataUser`
    })

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
        artikelDiscover: {
            alignSelf: 'stretch',
            width: windowWidth - 20,
            marginLeft: -20,
        },
        listArtikel:{
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
        }else if(pos >= windowWidth / 2 && pos <= windowWidth + windowWidth / 2){
            setPage(2);
        }else if(pos > windowWidth + windowWidth / 2){
            setPage(3);
        }
    }
    const toPage = pos => {
        artikelListPage.current.scrollTo({ x: pos });
        pageHandler(pos);
    }
    const sortLike = () => {
        setData(allData.sort((a, b) => a.like.length > b.like.length ? -1 : 1));
        setOnOption('like');
    }
    const sortTerbaru = () => {
        setData(allData.sort((a, b) => new Date(a.date) - new Date(b.date)));
        setOnOption('terbaru');
    }
    const toAdd = () => {
        props.navigation.push('BuatArtikel', props.navigation)
    }
    return (
        <View style={layout.container}>
            {/* Back */}
            <Back theme = {props.theme} loc ="Artikel"/>
            {/* Search */}
            <View style={styles.search}>
                <Search theme = {props.theme} placeholder = "Cari artikel" navigation = {props.navigation}/>
            </View>
            {/* Nav */}
            <View style={styles.nav}>
                <View style={styles.subnav}>
                    <TouchableOpacity onPress={() => {toPage(0)}}>
                        <Text style={{...page == 1 ? text.subtitle : text.subtitleSec, ...layout.mr1}}>Saya</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {toPage(windowWidth - 20)}}>
                        <Text style={ {...page == 2 ? text.subtitle : text.subtitleSec, ...layout.mr1}}>Semua</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {toPage(windowWidth * 2)}}>
                        <Text style={ page == 3 ? text.subtitle : text.subtitleSec}>Disimpan</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.subnav}>
                    <Menu ref={r => (menu = r)} >
                        <MenuTrigger>
                            <ArrowIcon width="16" height="16" fill={color.secondary}/> 
                        </MenuTrigger>
                        <MenuOptions customStyles={optionsStyles} >
                            <MenuOption onSelect={() => sortTerbaru()} >
                                <Text style={onOption == 'terbaru'?text.subtitle:text.paragraph}>Terbaru</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => sortLike()} >
                                <Text style={onOption == 'like'?text.subtitle:text.paragraph}>Like terbanyak</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
            </View>
            {/* artikel */}
            <ScrollView horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            style={styles.artikelDiscover}
            pagingEnabled
            onScroll={e => pageHandler(e.nativeEvent.contentOffset.x)}
            ref= {artikelListPage}
            onContentSizeChange={() => toPage(windowWidth - 20)}
             >
                <ScrollView style={styles.listArtikel}>
                    <LayoutArtikel theme = {props.theme} data = {dataUser} navigation={props.navigation}/>
                </ScrollView>
                <ScrollView style={styles.listArtikel}>
                    <LayoutArtikel theme = {props.theme} data = {data} navigation={props.navigation}/>
                </ScrollView>
                <ScrollView style={styles.listArtikel}>
                    <LayoutArtikel theme = {props.theme} data = {dataSaved} navigation={props.navigation}/>
                </ScrollView>
            </ScrollView>
            {/* Add */}
            <Add theme = {props.theme} addEvent={toAdd}/>
        </View>
    )
}
export default withTheme(Artikel);