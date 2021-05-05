import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';

//  icon
import Up from "react-native-bootstrap-icons/icons/arrow-up-short";
import Down from "react-native-bootstrap-icons/icons/arrow-down-short";
import Dot from "react-native-bootstrap-icons/icons/three-dots-vertical";


const Transaksi = (props) => {
    let menu;
    const {color, text, layout} = props.theme;
    const styles = StyleSheet.create({
       transaksi:{
           flexDirection: 'row',
           justifyContent: 'space-between',
           alignSelf: 'stretch',
           alignItems: 'flex-start',
           borderRadius: 15,
           paddingVertical: 12
       },
       transaksiIcon:{
           height: 60,
           width: 60,
           justifyContent: 'center',
           alignItems: 'center'
       },
       transaksiIsi:{
           flex: 1,
       },
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

   const setIcon = status => {
        if(status == "Up"){
           return <Up width="23" height="23" fill={color.blue}/>;
       }else{
           return <Down width="23" height="23" fill={color.red}/>;
       }
   }
   const getBg = status => {
        if(status == "Up"){
           return color.blueBg;
       }else{
           return color.redBg;
       }
   }
   const getColor = status => {
        if(status == "Up"){
           return color.blue;
       }else{
           return color.red;
       }
   }

   return(
       <View style={{...styles.transaksi, ...layout.mb1, ...{backgroundColor:  getBg(props.status)}}}>
           <View style={styles.transaksiIcon}>
               {setIcon(props.status)}               
           </View>
           <View style={styles.transaksiIsi}>
               <Text style={{...text.subtitle, ...{color: getColor(props.status)}}}>{props.judul}</Text>
               <Text style={{...text.paragraph, ...{color: getColor(props.status)}}}>{props.keterangan}</Text>
           </View>
           <Menu ref={r => (menu = r)} >
               <MenuTrigger style={layout.mr1}>
                   <Dot width="16" height="16" fill={getColor(props.status)}/>
               </MenuTrigger>
               <MenuOptions customStyles={optionsStyles} >
                   <MenuOption onSelect={() => alert(`Delete`)} >
                       <Text style={text.paragraph}>Edit</Text>
                   </MenuOption>
                   <MenuOption onSelect={() => alert(`Delete`)} >
                       <Text style={text.redParagraph}>Hapus</Text>
                   </MenuOption>
               </MenuOptions>
           </Menu>
       </View>
   )
}
export default Transaksi;