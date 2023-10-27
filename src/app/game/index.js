import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import NetInfo from '@react-native-community/netinfo'
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads'
import Animated, { BounceIn, BounceOut, SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { View, StyleSheet, Pressable, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFetchQuestion } from '../../hooks/useFetchQuestion'
import { Background } from '../../components/Background'
import { classic, hard } from '../../constants/questions'
import { BannerAdMob } from '../../components/BannerAdMob'

const adIntId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-5454307717540089/1556881447'

const interstitial = InterstitialAd.createForAdRequest(adIntId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
})

const check = require('../../../assets/icons/check_icon.png')
const cross = require('../../../assets/icons/cross_icon.png')

export default function Game() {
    const params = useGlobalSearchParams()
    const table = params.mode === 'classic' ? 'classic' : 'hard'
    const length = table === 'classic' ? classic.length : hard.length
    const { updateVotesById } = useFetchQuestion()
    const { isConnected } = NetInfo.useNetInfo()
    const [question, setQuestion] = useState('')
    const [percentage, setPercentage] = useState(0)
    const [isSelected, setIsSelected] = useState(false)
    const [optionVoted, setOptionVoted] = useState('')
    const [loaded, setLoaded] = useState(true)
    const [questionCount, setQuestionCount] = useState(1)

    useEffect(() => {
        getQuestion()
    }, [])

    useEffect(() => {
        const unsubscribe = loadInterstitial()
        return unsubscribe
    }, [])

    const loadInterstitial = () => {
        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true)
        })

        const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            setLoaded(false)
            interstitial.load()
        })

        interstitial.load()

        return () => {
            unsubscribeLoaded()
            unsubscribeClosed()
        }
    }

    const getRandomNumber = () => {
        return Math.floor(Math.random() * length)
    }

    const getQuestion = async () => {
        setQuestion('')
        setPercentage(0)
        setIsSelected(false)
        setQuestionCount(questionCount + 1)

        if (questionCount % 10 === 0) {
            if (loaded && isConnected) {
                interstitial.show()
                setQuestionCount(1)
            }
        }

        const id = getRandomNumber()
        const question = table === 'classic' ? classic[id] : hard[id]
        setQuestion(question)
    }

    const updateVotes = async (option) => {
        setIsSelected(true)
        setOptionVoted(option)

        if (!isConnected) return

        option = option === 'option1' ? 'option1Votes' : 'option2Votes'
        const updatedQuestion = await updateVotesById(table, option, question.id)
        setQuestion(updatedQuestion)
        calculatePercentage(updatedQuestion, option)
    }

    const calculatePercentage = (question, option) => {
        const total = question.option1Votes + question.option2Votes
        const percentage = option === 'option1Votes'
            ? (question.option1Votes / total) * 100
            : (question.option2Votes / total) * 100
        setPercentage(percentage)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.game}>
                <Background mode={table} />
                <View style={styles.menu}>
                    {/* {isSelected && (
                    <Animated.Text
                        style={styles.votes}
                        entering={BounceIn} exiting={BounceOut}
                    >
                        {question.option1Votes + ' votos'}
                    </Animated.Text>
                )} */}
                    {/* {percentage !== 0 && (
                    <Animated.Text
                        style={styles.title}
                        entering={BounceIn} exiting={BounceOut}
                    >
                        {percentage.toFixed(0) + '%'}
                    </Animated.Text>
                )} */}
                    {isSelected && (
                        <Animated.View
                            style={styles.checkContainer}
                            entering={BounceIn} exiting={BounceOut}
                        >
                            {optionVoted === 'option1'
                                ? <Image style={styles.iconImage} source={check} />
                                : <Image style={styles.iconImage} source={cross} />
                            }
                        </Animated.View>
                    )}
                    <Animated.Text
                        style={styles.title}
                        entering={BounceIn} exiting={BounceOut}
                    >
                        ¿Qué prefieres?
                    </Animated.Text>
                    {isSelected && (
                        <Animated.View
                            style={styles.checkContainer}
                            entering={BounceIn} exiting={BounceOut}
                        >
                            {optionVoted === 'option2'
                                ? <Image style={styles.iconImage} source={check} />
                                : <Image style={styles.iconImage} source={cross} />
                            }
                        </Animated.View>
                    )}
                    {/* {isSelected && (
                    <Animated.Text
                        style={styles.votes}
                        entering={BounceIn} exiting={BounceOut}
                    >
                        {question.option2Votes + ' votos'}
                    </Animated.Text>
                )} */}
                </View>
                <View style={styles.options}>
                    <Pressable
                        style={styles.option}
                        onPress={() => updateVotes('option1')}
                        disabled={isSelected}
                    >
                        <Animated.Text
                            style={styles.optionLabel}
                            entering={BounceIn} exiting={BounceOut}
                        >
                            {question.option1}
                        </Animated.Text>
                    </Pressable>
                    <Pressable
                        style={styles.option}
                        onPress={() => updateVotes('option2')}
                        disabled={isSelected}
                    >
                        <Animated.Text
                            style={styles.optionLabel}
                            entering={BounceIn} exiting={BounceOut}
                        >
                            {question.option2}
                        </Animated.Text>
                    </Pressable>
                </View>
                {isSelected && (
                    <Animated.View
                        style={styles.viewButton}
                        entering={SlideInDown} exiting={SlideOutDown}
                    >
                        <Pressable
                            onPress={getQuestion}
                            style={({ pressed }) => [{ opacity: pressed ? 1 : 0.8 }, styles.buttonNext]}
                            android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', borderless: true }}
                        >
                            <Text style={styles.buttonLabel}>
                                Siguiente
                            </Text>
                        </Pressable>
                    </Animated.View>
                )}
                {!isSelected && (
                    <Animated.View
                        style={styles.viewButton}
                        entering={BounceIn} exiting={SlideOutDown}
                    >
                        <Pressable
                            onPress={getQuestion}
                            style={({ pressed }) => [{ opacity: pressed ? 1 : 0.8 }, styles.buttonSkip]}
                        >
                            <Text style={styles.buttonLabel}>
                                Saltar pregunta
                            </Text>
                        </Pressable>
                    </Animated.View>
                )}
            </View>
            {isConnected && (
                <BannerAdMob />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    game: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        position: 'absolute',
        gap: 12,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    options: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        zIndex: 50,
        padding: 24,
        fontSize: 24,
        borderRadius: 24,
        backgroundColor: '#fff',
        fontFamily: 'Rubik-Bold',
    },
    votes: {
        fontSize: 16,
        color: 'white',
        borderRadius: 100,
        paddingVertical: 8,
        paddingHorizontal: 16,
        textAlign: 'center',
        fontFamily: 'Rubik-Bold',
    },
    option: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    optionLabel: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
        fontFamily: 'Rubik-Medium',
    },
    viewButton: {
        position: 'absolute',
        bottom: 32,
        borderRadius: 25,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSkip: {
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    buttonNext: {
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    buttonLabel: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Rubik-Medium',
    },
    checkContainer: {
        width: 35,
        height: 35,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    iconImage: {
        width: 15,
        height: 15,
    },
})