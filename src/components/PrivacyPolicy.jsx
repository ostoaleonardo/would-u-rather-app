import { Pressable, StyleSheet, Text, View, Linking } from 'react-native'

export function PrivacyPolicy() {
    const handlePrivacyPolicy = () => {
        const url = 'https://sites.google.com/view/que-prefieres-privacy-policy'
        Linking.openURL(url)
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={handlePrivacyPolicy}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
                <Text style={styles.label}>
                    Política de Privacidad
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        padding: 32,
        paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    label: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'Rubik-Medium',
    },
})