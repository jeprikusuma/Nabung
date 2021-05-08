import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import HomeNavigation from './src/pages/Artikel';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  color: {
    ...DefaultTheme.color,
    primary: '#5E478B',
    secondary: '#8B82D1',
    grey: '#EFEFEF',
    red: '#DE7676',
    redBg:'#FCDEDE',
    blue: '#37AEE4',
    blueBg: '#DEF0FC',
    yellowBg: '#FFC391',
    orangeBg: '#FEC13C',
  },
  layout: {
    ...DefaultTheme.layout,
    container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 40,
      paddingRight: 20,
      paddingLeft: 20
    },
    ml1:{
      marginLeft: 14
    },
    mr1:{
        marginRight: 14
    },
    mb1:{
        marginBottom: 14
    },
    mt1:{
        marginTop: 14
    }
  },
  text:{
    ...DefaultTheme.text,
    superTitle:{
      fontSize: 30,
      fontWeight: 'bold',
      color: '#5E478B'
    },
    title:{
      fontSize: 26,
      fontWeight: 'bold',
      color: '#5E478B'
    },
    subtitle:{
      fontSize: 14,
      fontWeight: 'bold',
      color: '#5E478B'
    },
    subtitleSec:{
      fontSize: 14,
      fontWeight: 'bold',
      color: '#8B82D1'
    },
    paragraph:{
      fontSize: 14,
      color: '#8B82D1'
    },
    primaryParagraph:{
      fontSize: 14,
      color: '#5E478B'
    },
    whiteSuperTitle:{
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FAFAFA'
    },
    whiteTitle:{
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FAFAFA'
    },
    whiteSubtitle:{
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FAFAFA'
    },
    whiteParagraph:{
      fontSize: 14,
      color: '#FAFAFA'
    },
    blueSubtitle:{
      fontSize: 14,
      fontWeight: 'bold',
      color: '#37AEE4'
    },
    blueParagraph:{
      fontSize: 14,
      color: '#37AEE4'
    },
    redSubtitle:{
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FA4D4D'
    },
    redParagraph:{
      fontSize: 14,
      color: '#FA4D4D'
    },

  }
};

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor='white'/>
      <MenuProvider>
        <HomeNavigation />
      </MenuProvider>
   </PaperProvider>
  );

}

