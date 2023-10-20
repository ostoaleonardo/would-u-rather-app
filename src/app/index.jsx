import React from 'react'
import { StyleSheet, StatusBar, ScrollView, Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'
import { useFetchQuestion } from '../hooks/useFetchQuestion'
import { RandomQuestion } from '../components/RandomQuestion'
import { GameModes } from '../components/GameModes'
import { hard } from '../constants/questions'

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy'
const dev = process.env.NODE_ENV === 'development'
const table = 'hard'

export default function Home() {
    const { loadQuestions } = useFetchQuestion()

    const addQuestions = async () => {
        const data = await loadQuestions(table, hard)
        console.log(data)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <RandomQuestion />
                <GameModes />
            </ScrollView>
            {dev && (
                <Pressable
                    style={styles.buttonContainer}
                >
                    <Text style={styles.buttonLabel}>
                        Add question in table {table}
                    </Text>
                </Pressable>
            )}
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
