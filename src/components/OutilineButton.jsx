import { Pressable, Text, View } from "react-native"
import { StyleSheet } from "react-native"

export function OutlineButton({ label, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.95 : 1 }] }, styles.pressContainer]}
            android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', borderless: true }}
        >
            <View style={styles.container}>
                <View style={styles.shadowLeft} />
                <View style={styles.viewContainer}>
                    <Text style={styles.label}>
                        {label}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressContainer: {
        width: '100%',
        height: 70,
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
        height: '92%',
        borderWidth: 8,
        borderRadius: 18,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    label: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Rubik-Medium',
    },
})
