import React, {useState, useRef} from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import { withTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import Back from '../Shared/Back';

import LikeIcon from "react-native-bootstrap-icons/icons/heart";
import LikeIconFill from "react-native-bootstrap-icons/icons/heart-fill";
import SaveIcon from "react-native-bootstrap-icons/icons/bookmark";
import SaveIconFill from "react-native-bootstrap-icons/icons/bookmark-fill";
import SendIcon from "react-native-bootstrap-icons/icons/arrow-right-short";
import { SharedElement } from 'react-navigation-shared-element';

const allData = [
    {
        id: 1,  
    },    
    {
        id: 2,  
    },    
    {
        id: 3,  
    },    
    {
        id: 4,  
    },    
    {
        id: 5,  
    },    
    {
        id: 6,  
    },      
]

const DetailArtikel = (props) => {
    const { layout, text, color } = props.theme;
    const [navOpacity, setNavOpacity] = useState(0);
    const [isLike, setLike] = useState(false);
    const [isSave, setSave] = useState(false);
    const [comments, addComments] = useState([{from: "Rio Ariawan", comment: "Keren kak!"},{from: "Widya", comment: "Terimakasih ya kak, ilmunya bermanfaat sekali. Saya jadi tahu banyak tentang manajemen keuangan."}]);
    const [postComment, setPostComment] = useState("");
    const artikelScroll = useRef(null);
    const windowHeight = Dimensions.get('screen').height;
    const windowWidth = Dimensions.get('window').width;

    const data = props.route.params;

    const styles = StyleSheet.create({
        container:{
            height: windowHeight,
        },
        nav:{
            backgroundColor: `rgba(255, 255, 255, ${navOpacity})`, 
            zIndex: 9999, 
            width: windowWidth, 
            height: 80, 
            position: 'absolute',
        },
        header:{
            alignSelf: 'stretch',
            position: 'relative',
            paddingBottom: 30
        },
        content:{
            paddingTop: 5,
            paddingRight: 20,
            paddingLeft: 20,
        },
        image:{
            alignSelf: 'stretch',
            height: (windowWidth * 80 / 100),
            width: windowWidth,

        },
        status: {
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            right: 20,
            bottom: 0,
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,
            elevation: 4,
            borderRadius: 100,
        },
        like: {
            width: 55,
            height: 55,
            marginRight: 8,
            backgroundColor: '#fff',
        },
        save: {
            width: 70,
            height: 70,
            backgroundColor: color.primary,
        },
        commentIn: {
            flexDirection: 'row',
        },
        input:{
            flex: 1,
            color: color.primary,
            borderRadius: 12,
            alignSelf: 'stretch',
            backgroundColor: "#E5E5E5",
            height: 53,
            padding: 12, 
        },
        send: {
            height: 53,
            width: 53,
            backgroundColor: color.primary,
        },
        comments: {
            height: (windowHeight * 40 / 100),
        },
        comment: {
            backgroundColor: "#E5E5E5",
            padding: 12,
            borderRadius: 12,
            borderTopLeftRadius: 0,
            marginTop: 10,
            alignSelf: 'flex-start'
        },
        paragraph: {
            marginBottom: 5,
        },
        blank:{
            marginBottom: 50
        }
    })

    const scrollHandler = pos => {
        let on = pos > (windowWidth * 50 / 100) ? Math.abs((pos - (windowWidth * 50 / 100)) / (windowWidth * 20 / 100)) : 0;
        setNavOpacity(on);
    }
    const checkLike = () => {
        return isLike ? <LikeIconFill width="25" height="25" fill={color.primary}/> : <LikeIcon width="25" height="25" fill={color.primary}/>;
    }
    const checkSave = () => {
        return isSave ? <SaveIconFill width="27" height="27" fill="#fff"/> : <SaveIcon width="27" height="27" fill="#fff"/>;
    }
    const makeParagraph = str => {
        str = str.split("&&n&&");
        return str.map((data, i) => <Text style={{...text.primaryParagraph, ...styles.paragraph}} key={i}>{data}</Text>)
    }
    const showComment = () => {
        return comments.map((data, i) => {
            return (
                <View style={styles.comment} key={i}>
                    <Text style={text.subtitle}>
                        {data.from}
                    </Text>
                    <Text style={text.primaryParagraph}>
                        {data.comment}
                    </Text>
                </View>
            )
        })
    }
    const postCommentHandler = () => {
        if(postComment != ""){
            let newComment = comments
            newComment.unshift({from: "Jepri Kusuma", comment: postComment})
            addComments(newComment);
            setPostComment("");
        }
    }
    const makeTgl = () => {
        const monthIn = ["Januari", "Februari", "Maret", "April", "Mei",
                        "Juni", "Juli", "September", "Oktober", "November", "Desember"];
        const date = new Date(data.date)
        return `${date.getDate()} ${monthIn[date.getMonth()]} ${date.getFullYear()}`
    }
    return (
        <View >
            <StatusBar backgroundColor="transparent"/>
            {/* Back */}
            <View style={styles.nav}>
                <Back theme = {props.theme} loc ="Artikel" navigation = {props.navigation}/>
            </View>
            {/* Content */}
            <ScrollView style={styles.container} 
            onScroll={e => scrollHandler(e.nativeEvent.contentOffset.y)} 
            nestedScrollEnabled = {true} 
            ref= {artikelScroll}>
                {/* Image */}
                <View style={styles.header}>
                    <SharedElement id={`artikel.${data.id}.img`}>
                        <Image style={styles.image} source={data.img}></Image>
                    </SharedElement>
                    <View style={styles.status}>
                        <TouchableOpacity 
                        style={{...styles.button, ...styles.like}}
                        onPress = {() => setLike(!isLike)}>
                            {checkLike()}
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={{...styles.button, ...styles.save}}
                        onPress = {() => setSave(!isSave)}>
                            {checkSave()}
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Content */}
                <View style={{...styles.content, ...layout.mb1}}>
                    {/* judul */}
                    <Text style={text.title}>
                    {data.title}
                    </Text>
                    {/* oleh & tgl */}
                    <Text style={text.paragraph}>
                        Oleh {data.user}
                    </Text>
                    <Text style={text.paragraph}>
                        {makeTgl()}
                    </Text>
                    {/* konten */}
                    <View style={{...layout.mt1, ...layout.mb1}}>
                        {makeParagraph("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&&n&&Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printe. &&n&&Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")}
                        </View>
                    {/* Coment Input*/}
                    <View style={{...styles.commentIn, ...layout.mb1}}>
                        <TextInput style={styles.input}
                            placeholder="Tulis komentar"
                            placeholderTextColor= {color.secondary}
                            returnKeyType = "send"
                            onFocus = {() => artikelScroll.current.scrollTo({ y: windowHeight})}
                            onSubmitEditing = {() => postCommentHandler()}
                            onChange = {e => setPostComment(e.nativeEvent.text)}
                            value = {postComment}
                        />
                        <TouchableOpacity 
                        style = {{...styles.button, ...styles.send, ...layout.ml1}}
                        onPress = {() => postCommentHandler()}>
                            <SendIcon width="27" height="27" fill="#fff"/>
                        </TouchableOpacity>
                    </View>
                    {/* comments */}
                    <ScrollView style={styles.comments} nestedScrollEnabled = {true}>
                        {showComment()}
                        <View style={styles.blank}></View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}

DetailArtikel.sharedElements = () => {
    return allData.map(data => `artikel.${data.id}.img`);
}
export default withTheme(DetailArtikel);