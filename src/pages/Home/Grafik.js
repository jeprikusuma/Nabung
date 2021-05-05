import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Grafik = props => {
    const { text, color, layout} = props.theme;

    const data = {
        labels: ["Sep", "Okt", "Nov", "Des", "Jan", "Feb"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43]
          }
        ]
    };
    
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