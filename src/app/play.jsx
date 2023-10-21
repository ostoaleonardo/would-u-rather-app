import React, { useEffect, useState } from 'react'
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { useFetchQuestion } from '../hooks/useFetchQuestion'
import { Background } from '../components/Background'
import { classic } from '../constants/questions'

export default function Play() {
    const { getQuestionById, updateVotesById } = useFetchQuestion()
    const [question, setQuestion] = useState('')
    const [percentage, setPercentage] = useState(0)
    const [isSelected, setIsSelected] = useState(false)
    const table = 'classic'

    useEffect(() => {
        getQuestion()
    }, [])

    const getRandomNumber = () => {
        return Math.floor(Math.random() * classic.length)
    }

    const getQuestion = async () => {
        setQuestion('')
        setPercentage(0)
        setIsSelected(false)
        const id = getRandomNumber()
        const question = await getQuestionById(table, id)
        setQuestion(question)
    }

    const updateVotes = async (option) => {
        setIsSelected(true)
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
        <View style={styles.container}>
            <Background />
            <View style={styles.menu}>
                {isSelected && (
                    <Animated.Text
                        style={styles.votes}
                        entering={BounceIn} exiting={BounceOut}
                    >
                        {question.option1Votes + ' votos'}
                    </Animated.Text>
                )}
                {percentage !== 0 && (
                    <Animated.Text
                        style={styles.title}
                        entering={BounceIn} exiting={BounceOut}
                    >
                        {percentage.toFixed(0) + '%'}
                    </Animated.Text>
                )}
                {!isSelected && (
                    <Animated.Text
                        style={styles.title}
                        entering={BounceIn} exiting={BounceOut}
                    >
                        ¿Qué prefieres?
                    </Animated.Text>
                )}
                {isSelected && (
                    <Animated.Text
                        style={styles.votes}
                        entering={BounceIn} exiting={BounceOut}
                    >
                        {question.option2Votes + ' votos'}
                    </Animated.Text>
                )}
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
            <Pressable
                style={styles.buttonNext}
                onPress={getQuestion}
            >
                <Text style={styles.buttonLabel}>
                    {isSelected ? 'Siguiente' : 'Saltar pregunta'}
                </Text>
            </Pressable>
        </View>
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
    buttonNext: {
        position: 'absolute',
        bottom: 32,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 30,
    },
    buttonLabel: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)',
        fontFamily: 'Rubik-Medium',
    }
})