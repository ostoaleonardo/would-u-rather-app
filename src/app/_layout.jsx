import { useCallback, useEffect } from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as Updates from 'expo-updates'
import 'expo-dev-client'

export default function Layout() {
    const [fontsLoaded, fontError] = useFonts({
        'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.ttf'),
        'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf'),
    })

    useEffect(() => {
        onFetchUpdateAsync()

        const loadFont = async () => {
            await SplashScreen.preventAutoHideAsync()
        }

        loadFont()
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded, fontError])

    if (!fontsLoaded) {
        return null
    }

    async function onFetchUpdateAsync() {
        try {
            const update = await Updates.checkForUpdateAsync()

            if (update.isAvailable) {
                await Updates.fetchUpdateAsync()
                await Updates.reloadAsync()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Stack
            screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'Rubik-Bold',
                },
                navigationBarHidden: true,
            }}
            onLayout={onLayoutRootView}
        >
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='game' options={{ headerTitle: '', headerTintColor: '#fff', headerTransparent: true, }} />
        </Stack>
    )
}