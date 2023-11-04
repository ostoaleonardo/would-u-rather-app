import { Pressable, StyleSheet, Text, View, Linking } from 'react-native'

export function PrivacyPolicy() {
    const handlePrivacyPolicy = () => {
        const url = 'https://sites.google.com/view/que-prefieres-privacy-policy'
        Linking.openURL(url)
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewButton}>
                <Pressable
                    onPress={handlePrivacyPolicy}
                    style={({ pressed }) => [{ opacity: pressed ? 1 : 0.7 }, styles.button]}
                    android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', borderless: false }}
                >
                    <Text style={styles.label}>
                        Política de privacidad
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        paddingTop: 0,
        paddingBottom: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewButton: {
        borderRadius: 25,
        overflow: 'hidden',
    },
    button: {
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    label: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'Rubik-Medium',
    },
})