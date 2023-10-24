import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export function Background({ mode }) {
    // set different background colors for each game mode
    const backgroundVariants = {
        classic: ['#ff3c3c', '#050a0e', '#3c4fff'],
        hard: ['#ff008a', '#050a0e', '#7000ff'],
    }

    const cardsVariants = {
        classic: ['#ff3c3c', '#ff007a', '#677fff', '#3c4fff'],
        hard: ['#ff008a', '#eb00ff', '#677fff', '#7000ff'],
    }

    return (
        <LinearGradient
            style={styles.gradiant}
            colors={backgroundVariants[mode]}
        >
            <LinearGradient
                style={styles.backgroundRed}
                colors={cardsVariants[mode].slice(0, 2)}
            />
            <LinearGradient
                style={styles.backgroundBlue}
                colors={cardsVariants[mode].slice(2, 4)}
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradiant: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#333',
    },
    backgroundRed: {
        flex: 1,
        margin: 12,
        marginTop: 0,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        backgroundColor: '#ff475a',
    },
    backgroundBlue: {
        flex: 1,
        margin: 12,
        marginBottom: 0,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: '#4c74f9',
    },
})
