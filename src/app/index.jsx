import React from 'react'
import { StyleSheet, StatusBar, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'
import { RandomQuestion } from '../components/RandomQuestion'
import { GameModes } from '../components/GameModes'

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy'

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <RandomQuestion />
                <GameModes />
            </ScrollView>
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
        backgroundColor: '#fff',
        paddingHorizontal: 80,
        paddingVertical: 14,
        borderRadius: 15,
        elevation: 5,
    },
    buttonLabel: {
        fontSize: 20,
        fontFamily: 'Rubik-Bold',
    }
})
