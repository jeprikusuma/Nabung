import React, {useState, c, useRef, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import { withTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SharedElement } from 'react-navigation-shared-element';
import AwesomeAlert from 'react-native-awesome-alerts';

import Back from '../Shared/Back';

import LikeIcon from "react-native-bootstrap-icons/icons/heart";
import LikeIconFill from "react-native-bootstrap-icons/icons/heart-fill";
import SaveIcon from "react-native-bootstrap-icons/icons/bookmark";
import SaveIconFill from "react-native-bootstrap-icons/icons/bookmark-fill";
import SendIcon from "react-native-bootstrap-icons/icons/arrow-right-short";
import DeleteIcon from "react-native-bootstrap-icons/icons/trash";
import EditIcon from "react-native-bootstrap-icons/icons/pencil-fill";

import {articleUrl, baseUrl} from '../../config/config';

// const allData = [
//     {
//         id: 1,  
//     },    
//     {
//         id: 2,  
//     },    
//     {
//         id: 3,  
//     },    
//     {
//         id: 4,  
//     },    
//     {
//         id: 5,  
//     },    
//     {
//         id: 6,  
//     },      
//     {
//         id: 11,  
//     },      
//     {
//         id: 12,  
//     },      
//     {
//         id: 13,  
//     },      
//     {
//         id: 14,  
//     },      
// ]

const DetailArtikel = (props) => {
    const data = props.route.params;
    const { layout, text, color } = props.theme;
    const [navOpacity, setNavOpacity] = useState(0);
    const [isLike, setLike] = useState(data.likes.includes(data.id));
    const [isSave, setSave] = useState(data.saves.includes(data.id));
    const [isVisitor, setIsVisitor] = useState(data.user != data.id);
    const [comments, addComments] = useState(data.comments);
    const [postComment, setPostComment] = useState("");
    const artikelScroll = useRef(null);
    const [loader, setLoader] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const windowHeight = Dimensions.get('screen').height;
    const windowWidth = Dimensions.get('window').width;

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
            backgroundColor: color.grey,
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
            backgroundColor: color.grey,
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

    useEffect(() => {
        fetch(baseUrl+'article/'+data._id)
        .then(res => res.json())
        .then(res => {
            addComments(res[0].comments.reverse());
            setLike(res[0].likes.includes(data.id));
            setSave(res[0].saves.includes(data.id));
        })

    }, [])

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
    const makeTgl = () => {
        const monthIn = ["Januari", "Februari", "Maret", "April", "Mei",
                        "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const date = new Date(data.date)
        return `${date.getDate()} ${monthIn[date.getMonth()]} ${date.getFullYear()}`
    }
    const commentHandler = () => {
        if(postComment != ""){
            const dataComment = {
                from: data.name, 
                username: data.name, 
                comment: postComment
            }
            let newComment = comments
            newComment.unshift(dataComment)
            addComments(newComment);
            fetch(`${baseUrl}article/comment/${data._id}`, {
                method: 'patch',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataComment)
            })
            .then(() => data.reload(true));
            setPostComment("");
        }
    }


    const likeHandler = () => {
        setLike(!isLike);
        fetch(`${baseUrl}article/like/${data._id}`, {
            method: 'patch',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                action: !isLike ? 'like' : 'unlike',
                user: data.id
            })
        })
        .then(() => data.reload(true));
    }

    const saveHandler = () => {
        setSave(!isSave);
        fetch(`${baseUrl}article/save/${data._id}`, {
            method: 'patch',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                action: !isSave ? 'save' : 'unsave',
                user: data.id
            })
        })
        .then(() => data.reload(true));
    }

    const deleteHandler = () => {
        setDeleteAlert(false);
        setTimeout(() => {
            setLoader(true);
            fetch(`${baseUrl}article/${data._id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({img: data.img})
            })
            .then(() => {
                setLoader(false);
                setTimeout(() => {
                    props.navigation.goBack();
                    data.reload(true);
                    data.reloadHome && data.reloadHome(true);
                },300)
            })
        },300)
    }

    const editHandler = () => {
        props.navigation.goBack();
        props.navigation.push('BuatArtikel', {...{data: data}, ...{reload: data.reload}});
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
                        <Image style={styles.image} source={{uri: articleUrl + data.img}}></Image>
                    </SharedElement>
                    <View style={styles.status}>
                        {isVisitor && (
                            <>
                                <TouchableOpacity 
                                style={{...styles.button, ...styles.like}}
                                onPress = {likeHandler}>
                                    {checkLike()}
                                </TouchableOpacity>
                                <TouchableOpacity 
                                style={{...styles.button, ...styles.save}}
                                onPress = {saveHandler}>
                                    {checkSave()}
                                </TouchableOpacity>
                            </>
                        )}
                        {!isVisitor && (
                            <>
                                <TouchableOpacity 
                                style={{...styles.button, ...styles.like}}
                                onPress = {() => setDeleteAlert(true)}>
                                    <DeleteIcon width="25" height="25" fill={color.red}/>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                style={{...styles.button, ...styles.save}}
                                onPress = {editHandler}>
                                    <EditIcon width="25" height="25" fill="#fff"/>
                                </TouchableOpacity>
                            </>
                        )}
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
                        Oleh {data.username}
                    </Text>
                    <Text style={text.paragraph}>
                        {makeTgl()}
                    </Text>
                    {/* konten */}
                    <View style={{...layout.mt1, ...layout.mb1}}>
                        {makeParagraph(data.content)}
                    </View>
                    {/* Coment Input*/}
                    <View style={{...styles.commentIn, ...layout.mb1}}>
                        <TextInput style={styles.input}
                            placeholder="Tulis komentar"
                            placeholderTextColor= {color.secondary}
                            returnKeyType = "send"
                            onFocus = {() => artikelScroll.current.scrollTo({ y: windowHeight})}
                            onSubmitEditing = {() => commentHandler()}
                            onChange = {e => setPostComment(e.nativeEvent.text)}
                            value = {postComment}
                        />
                        <TouchableOpacity 
                        style = {{...styles.button, ...styles.send, ...layout.ml1}}
                        onPress = {() => commentHandler()}>
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
            <AwesomeAlert
                    show={deleteAlert}
                    showProgress={false}
                    title="Hapus Artikel"
                    message="Apakah kamu yakin ingin menghapus artikel ini?"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Tidak"
                    confirmText="Hapus"
                    confirmButtonColor="#DD6B55"
                    contentContainerStyle={{
                        width: '80%',
                        alignItems: 'center'
                    }}
                    actionContainerStyle={{
                        justifyContent:'space-between',
                        width: '60%',
                        marginTop: 12
                    }}
                    overlayStyle={{
                        height: '100%'
                    }}
                    onCancelPressed={() => {
                        setDeleteAlert(false);
                    }}
                    onConfirmPressed={() => {
                        deleteHandler();
                    }}
                    titleStyle={text.title}
                    messageStyle={text.paragraph}
                    confirmButtonTextStyle={text.paragraphWhiteBold}
                    cancelButtonTextStyle={text.white}
                />
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
// DetailArtikel.sharedElements = () => {
//     return allData.map(data => `artikel.${data.id}.img`);
// }
export default withTheme(DetailArtikel);