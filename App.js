import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { StyleSheet, Text, View } from 'react-native'
import { Main } from './src/components/Main'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
  })
  
  return (
    <View style={styles.container}>
      <Main />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
