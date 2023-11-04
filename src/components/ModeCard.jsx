import { Link, useRouter } from 'expo-router'
import { View, StyleSheet, Text, Pressable, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export function ModeCard({ game }) {
    const router = useRouter()

    const goGame = () => {
        router.push(game.href)
    }

    return (
        <Pressable style={styles.pressContainer} onPress={goGame}>
            <View style={styles.container}>
                <View style={styles.shadowLeft} />
                <View style={styles.viewContainer}>
                    <LinearGradient
                        style={styles.gradiant}
                        colors={[game.gradiant[0], game.gradiant[1]]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View style={styles.cardHeader}>
                            <Image
                                style={styles.cardHeaderImage}
                                source={game.icon}
                            />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>
                                {game.label}
                            </Text>
                            <Text style={styles.label}>
                                {game.description}
                            </Text>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressContainer: {
        width: '100%',
        height: 120,
    },
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    shadowLeft: {
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        left: 0,
        width: '96%',
        height: '96%',
        borderRadius: 16,
        backgroundColor: 'black',
    },
    viewContainer: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        right: 0,
        width: '98%',
        height: '94%',
        borderWidth: 8,
        borderRadius: 18,
        borderColor: 'black',
    },
    gradiant: {
        width: '100%',
        height: '100%',
        gap: 10,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardHeader: {
        width: 60,
        height: 60,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardHeaderImage: {
        width: 60,
        height: 60,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Rubik-Medium',
    },
    label: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'Rubik-Medium',
    },
})
