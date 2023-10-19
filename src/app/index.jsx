import React from 'react'
import { StyleSheet, StatusBar, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Landing } from '../components/Landing'
import { GameModes } from '../components/GameModes'

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Landing />
                <GameModes />
            </ScrollView>
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
