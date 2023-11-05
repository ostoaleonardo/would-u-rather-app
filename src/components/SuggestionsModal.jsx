import { useState } from 'react'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useFetchQuestion } from '../hooks/useFetchQuestion'
import { LinearGradient } from 'expo-linear-gradient'
import { SolidButton } from './SolidButton'
import { OutlineButton } from './OutilineButton'

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
                    style={styles.modalContainer}
                    entering={ZoomIn} exiting={ZoomOut}
                >
                    <View style={styles.shadowLeft} />
                    <View style={styles.viewContainer}>
                        <LinearGradient
                            style={styles.gradiantContainer}
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
                            <View style={styles.buttonsContainer}>
                                <SolidButton label='Enviar pregunta' onPress={handleSend} />
                                <OutlineButton label='Cancelar' onPress={handleModal} />
                            </View>
                        </LinearGradient>
                    </View>
                </Animated.View>
            )}
            {isSent && (
                <Animated.View
                    style={styles.modalContainer}
                    entering={ZoomIn} exiting={ZoomOut}
                >
                    <View style={styles.shadowLeft} />
                    <View style={styles.viewContainer}>
                        <LinearGradient
                            style={styles.gradiantContainer}
                            colors={['#ff3c3c', '#ff007a']}
                        >
                            <Text style={styles.title}>¡Gracias!</Text>
                            <Text style={styles.subtitle}>Estamos revisando tu pregunta, en breve la añadiremos al juego</Text>
                            <SolidButton label='Aceptar' onPress={handleModal} />
                        </LinearGradient>
                    </View>
                </Animated.View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        position: 'relative',
        width: '90%',
    },
    shadowLeft: {
        position: 'absolute',
        zIndex: 0,
        bottom: 0,
        left: 0,
        width: '97%',
        height: '97%',
        borderRadius: 16,
        backgroundColor: 'black',
    },
    viewContainer: {
        zIndex: 1,
        top: 0,
        right: 0,
        width: '98%',
        borderWidth: 8,
        borderRadius: 16,
        borderColor: 'black',
        alignSelf: 'flex-end',
        backgroundColor: 'black',
    },
    gradiantContainer: {
        width: '100%',
        padding: 30,
        borderRadius: 8,
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
    buttonsContainer: {
        gap: 5,
        marginTop: 20,
        justifyContent: 'space-between',
    },
})