import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import Animated, { BounceIn, BounceOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const icon = require('../../assets/icons/check_icon.png')

export function OptionCard({ game, onPress, isVoted = false, isSelected = false, rotateDeg = 0 }) {
    const rotate = useSharedValue(0)
    const scale = useSharedValue(1)

    const handleScale = () => {
        scale.value = withSpring(0.9)
    }

    const animatedScale = useAnimatedStyle(() => ({
        transform: [{ scale: withSpring(scale.value) }],
    }))

    const handleRotation = () => {
        rotate.value += rotateDeg
    }

    const animatedRotation = useAnimatedStyle(() => ({
        transform: [{ rotate: withSpring(rotate.value + 'deg') }],
    }))

    const handlePress = () => {
        if (!isVoted) {
            handleRotation()
            onPress()
        }
    }

    return (
        <Pressable
            onPress={handlePress}
            style={styles.pressContainer}
        >
            <Animated.View
                style={[
                    styles.viewContainer,
                    animatedRotation,
                ]}
            >
                <LinearGradient
                    style={styles.gradiant}
                    colors={[game.gradiant[0], game.gradiant[1]]}
                >
                    <Animated.Text
                        style={styles.option}
                        entering={BounceIn} exiting={BounceOut}
                    >
                        {game.label}
                    </Animated.Text>
                    {isSelected && (
                        <Animated.View
                            style={styles.checkContainer}
                            entering={BounceIn} exiting={BounceOut}
                        >
                            <Image
                                style={styles.checkImage}
                                source={icon}
                            />
                        </Animated.View>
                    )}
                </LinearGradient>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        height: 200,
    },
    pressContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradiant: {
        flex: 1,
        width: '100%',
        height: 200,
        borderRadius: 28,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 32,
        justifyContent: 'center',
        // transform: [{ rotate: '-10deg' },],
    },
    option: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Rubik-Medium',
    },
    checkContainer: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 30,
        height: 30,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    checkImage: {
        width: 15,
        height: 15,
    },
})
