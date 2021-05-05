 import React from 'react';
 import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//  icon
 import GraphDown from "react-native-bootstrap-icons/icons/graph-down";
 import GraphUp from "react-native-bootstrap-icons/icons/graph-up";
 import Up from "react-native-bootstrap-icons/icons/arrow-up-short";
 import Down from "react-native-bootstrap-icons/icons/arrow-down-short";
 import Like from "react-native-bootstrap-icons/icons/heart-fill";
 import Comment from "react-native-bootstrap-icons/icons/chat-fill";


 const Pesan = (props) => {
    const {color, text, layout} = props.theme;
    const styles = StyleSheet.create({
        pesan:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            alignItems: 'flex-start',
        },
        pesanIcon:{
            width: 60,
            height: 60,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pesanIsi:{
            flex: 1,
        },
    })
    const setIcon = icon => {
        if(icon == "GraphDown"){
            return <GraphDown width="23" height="23" fill={color.red}/>;
        }else if(icon == "GraphUp"){
            return <GraphUp width="23" height="23" fill={color.blue}/>;
        }else if(icon == "Up"){
            return <Up width="23" height="23" fill={color.blue}/>;
        }else if(icon == "Down"){
            return <Down width="23" height="23" fill={color.red}/>;
        }else if(icon == "Like"){
            return <Like width="23" height="23" fill="#fff"/>;
        }else if(icon == "Comment"){
            return <Comment width="23" height="23" fill="#fff"/>;
        }
    }
    const getBg = icon => {
        if(icon == "GraphDown"){
            return color.redBg;
        }else if(icon == "GraphUp"){
            return color.blueBg;
        }else if(icon == "Up"){
            return color.blueBg;
        }else if(icon == "Down"){
            return color.redBg;
        }else if(icon == "Like"){
            return color.yellowBg;
        }else if(icon == "Comment"){
            return color.orangeBg;
        }
    }
    return(
        <TouchableOpacity style={{...styles.pesan, ...layout.mb1}}>
            <View style={{...styles.pesanIcon, ...layout.mr1, ...{backgroundColor:  getBg(props.icon)}}}>
                {setIcon(props.icon)}               
            </View>
            <View style={styles.pesanIsi}>
                <Text style={text.subtitle}>{props.judul}</Text>
                <Text style={text.paragraph}>{props.redaksi}</Text>
            </View>
        </TouchableOpacity>
    )
 }
 export default Pesan;