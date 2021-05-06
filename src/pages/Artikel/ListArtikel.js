import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

import GoIcon from "react-native-bootstrap-icons/icons/arrow-right-short";
import Like from "react-native-bootstrap-icons/icons/heart-fill";
import Comment from "react-native-bootstrap-icons/icons/chat-fill";

const ListArtikel = (props) => {
    const {color, text, layout} = props.theme;
    const styles = StyleSheet.create({
        discoverArtikel:{
            alignSelf: 'stretch',
            paddingTop: 40,
            paddingBottom: 20
        },
        artikel:{
            backgroundColor : color.grey,
            alignItems: 'center',
            padding: 13,
            borderRadius: 16,
            alignSelf: 'stretch',
        },
        discoverImage:{
            width: 145,
            height: 160,
            backgroundColor : 'blue',
            transform: [{translateY: -50}],
            borderRadius: 16,
            position: 'relative'
        },
        image:{
            width: 145,
            height: 160,
            borderRadius: 16,
            resizeMode: 'cover'
        },
        go: {
            position: 'absolute',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: color.primary,
            right: -5,
            bottom: -5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        main: {
            marginTop: -55,
            width: 145
        },
        status: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {
            marginHorizontal: 5
        },
        judul:{
            marginTop: 5
        }
     })


   return(
       <TouchableOpacity style={styles.discoverArtikel} onPress={() => console.log('oke')}>
           <View style={styles.artikel}>
               <View style={styles.discoverImage}>
                   <Image style={styles.image} source={props.data.img}></Image>
                   <View style={styles.go}>
                      <GoIcon width="25" style={styles.backIcon} height="25" fill="#fff"/>
                   </View>
               </View>
               <View style={styles.main}>
                    <View style={{...styles.status, ...layout.mt1}}>
                        <Text style={text.paragraph}>{props.data.like.length}</Text>
                        <Like width="13" height="13" style={styles.icon} fill={color.secondary}/>
                        <Text style={text.paragraph}>{props.data.comment.length}</Text>
                        <Comment width="13" height="13" style={styles.icon} fill={color.secondary}/>
                    </View>
                    <Text style={{...text.subtitle, ...styles.judul}}>{props.data.title}</Text>
               </View>
           </View>
       </TouchableOpacity>
   )
}
export default ListArtikel;