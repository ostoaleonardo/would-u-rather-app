import { Link } from 'expo-router'
import { View, StyleSheet, Text, Pressable, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export function ModeCard({ game }) {
    return (
        <Link href={game.href} asChild>
            <Pressable style={styles.card}>
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
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradiant: {
        width: '100%',
        height: '100%',
        padding: 20,
        borderRadius: 28,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardHeader: {
        width: 70,
        height: 70,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardHeaderImage: {
        width: 70,
        height: 70,
    },
    cardContent: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Rubik-Medium',
    },
    label: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Rubik-Medium',
    },
})
