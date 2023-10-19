import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export function Background() {
    return (
        <LinearGradient
            style={styles.gradiant}
            colors={['#ff3c3c', '#050a0e', '#3c4fff']}
        >
            <LinearGradient
                style={styles.backgroundRed}
                colors={['#ff3c3c', '#ff007a']}
            />
            <LinearGradient
                style={styles.backgroundBlue}
                colors={['#677fff', '#3c4fff']}
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
