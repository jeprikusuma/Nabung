import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ListArtikel from './ListArtikel';


const LayoutArtikel = (props) => {
    const {text} = props.theme;
    const styles = StyleSheet.create({
            layout:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            alignItems: 'flex-start',
        },
        list:{
            width: 60,
            height: 60,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue'
        },
        left: {
            flex: 1,
            marginRight: 10
        },
        right: {
            flex: 1,
            marginLeft: 10
        },
        blank:{
            height: 60
        }
    })

    const listArtikel = (on) => {
        return props.data.map((data, i) => {

            return on == "Left" ? i % 2 == 0 && (
                <ListArtikel key={i} theme={props.theme} data={{...data, ...{id: props.id, name: props.name, reload: props.reload}}} navigation={props.navigation}/>
            ) : i % 2 != 0 && (
                <ListArtikel key={i} theme={props.theme} data={{...data, ...{id: props.id, name: props.name, reload: props.reload}}} navigation={props.navigation}/>
            )
        })
}

   return(
       <View style={styles.layout}>
           <View style={styles.left}>
               {props.data.length == 0 ? <Text style={text.paragraph}>Tidak ada artikel.</Text>: listArtikel("Left")}
               {}
               <View style={styles.blank}></View>
           </View>
           <View style={styles.right}>
               {listArtikel("Right")}
               <View style={styles.blank}></View>
           </View>
       </View>
   )
}
export default LayoutArtikel;