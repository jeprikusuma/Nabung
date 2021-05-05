import React from 'react';
import { StyleSheet, TextInput, View} from 'react-native';
import SearchIcon from "react-native-bootstrap-icons/icons/search";

const Search = (props) => {
    const {color, text} = props.theme;
    const styles = StyleSheet.create({
        back:{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignSelf: 'stretch',
            alignItems: 'center',
            marginBottom: 30
        },
        search: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: "#EFEFEF",
            height: 53,
            padding: 12,
        },
        input:{
            flex: 2,
            marginLeft: 10,
            color: color.primary 
        },
    })
     return(
        <View style={styles.search}>
            <SearchIcon width="18" height="18 " fill={color.secondary}/> 
            <TextInput style={styles.input}
                    placeholder={props.placeholder}
                    placeholderTextColor= {color.secondary}
                />
        </View>
    )
}
export default Search;