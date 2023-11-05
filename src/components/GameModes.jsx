import { Image, StyleSheet, Text, View } from 'react-native'
import { SuggestionsCard } from './SuggestionsCard'
import { ModeCard } from './ModeCard'

const classic = require('../../assets/icons/classic.png')
const hard = require('../../assets/icons/hard.png')
const suggestion = require('../../assets/icons/suggestion.png')
const mask = require('../../assets/icons/mask.png')

export function GameModes({ handleModal }) {
    return (
        <View style={styles.container}>
            <Image source={mask} style={styles.maskTop} />
            <Image source={mask} style={styles.maskBottom} />
            <View style={styles.content}>
                <Text style={styles.title}>Modos de juego</Text>
                <Text style={styles.description}>
                    Nuevas preguntas cada semana
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
                            description: 'Envianos tu pregunta y la añadiremos',
                            gradiant: ['#ff3c3c', '#ff007a'],
                        }}
                        onPress={() => handleModal()}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff007a',
    },
    maskTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        transform: [{ rotate: '180deg' }],
    },
    maskBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
    },
    content: {
        width: '100%',
        paddingVertical: 64,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
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
        gap: 10,
        width: '100%',
    },
})
