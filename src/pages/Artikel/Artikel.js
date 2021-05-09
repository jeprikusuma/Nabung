import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Text, Image } from 'react-native';
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
    const [isLoading, setLoading] = useState(true);
    const { layout, text, color } = props.theme;
    const windowWidth = Dimensions.get('window').width;
    const [data, setData] = useState([]);

    useEffect(() =>{
        fetch('http://47.254.194.71/nabung_api/public/API/allArtikels')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(e => console.log(e))
        .finally(() => setLoading(false))

    }, [])
    
    let dataUser = [], dataSaved = [];
    if(!isLoading){
        data.map(item => {
            if(typeof item.likes == "string"){
                item.likes = JSON.parse(item.likes)
            }
            if(typeof item.comments == "string"){
                item.comments = JSON.parse(item.comments)
            }
            if(typeof item.saves == "string"){
                item.saves = JSON.parse(item.saves)
            }
            item.user == "Jepri Kusuma" && dataUser.push(item);
            item.saves.includes(1) &&  dataSaved.push(item);
        })
    }

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
        },
        onLoad: {
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 200
        },
        loader:{
            width: 90,
            height: 90
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
        setData(data.sort((a, b) => a.likes.length > b.likes.length ? -1 : 1));
        setOnOption('like');
    }
    const sortTerbaru = () => {
        setData(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
        setOnOption('terbaru');
    }

    const loadLayout = data => {
        if(!isLoading) return <LayoutArtikel theme = {props.theme} data = {data} navigation={props.navigation}/>;
        return(
            <View style={styles.onLoad}>
                <Image style={styles.loader} source={require('../../assets/img/system/loader.gif')}></Image>
            </View>
        )
    }
    return (
        <View style={layout.container}>
            {/* Back */}
            <Back theme = {props.theme} loc ="Artikel" navigation = {props.navigation}/>
            {/* Search */}
            <View style={styles.search}>
                <Search theme = {props.theme} placeholder = "Cari artikel"/>
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
                    {loadLayout(dataUser)}
                </ScrollView>
                <ScrollView style={styles.listArtikel}>
                    {loadLayout(data)}
                </ScrollView>
                <ScrollView style={styles.listArtikel}>
                    {loadLayout(dataSaved)}
                </ScrollView>
            </ScrollView>
            {/* Add */}
            <Add theme = {props.theme} toPage = 'BuatArtikel' navigation={props.navigation}/>
        </View>
    )
}
export default withTheme(Artikel);