import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Grafik = props => {
    const { text, color, layout} = props.theme;
    const [i, setI] = useState(0);
    const [data, setData] = useState(
        {
            labels: [0],
            datasets: [
              {
                data: [0]
              }
            ]
        }
    )

    const setDataGraph = async () => {
        setI(i + 1);
        try {
            let label = [];
            let dataset = [];
            const labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

            if(props.data == undefined){
                setData({
                    labels: [labels[new Date().getMonth()]],
                    datasets: [
                    {
                        data: [0]
                    }
                    ]
                });
                return;
            }
            if(props.data.length == 0){
                setData({
                    labels: [labels[new Date().getMonth()]],
                    datasets: [
                    {
                        data: [0]
                    }
                    ]
                });
                return;
            }

            await Object.keys(props.data).forEach(el => {
                el = el.split("-");
                el = parseInt(el[0]) - 1;
                label.push(labels[el])
            });

            await Object.values(props.data).forEach(el => {
                dataset.push(el)
            });

            setData({
                labels: label,
                datasets: [
                  {
                    data: dataset
                  }
                ]
            });
            
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     console.log("cel")
    // }, [])

    if(data.labels[0] == 7){
        setDataGraph();
    }

    const chartConfig = {
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        fillShadowGradientOpacity: 0,
        color: () => color.secondary,
        labelColor: () => color.secondary,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#fff",
            fill:  color.primary,
        },
        strokeWidth: 2,
        barPercentage: .8,
        useShadowColorFromDataset: false,
    };

    const styles = StyleSheet.create({
        graph:{
            paddingRight: 0
        }
    });

    return (
        <View style={{...styles.area, ...layout.mt1}}>
            <Text style={{...text.subtitle, ...layout.mb1}}>Grafik Keuangan</Text>
                <View>
                    <LineChart
                        data={data}
                        width={Dimensions.get("window").width }
                        height={160}
                        yAxisLabel="Rp. "
                        chartConfig={chartConfig}
                        withHorizontalLabels={false}
                        style={styles.graph}
                        withInnerLines={false}
                        withOuterLines={false}                    
                        bezier
                    />
                  </View>
        </View>
    )
}


export default Grafik;