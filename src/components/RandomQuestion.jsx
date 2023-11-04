import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { useFetchQuestion } from '../hooks/useFetchQuestion'
import { View, StyleSheet, Text } from 'react-native'
import Animated, { FlipInEasyY, FlipOutEasyY } from 'react-native-reanimated'
import { OptionCard } from './OptionCard'
import { classic } from '../constants/questions'

export function RandomQuestion() {
    const { updateVotesById } = useFetchQuestion()
    const { isConnected } = NetInfo.useNetInfo()
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
        setQuestion(classic[id])
    }

    const updateVotes = async (option) => {
        setIsSelected(option)

        if (!isConnected) { return }

        option = option === 'option1' ? 'option1Votes' : 'option2Votes'
        const votes = await updateVotesById(table, option, question.id)
        calculatePercentage(votes, option)
    }

    const calculatePercentage = (votes, option) => {
        const total = votes.option1Votes + votes.option2Votes
        const percentage = option === 'option1Votes'
            ? (votes.option1Votes / total) * 100
            : (votes.option2Votes / total) * 100
        setPercentage(percentage)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Qué Prefieres?</Text>
            <Text style={styles.subtitle}>Pregunta aleatoria</Text>
            <View style={styles.optionsContainer}>
                <OptionCard
                    game={{
                        label: question.option1,
                        gradiant: ['#ff3c3c', '#ff007a'],
                    }}
                    rotateDeg={-5}
                    isVoted={isSelected}
                    isSelected={isSelected === 'option1'}
                    onPress={() => updateVotes('option1')}
                />
                <View style={styles.percentageContainer}>
                    {/* {percentage !== 0 && isConnected && (
                            <Animated.Text
                                style={styles.percentage}
                                entering={FlipInEasyY} exiting={FlipOutEasyY}
                            >
                                {percentage.toFixed(0) + '%'}
                            </Animated.Text>
                        )} */}
                    {/* {!isSelected && ( */}
                    <Animated.Text
                        style={styles.percentage}
                        entering={FlipInEasyY} exiting={FlipOutEasyY}
                    >
                        o
                    </Animated.Text>
                    {/* )} */}
                </View>
                <OptionCard
                    game={{
                        label: question.option2,
                        gradiant: ['#677fff', '#3c4fff'],
                    }}
                    rotateDeg={5}
                    isVoted={isSelected}
                    isSelected={isSelected === 'option2'}
                    onPress={() => updateVotes('option2')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        paddingTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 32,
        color: 'black',
        fontFamily: 'Rubik-Bold',
    },
    subtitle: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Rubik-Bold',
    },
    optionsContainer: {
        gap: 12,
        flexDirection: 'row',
        paddingVertical: 32,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    percentageContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    percentage: {
        zIndex: 10,
        width: 55,
        height: 55,
        fontSize: 18,
        aspectRatio: 1,
        borderWidth: 8,
        color: 'black',
        borderRadius: 100,
        textAlign: 'center',
        borderColor: 'black',
        fontFamily: 'Rubik-Bold',
        backgroundColor: 'white',
        textAlignVertical: 'center',
    },
})
