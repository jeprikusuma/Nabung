import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Ucapan = props => {
    const [isStarting, setStarting] = useState(false);
    const [ucapan, setUcapan] = useState("");
    const [tanggal, setTanggal] = useState("");
    const { text} = props.theme;


    const styles = StyleSheet.create({
        ucapan:{
            marginTop: 30,
        }
    });

    useEffect(() => {
        const monthIn = ["Januari", "Februari", "Maret", "April", "Mei",
                        "Juni", "Juli", "September", "Oktober", "November", "Desember"];
        
        setInterval(() => {
            const date = new Date();
            const jam = date.getHours();
                if(jam >= 4 && jam < 10){
                    setUcapan("Selamat Pagi");
                }else if(jam < 14){
                    setUcapan("Selamat Siang");
                }else if(jam < 18){
                    setUcapan("Selamat Sore");
                }else{
                    setUcapan("Selamat Malam");
                }
                setTanggal(`${date.getDate()} ${monthIn[date.getMonth()]} ${date.getFullYear()}`)
        }, 1000)
    }, [isStarting])


    return (
        <View style={styles.ucapan}>
            <Text style={text.paragraph}>{tanggal}</Text>
            <Text style={text.title}>{ucapan}</Text>
        </View>
    )
}


export default Ucapan;