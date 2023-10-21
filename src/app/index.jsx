import React from 'react'
import NetInfo from '@react-native-community/netinfo'
import { StyleSheet, StatusBar, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'
import { RandomQuestion } from '../components/RandomQuestion'
import { GameModes } from '../components/GameModes'
import { NoConnection } from '../components/NoConnection'

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5454307717540089/2986547026'

export default function Home() {
    const { isConnected } = NetInfo.useNetInfo()

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <RandomQuestion />
                <GameModes />
            </ScrollView>
            {isConnected !== null && !isConnected && <NoConnection />}
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <StatusBar
                animated={true}
                translucent={true}
                backgroundColor='black'
                barStyle='light-content'
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    menu: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontFamily: 'Rubik-Bold',
        marginBottom: 20,
    },
    buttonContainer: {
        borderRadius: 20,
        marginVertical: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: 'black',
    },
    buttonLabel: {
        fontSize: 16,
        fontFamily: 'Rubik-Medium',
        color: 'white',
    },
})
