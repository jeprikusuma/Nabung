import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import GoIcon from "react-native-bootstrap-icons/icons/arrow-right-short";
import Like from "react-native-bootstrap-icons/icons/heart-fill";
import Comment from "react-native-bootstrap-icons/icons/chat-fill";

import {articleUrl} from '../../config/config';

const ListArtikel = (props) => {
    const {color, text, layout} = props.theme;
    const [isPress, setIsPress] = useState(false);

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
        imageLoading:{
            backgroundColor: '#C1BEDF',
            width: 145,
            height: 160,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        },
        loader: {
            position: 'absolute',
            width: 60,
            height: 60,
            margin: 'auto',
            top: 50,
            left: 40,
        },
        icon: {
            marginHorizontal: 5
        },
        judul:{
            marginTop: 5
        }
     })
     
   return(
       <TouchableOpacity style={styles.discoverArtikel} onPress={() => props.navigation.push('DetailArtikel', props.data)} onPressIn={() => setIsPress(true)} onPressOut={() => setIsPress(false)}>
           <View style={styles.artikel}>
               <View style={styles.discoverImage}>
                   <View style={styles.imageLoading}>
                       {!isPress && (
                           <Image style={styles.loader} source={require('../../assets/img/system/loader.gif')}></Image>
                       )}
                        <SharedElement id={`artikel.${props.data.id}.img`}>
                            <Image style={styles.image} source={{uri: articleUrl + props.data.img}}></Image>
                        </SharedElement>
                   </View>
                   <View style={styles.go}>
                      <GoIcon width="25" style={styles.backIcon} height="25" fill="#fff"/>
                   </View>
               </View>
               <View style={styles.main}>
                    <View style={{...styles.status, ...layout.mt1}}>
                        <Text style={text.paragraph}>{props.data.likes.length}</Text>
                        <Like width="13" height="13" style={styles.icon} fill={color.secondary}/>
                        <Text style={text.paragraph}>{props.data.comments.length}</Text>
                        <Comment width="13" height="13" style={styles.icon} fill={color.secondary}/>
                    </View>
                    <Text style={{...text.subtitle, ...styles.judul}}>{props.data.title}</Text>
               </View>
           </View>
       </TouchableOpacity>
   )
}
export default ListArtikel;