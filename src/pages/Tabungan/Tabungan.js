import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions} from 'react-native';
import { withTheme } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';

import Back from '../Shared/Back';
import Search from '../Shared/Search';
import Add from '../Shared/Add';
import Transaksi from './Transaksi';

import ArrowIcon from "react-native-bootstrap-icons/icons/arrow-down-up";
// config
import {Transactions, Users} from '../../config/database';
import {baseUrl} from "../../config/config";

const Tabungan = props => {
    let menu;
    const [page, setPage] = useState(1);
    const [trans, setTrans] = useState([]);
    const [transAll, setTransAll] = useState([]);
    const [transMonth, setTransMonth] = useState([]);
    const [transMonthAll, setTransMonthAll] = useState([]);
    const historyPage = useRef(null);
    const [data, setData] = useState(props.route.params.data);
    const [loader, setLoader] = useState(false); 
    const [loadData, setLoadData] = useState(true);
    const [onOption, setOnOption] = useState('terbaru');

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
        historyPage.current.scrollTo({ x: pos });
        pageHandler(pos);
    }
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
    const fetchData = async () => {
        await Users.doc(data.id).onSnapshot(snapshot => {
            const getUser = snapshot.data();
            setData({
                id: data.id,
                name: getUser.name,
                profile: getUser.profile,
                saving: getUser.saving,
                email: getUser.email,
                register_at: getUser.date,
                lastTransaction: getUser.lastTransaction
            });
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
        await Transactions.where('user', '==', data.id).orderBy('date').onSnapshot(snapshots => {
            let newTrans = [];
            let newTransMonth = [];
            snapshots.forEach(snapshot => {
                const data = {...snapshot.data(), id: snapshot.id};
                newTrans = [data, ...newTrans];
                
                if(new Date(data.date).getMonth() == new Date().getMonth()){
                    newTransMonth = [data, ...newTransMonth];
                }                
            });
            setTransMonth(newTransMonth);
            setTransMonthAll(newTransMonth);
            setTrans(newTrans);
            setTransAll(newTrans);
            setLoadData(false);
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }
    useEffect(() => {
        fetchData();
    }, []);

    const deleteTransactionHandler = trans => {
        setLoader(true);
         fetch(baseUrl+`transaction/delete/${data.id}/${trans}`, {
             method: 'GET',
             headers: {'Content-Type': 'application/json'},
         })
         .finally(() => setLoader(false));
    }

    const makeTrasactions = trans => {  
        if(trans.length != 0){
            const monthIn = ["Januari", "Februari", "Maret", "April", "Mei",
            "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            return trans.map((data, i) => {
                const date = new Date(data.date);
                return <Transaksi
                        key={"trans"+i}  
                        theme ={props.theme}
                        id={data.id}
                        judul ={data.title}
                        keterangan = {`${data.status == 'Up' ? 'Pemasukan' : 'Pengeluaran'} sebesar ${formatRp(data.nominal)} pada tanggal ${`${date.getDate()} ${monthIn[date.getMonth()]} ${date.getFullYear()}`}`} 
                        status ={data.status}
                        deleteTransactionHandler = {deleteTransactionHandler}
                    />
            })
        }else{
            return <Text style={text.paragraph}>Tidak ada riwayat transaksi</Text>
        }
    }
    const loadLayout = trans => {
        if(loadData){
            return(
                <View style={styles.onLoad}>
                    <Image style={styles.loader} source={require('../../assets/img/system/loader.gif')}></Image>
                </View>
            )
        }else{
            return makeTrasactions(trans);
        }

    }
    const searchHandler = keyword => { 
        let newTrans = transAll.filter(data => data.title.toUpperCase().includes(keyword.toUpperCase()));
        let newTransMonth = transMonthAll.filter(data => data.title.toUpperCase().includes(keyword.toUpperCase()));
        setTrans(newTrans);
        setTransMonth(newTransMonth);
    }
    const latestHander = () => {
        setTrans(trans.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setTransMonth(transMonth.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setOnOption('terbaru');
    }
    const earlierHandler = () => {
        setTrans(trans.sort((a, b) => new Date(a.date) - new Date(b.date)));
        setTransMonth(transMonth.sort((a, b) => new Date(a.date) - new Date(b.date)));
        setOnOption('terdahulu');
    }
    const minHandler = () => {
        let transSort = trans.sort((a, b) => a.nominal - b.nominal);
        let transMonthSort = transMonth.sort((a, b) => a.nominal - b.nominal);
        setTrans(transSort);
        setTransMonth(transMonthSort);
        setOnOption('terkecil');
    }
    const maxHandler = () => {
        setTrans(trans.sort((a, b) => b.nominal - a.nominal));
        setTransMonth(transMonth.sort((a, b) => b.nominal - a.nominal));
        setOnOption('terbesar');
    }
    return(
        <View style={layout.container}>
            {/* Back */}
            <Back theme = {props.theme} loc ="Tabungan" navigation = {props.navigation}/>
            {/* Finance */}
            <View style={styles.finance}>
                <Text style={text.superTitle}>{formatRp(data.saving)}</Text>
            </View>
            {/* Search */}
            <Search theme = {props.theme} placeholder="Cari riwayat transaksi" action={searchHandler}/>
            {/* Navigation */}
            <View style={styles.nav}>
                <View style={styles.subnav}>
                    <TouchableOpacity onPress={() => {toPage(0)}}>
                        <Text style={{...page == 1 ? text.subtitle : text.subtitleSec, ...layout.mr1}}>Bulan ini</Text>
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
            {/* History */}
            <ScrollView horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            style={styles.historyDiscover}
            pagingEnabled
            onScroll={e => pageHandler(e.nativeEvent.contentOffset.x)}
            ref= {historyPage}
             >
                <ScrollView style={styles.history}>
                    {loadLayout(transMonth)}
                    <View style={styles.blank}></View>
                </ScrollView>
                <ScrollView style={styles.history}>
                    {loadLayout(trans)}
                    <View style={styles.blank}></View>
                </ScrollView>

            </ScrollView>
            {/* Add */}
            <Add theme = {props.theme} toPage = 'TambahTransaksi' id = {data.id} navigation={props.navigation}/>
            <AwesomeAlert
                show={loader}
                showProgress={false}
                useNativeDriver={true}
                message="Loading..."
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                overlayStyle={{
                    height: '100%'
                }}
                messageStyle={text.paragraph}
                />
        </View>
    )

}
export default withTheme(Tabungan);