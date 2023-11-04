import React, { useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { StyleSheet, StatusBar, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RandomQuestion } from '../components/RandomQuestion'
import { GameModes } from '../components/GameModes'
import { PrivacyPolicy } from '../components/PrivacyPolicy'
import { NoConnectionModal } from '../components/NoConnectionModal'
import { SuggestionsModal } from '../components/SuggestionsModal'
import { BannerAdMob } from '../components/BannerAdMob'

export default function Home() {
    const { isConnected } = NetInfo.useNetInfo()
    const [showModal, setShowModal] = useState(false)

    const handleModal = () => {
        setShowModal(!showModal)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <RandomQuestion />
                <GameModes handleModal={handleModal} />
                <PrivacyPolicy />
            </ScrollView>
            {showModal && isConnected && <SuggestionsModal handleModal={handleModal} />}
            {showModal && !isConnected && <NoConnectionModal handleModal={handleModal} />}
            {isConnected && <BannerAdMob />}
            <StatusBar
                hidden={true}
                animated={true}
                barStyle='dark-content'
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    scrollView: {
        width: '100%',
        height: '100%',
    },
})
