import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Text, Image} from 'react-native';
import { withTheme } from 'react-native-paper';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';

import Search from '../Shared/Search';
import Back from '../Shared/Back';
import Add from '../Shared/Add';
import ListRencana from './ListRencana';

import ArrowIcon from "react-native-bootstrap-icons/icons/arrow-down-up";
import {baseUrl} from '../../config/config';

const Rencana = (props) => {
    let menu;
    const [page, setPage] = useState(1);
    const rencanaListPage = useRef(null);
    const [loadData, setLoadData] = useState(true);
    const [allRencana, setAllRencana] = useState([]);
    const [allRencanaAll, setAllRencanaAll] = useState([]);
    const [doneRencana, setDoneRencana] = useState([]);
    const [doneRencanaAll, setDoneRencanaAll] = useState([]);
    const [autoReload, setAutoReload] = useState(false);
    const { layout, text, color } = props.theme;
    const windowWidth = Dimensions.get('window').width;
    const [onOption, setOnOption] = useState('terbaru');

    const getData = () => {
        fetch(`${baseUrl}plan/${props.route.params.id}`)
        .then(res => res.json())
        .then(data => {
            setAllRencana(data);
            setAllRencanaAll(data);
        })

        fetch(`${baseUrl}plan/${props.route.params.id}/done`)
        .then(res => res.json())
        .then(data => {
            setDoneRencana(data);
            setDoneRencanaAll(data);
        })
        .catch(e => console.log(e))
        .finally(() => setLoadData(false))
    }
    useEffect(() =>{
        getData();
    }, [])

    if(autoReload){
        getData();
        console.log('reload...')
        setAutoReload(false);
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
        rencanaDiscover: {
            alignSelf: 'stretch',
            width: windowWidth - 20,
            marginLeft: -20,
        },
        listRencana:{
            alignSelf: 'stretch',
            width: windowWidth - 40,
            marginLeft: 20
        },
        onLoad: {
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 150
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
        }else if(pos >= windowWidth / 2){
            setPage(2);
        }
    }
    const toPage = pos => {
        rencanaListPage.current.scrollTo({ x: pos });
        pageHandler(pos);
    }
    const listRencana = rencana => {
        if(rencana.length == 0){
            return(
                <Text style={text.paragraph}>Tidak ada kegiatan yang direncanakan.</Text>
            )
        }else{
            return rencana.map((data, i) => {
                return(
                    <ListRencana theme ={props.theme} data={data} key = {i} id={props.route.params.id} reload={setAutoReload} reloadHome={props.route.params.reloadHome} navigation = {props.navigation}/>
                )
            })
        }
    }
    const loadLayout = rencana => {
        if(loadData){
            return(
                <View style={styles.onLoad}>
                    <Image style={styles.loader} source={require('../../assets/img/system/loader.gif')}></Image>
                </View>
            )
        }else{
            return listRencana(rencana);
        }
    }
    const searchHandler = keyword => { 
        let newRencana = allRencanaAll.filter(data => data.title.toUpperCase().includes(keyword.toUpperCase()));
        let newDoneRencana = doneRencanaAll.filter(data => data.title.toUpperCase().includes(keyword.toUpperCase()));
        setAllRencana(newRencana);
        setDoneRencana(newDoneRencana);
    }
    const latestHander = () => {
        setAllRencana(allRencana.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setDoneRencana(doneRencana.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setOnOption('terbaru');
    }
    const earlierHandler = () => {
        setAllRencana(allRencana.sort((a, b) => new Date(a.date) - new Date(b.date)));
        setDoneRencana(doneRencana.sort((a, b) => new Date(a.date) - new Date(b.date)));
        setOnOption('terdahulu');
    }
    const minHandler = () => {
        let allRencanaSort = allRencana.sort((a, b) => a.nominal - b.nominal);
        let doneRencanaSort = doneRencana.sort((a, b) => a.nominal - b.nominal);
        setAllRencana(allRencanaSort);
        setDoneRencana(doneRencanaSort);
        setOnOption('terkecil');
    }
    const maxHandler = () => {
        setAllRencana(allRencana.sort((a, b) => b.nominal - a.nominal));
        setDoneRencana(doneRencana.sort((a, b) => b.nominal - a.nominal));
        setOnOption('terbesar');
    }
    return (
        <View style={layout.container}>
            {/* Back */}
            <Back theme = {props.theme} loc ="Rencana" navigation = {props.navigation}/>
            {/* Search */}
            <View style={styles.search}>
                <Search theme = {props.theme} placeholder = "Cari rencana" action={searchHandler}/>
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
                            <MenuOption onSelect={latestHander} >
                                <Text style={onOption == 'terbaru'?text.subtitle:text.paragraph}>Terbaru</Text>
                            </MenuOption>
                            <MenuOption onSelect={earlierHandler} >
                                <Text style={onOption == 'terdahulu'?text.subtitle:text.paragraph}>Terdahulu</Text>
                            </MenuOption>
                            <MenuOption onSelect={minHandler} >
                                <Text style={onOption == 'terkecil'?text.subtitle:text.paragraph}>Nominal Terkecil</Text>
                            </MenuOption>
                            <MenuOption onSelect={maxHandler} >
                                <Text style={onOption == 'terbesar'?text.subtitle:text.paragraph}>Nominal Terbesar</Text>
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
                    {loadLayout(allRencana)}
                    {/* black */}
                    <View style={styles.blank}></View>
                </ScrollView>
                <ScrollView style={styles.listRencana}>
                    {loadLayout(doneRencana)}
                    {/* black */}
                    <View style={styles.blank}></View>
                </ScrollView>
            </ScrollView>
            {/* Add */}
            <Add theme = {props.theme} toPage = 'TambahRencana' reload={setAutoReload} reloadHome={props.route.params.reloadHome} id={props.route.params.id} navigation={props.navigation}/>
        </View>
    )
}
export default withTheme(Rencana);