import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import NetInfo from '@react-native-community/netinfo'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'
import Animated, { BounceIn, BounceOut, SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { View, StyleSheet, Pressable, Text, Image } from 'react-native'
import { useFetchQuestion } from '../../hooks/useFetchQuestion'
import { Background } from '../../components/Background'
import { classic, hard } from '../../constants/questions'

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5454307717540089/2986547026'

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

    useEffect(() => {
        getQuestion()
    }, [])

    const getRandomNumber = () => {
        return Math.floor(Math.random() * length)
    }

    const getQuestion = async () => {
        setQuestion('')
        setPercentage(0)
        setIsSelected(false)
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
        <>
        <View style={styles.container}>
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
                    style={styles.buttonNext}
                    entering={SlideInDown} exiting={SlideOutDown}
                >
                    <Pressable onPress={getQuestion}>
                        <Text style={styles.buttonLabel}>
                            Siguiente
                        </Text>
                    </Pressable>
                </Animated.View>
            )}
            {!isSelected && (
                <Animated.View
                    style={styles.buttonSkip}
                    entering={BounceIn} exiting={SlideOutDown}
                >
                    <Pressable onPress={getQuestion}>
                        <Text style={styles.buttonLabel}>
                            Saltar pregunta
                        </Text>
                    </Pressable>
                </Animated.View>
            )}
        </View>
        <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
        fontFamily: 'Rubik-Medium',
    },
    buttonSkip: {
        position: 'absolute',
        bottom: 32,
        paddingVertical: 8,
        paddingHorizontal: 30,
    },
    buttonNext: {
        position: 'absolute',
        bottom: 32,
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    buttonLabel: {
        fontSize: 18,
        fontFamily: 'Rubik-Medium',
        color: 'rgba(255, 255, 255, 0.8)',
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