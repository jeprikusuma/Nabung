import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';


const ListRencana = (props) => {
   const {color, text, layout} = props.theme;
   const styles = StyleSheet.create({
       listRencana:{
           flexDirection: 'row',
           justifyContent: 'space-between',
           alignSelf: 'stretch',
           alignItems: 'flex-start',
       },
       listRencanaIcon:{
           width: 60,
           height: 60,
           borderRadius: 15,
           justifyContent: 'center',
           alignItems: 'center'
       },
       listRencanaIsi:{
           flex: 1,
       },
   })

   const getBg = tema => {
       if(tema == "Red"){
           return color.redBg;
       }else if(tema == "Blue"){
           return color.blueBg;
       }else if(tema == "Orange"){
           return color.orangeBg;
       }else{
           return color.secondary;
       }
   }
   const getColor = tema => {
        if(tema == "Red"){
            return color.red;
        }else if(tema == "Blue"){
            return color.blue;
        }else{
            return "#fff";
        }
   }
   const getDateFormat = tgl => {
       const monthName = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
       const toDate = new Date(tgl);
       return {date: toDate.getDate(), 
               month: monthName[toDate.getMonth()],
               year: toDate.getFullYear()}
   }
   const dateFormat = getDateFormat(props.tgl);
   return(
       <TouchableOpacity style={{...styles.listRencana, ...layout.mb1}}>
           <View style={{...styles.listRencanaIcon, ...layout.mr1, ...{backgroundColor:  getBg(props.tema)}}}>
                <Text style={{...text.subtitle, ...{color: getColor(props.tema)}}}>{dateFormat.month}</Text>
                <Text style={{...text.paragraph, ...{color: getColor(props.tema)}}}>{dateFormat.year}</Text>             
           </View>
           <View style={styles.listRencanaIsi}>
               <Text style={text.subtitle}>{props.judul}</Text>
               <Text style={text.paragraph}>{props.redaksi}</Text>
           </View>
       </TouchableOpacity>
   )
}
export default ListRencana;