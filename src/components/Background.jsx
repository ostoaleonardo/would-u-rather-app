import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export function Background({ mode }) {
    const cardsVariants = {
        classic: ['#ff3c3c', '#ff007a', '#677fff', '#3c4fff'],
        hard: ['#ff008a', '#eb00ff', '#677fff', '#7000ff'],
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.backgroundRed}
                colors={cardsVariants[mode].slice(0, 2)}
            />
            <LinearGradient
                style={styles.backgroundBlue}
                colors={cardsVariants[mode].slice(2, 4)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#333',
    },
    backgroundRed: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#ff475a',
        borderBottomColor: 'black',
        borderBottomWidth: 4,
    },
    backgroundBlue: {
        flex: 1,
        marginBottom: 0,
        backgroundColor: '#4c74f9',
        borderTopColor: 'black',
        borderTopWidth: 4,
    },
})
