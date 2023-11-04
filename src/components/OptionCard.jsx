import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import Animated, { BounceIn, BounceOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const icon = require('../../assets/icons/check_icon.png')

export function OptionCard({ game, onPress, isVoted = false, isSelected = false, rotateDeg = 0 }) {
    const rotate = useSharedValue(0)

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
                    styles.container,
                    animatedRotation,
                ]}
            >
                <View style={rotateDeg > 0 ? styles.shadowRight : styles.shadowLeft} />
                <View style={rotateDeg > 0 ? styles.viewRight : styles.viewLeft}>
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
                </View>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressContainer: {
        flex: 1,
        width: '100%',
        height: 200,
        position: 'relative',
    },
    container: {
        width: '100%',
        height: '100%',
    },
    shadowLeft: {
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        left: 0,
        width: '96%',
        height: '96%',
        borderRadius: 24,
        backgroundColor: 'black',
    },
    shadowRight: {
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        right: 0,
        width: '96%',
        height: '96%',
        borderRadius: 24,
        backgroundColor: 'black',
    },
    viewLeft: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        right: 0,
        width: '96%',
        height: '96%',
        borderWidth: 8,
        borderRadius: 24,
        borderColor: 'black',
    },
    viewRight: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        left: 0,
        width: '96%',
        height: '96%',
        borderWidth: 8,
        borderRadius: 24,
        borderColor: 'black',
    },
    gradiant: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    option: {
        fontSize: 12,
        color: 'white',
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
