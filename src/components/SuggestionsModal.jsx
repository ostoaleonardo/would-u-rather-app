import { useState } from 'react'
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useFetchQuestion } from '../hooks/useFetchQuestion'
import { LinearGradient } from 'expo-linear-gradient'

export function SuggestionsModal({ handleModal }) {
    const { sendSeggestion } = useFetchQuestion()
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [isSent, setIsSent] = useState(false)

    const handleSend = () => {
        if (option1 !== '' && option2 !== '') {
            sendQuestion(option1, option2)
        }
    }

    const sendQuestion = async (option1, option2) => {
        const data = await sendSeggestion(option1, option2)
        setIsSent(true)
    }

    return (
        <View style={styles.container}>
            {!isSent && (
                <Animated.View
                    style={styles.modal}
                    entering={BounceIn} exiting={BounceOut}
                >
                    <LinearGradient
                        style={styles.gradiant}
                        colors={['#ff3c3c', '#ff007a']}
                    >
                        <Text style={styles.title}>¿Qué prefieres?</Text>
                        <Text style={styles.subtitle}>Envianos tu pregunta y la añadiremos al juego</Text>
                        <Text style={styles.label}>Opción 1:</Text>
                        <TextInput
                            label='Opción 1'
                            value={option1}
                            style={styles.input}
                            onChangeText={setOption1}
                            placeholder='Ser rico'
                            placeholderTextColor='rgba(255, 255, 255, 0.7)'
                        />
                        <Text style={styles.label}>Opción 2:</Text>
                        <TextInput
                            label='Opción 1'
                            value={option2}
                            style={styles.input}
                            onChangeText={setOption2}
                            placeholder='Ser famoso'
                            placeholderTextColor='rgba(255, 255, 255, 0.7)'
                        />
                        <Pressable
                            onPress={handleSend}
                            style={styles.buttonSolid}
                        >
                            <Text style={styles.buttonSolidLabel}>
                                Enviar pregunta
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={handleModal}
                            style={styles.buttonOutline}
                        >
                            <Text style={styles.buttonOutlineLabel}>
                                Cancelar
                            </Text>
                        </Pressable>
                    </LinearGradient>
                </Animated.View>
            )}
            {isSent && (
                <Animated.View
                    style={styles.modal}
                    entering={BounceIn} exiting={BounceOut}
                >
                    <LinearGradient
                        style={styles.gradiant}
                        colors={['#ff3c3c', '#ff007a']}
                    >
                        <Text style={styles.title}>¡Gracias!</Text>
                        <Text style={styles.subtitle}>Estamos revisando tu pregunta, en breve la añadiremos al juego</Text>
                        <Pressable
                            onPress={handleModal}
                            style={styles.buttonSolid}
                        >
                            <Text style={styles.buttonSolidLabel}>
                                Aceptar
                            </Text>
                        </Pressable>
                    </LinearGradient>
                </Animated.View>
            )}
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
        width: '90%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 16,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Rubik-Medium',
    },
    label: {
        fontSize: 18,
        color: 'white',
        marginBottom: 5,
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily: 'Rubik-Medium',
    },
    input: {
        width: '100%',
        height: 60,
        fontSize: 18,
        color: 'white',
        borderRadius: 16,
        marginBottom: 10,
        paddingHorizontal: 20,
        fontFamily: 'Rubik-Medium',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    buttonSolid: {
        width: '100%',
        marginTop: 20,
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    buttonOutline: {
        width: '100%',
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderColor: 'white',
    },
    buttonSolidLabel: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Rubik-Medium',
    },
    buttonOutlineLabel: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Rubik-Medium',
    },
})