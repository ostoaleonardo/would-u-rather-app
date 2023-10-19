import { StyleSheet, Text, View } from 'react-native'
import { ModeCard } from './ModeCard'

export function GameModes() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modos de juego</Text>
            <Text style={styles.description}>
                Elige un modo de juego para empezar
            </Text>
            <View style={styles.optionsContainer}>
                <ModeCard
                    game={{
                        href: '/play',
                        label: 'Clasico',
                        description: 'Colección de preguntas clásicas',
                        gradiant: ['#0066ff', '#0085ff'],
                    }}
                />
                <ModeCard
                    game={{
                        href: '/',
                        label: 'Dificil',
                        description: 'Preguntas dificiles de elegir',
                        gradiant: ['#7000ff', '#ee09e5'],
                    }}
                />
                <ModeCard
                    game={{
                        href: '/',
                        label: 'De fiesta',
                        description: 'Preguntas para jugar con amigos',
                        gradiant: ['#ff4646', '#ffb951'],
                    }}
                />
            </View>
            <Text style={styles.soon}>Proximamente mas...</Text>
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
    soon: {
        fontSize: 16,
        marginTop: 30,
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'Rubik-Medium',
    },
})
