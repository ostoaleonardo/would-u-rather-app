import { Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated'

export function NoConnection() {
    return (
        <View style={styles.container}>
            <Animated.View
                style={styles.modal}
                entering={BounceIn}
                exiting={BounceOut}
            >
                <LinearGradient
                    style={styles.gradiant}
                    colors={['#ff3c3c', '#ff007a']}
                >
                    <Text style={styles.title}>
                        Oops!
                    </Text>
                    <Text style={styles.subtitle}>
                        No tienes conexión a internet
                    </Text>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonLabel}>
                            Reintentar
                        </Text>
                    </Pressable>
                </LinearGradient>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 100,
        top: 0,
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    modal: {
        width: '80%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        // transform: [{ rotate: '5deg' }],
    },
    gradiant: {
        width: '100%',
        height: 'auto',
        padding: 32,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Rubik-Bold',
    },
    subtitle: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Rubik-Medium',
    },
    button: {
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: 'white',
    },
    buttonLabel: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Rubik-Medium',
    },
})