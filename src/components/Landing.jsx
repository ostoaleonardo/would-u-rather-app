import { useEffect, useState } from 'react'
import { useFetchQuestion } from '../hooks/useFetchQuestion'
import { View, StyleSheet, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { OptionCard } from './OptionCard'
import { classic } from '../constants/questions'

export function Landing() {
    const { getQuestionById, updateVotesById } = useFetchQuestion()
    const [question, setQuestion] = useState('')
    const [percentage, setPercentage] = useState(0)
    const [isSelected, setIsSelected] = useState('')
    const table = 'questions'

    useEffect(() => {
        getQuestion()
    }, [])

    const getRandomNumber = () => {
        return Math.floor(Math.random() * classic.length) + 1
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
                <Text style={styles.percentage}>
                    {percentage !== 0 ? percentage.toFixed(0) + '%' : 'o'}
                </Text>
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
    percentage: {
        position: 'absolute',
        width: 50,
        height: 50,
        zIndex: 150,
        fontSize: 16,
        aspectRatio: 1,
        color: 'black',
        borderRadius: 100,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Rubik-Medium',
        backgroundColor: 'white',
    },
})
