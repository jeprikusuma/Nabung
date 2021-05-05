import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

//  icon
import Plus from "react-native-bootstrap-icons/icons/plus";

const Add = (props) => {
   const {color} = props.theme;
   const styles = StyleSheet.create({
       add:{
           justifyContent: 'center',
           alignItems: 'center',
           height: 75,
           width: 75,
           borderRadius: 40,
           position: 'absolute',
           bottom: 30,
           right: 20,
           backgroundColor: color.primary,
           shadowColor: "#000",
           shadowOffset: {
              width: 0,
              height: 12,
           },
           shadowOpacity: 0.58,
           shadowRadius: 16.00,
           elevation: 24
       },
   })

   return(
       <TouchableOpacity style={styles.add}>
           <Plus width="30" height="30"  style={styles.icon} fill="#fff"/>
       </TouchableOpacity>
   )
}
export default Add;