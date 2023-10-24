import { StyleSheet, Text, View } from 'react-native'
import { SuggestionsCard } from './SuggestionsCard'
import { ModeCard } from './ModeCard'

const classic = require('../../assets/icons/classic.png')
const hard = require('../../assets/icons/hard.png')
const suggestion = require('../../assets/icons/suggestion.png')

export function GameModes({ handleModal }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modos de juego</Text>
            <Text style={styles.description}>
                Elige un modo de juego para empezar
            </Text>
            <View style={styles.optionsContainer}>
                <ModeCard
                    game={{
                        icon: classic,
                        label: 'Clasico',
                        href: '/game?mode=classic',
                        description: 'Colección de preguntas clásicas',
                        gradiant: ['#0066ff', '#677fff'],
                    }}
                />
                <ModeCard
                    game={{
                        icon: hard,
                        label: 'Dificil',
                        href: '/game?mode=hard',
                        description: 'Colección de preguntas dificiles',
                        gradiant: ['#7000ff', '#ee09e5'],
                    }}
                />
                <SuggestionsCard
                    game={{
                        icon: suggestion,
                        label: 'Sugerencias',
                        description: 'Envianos tu pregunta para agregarla al juego',
                        gradiant: ['#ff3c3c', '#ff007a'],
                    }}
                    onPress={() => handleModal()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        paddingVertical: 48,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    title: {
        fontSize: 28,
        color: 'white',
        fontFamily: 'Rubik-Bold',
    },
    description: {
        fontSize: 16,
        color: 'white',
        marginBottom: 30,
        fontFamily: 'Rubik-Medium',
    },
    optionsContainer: {
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
