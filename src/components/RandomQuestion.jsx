import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View, StyleSheet, Text } from 'react-native'
import Animated, { FlipInEasyY, FlipOutEasyY } from 'react-native-reanimated'
import { useFetchQuestion } from '../hooks/useFetchQuestion'
import { OptionCard } from './OptionCard'
import { classic } from '../constants/questions'

export function RandomQuestion() {
    const { getQuestionById, updateVotesById } = useFetchQuestion()
    const [question, setQuestion] = useState('')
    const [percentage, setPercentage] = useState(0)
    const [isSelected, setIsSelected] = useState('')
    const table = 'classic'

    useEffect(() => {
        getQuestion()
    }, [])

    const getRandomNumber = () => {
        return Math.floor(Math.random() * classic.length)
    }

    const getQuestion = async () => {
        const id = getRandomNumber()
        const question = await getQuestionById(table, id)
        setQuestion(question)
    }

    const updateVotes = async (option) => {
        setIsSelected(option)
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
        <LinearGradient
            style={styles.gradiant}
            colors={['#690031', '#050a0e', '#1c2470']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
        >
            <Text style={styles.title}>¿Qué prefieres?</Text>
            <Text style={styles.subtitle}>Pregunta aleatoria</Text>
            <View style={styles.optionsContainer}>
                <OptionCard
                    game={{
                        label: question.option1,
                        gradiant: ['#ff3c3c', '#ff007a'],
                    }}
                    isVoted={isSelected}
                    isSelected={isSelected === 'option1'}
                    onPress={() => updateVotes('option1')}
                />
                <OptionCard
                    game={{
                        label: question.option2,
                        gradiant: ['#677fff', '#3c4fff'],
                    }}
                    isVoted={isSelected}
                    isSelected={isSelected === 'option2'}
                    onPress={() => updateVotes('option2')}
                />
            </View>
            <View style={styles.percentageContainer}>
                {percentage !== 0 && (
                    <Animated.Text
                        style={styles.percentage}
                        entering={FlipInEasyY} exiting={FlipOutEasyY}
                    >
                        {percentage.toFixed(0) + '%'}
                    </Animated.Text>
                )}
                {!isSelected && (
                    <Animated.Text
                        style={styles.percentage}
                        entering={FlipInEasyY} exiting={FlipOutEasyY}
                    >
                        o
                    </Animated.Text>
                )}
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradiant: {
        width: '100%',
        height: 'auto',
        paddingVertical: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 28,
        color: 'white',
        fontFamily: 'Rubik-Bold',
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        marginBottom: 30,
        fontFamily: 'Rubik-Medium',
    },
    optionsContainer: {
        gap: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
    percentageContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    percentage: {
        position: 'absolute',
        width: 50,
        height: 50,
        zIndex: 1000,
        fontSize: 14,
        aspectRatio: 1,
        color: 'black',
        borderRadius: 100,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Rubik-Bold',
        backgroundColor: 'white',
    },
})
