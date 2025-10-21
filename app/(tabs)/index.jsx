import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { useRouter } from 'expo-router';  // ✅ Import router
import whispLogo from '@/assets/images/whisp.png';

const HomeScreen = () => {
  
  const router = useRouter(); // ✅ Use Expo Router navigation

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" />
      <ImageBackground 
        source={whispLogo}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <Text style={styles.appTitle}>Whisp</Text>
            <Text style={styles.tagline}>Where your voice finds its echo.</Text>
          </View>

          <View style={styles.buttonContainer}>
            {/* ✅ Use router.push() instead of navigation.navigate() */}
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]} 
              onPress={() => router.push('/login')}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]} 
              onPress={() => router.push('/register')}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.textButton}
              onPress={() => router.push('/(tabs)/home')}
            >
              <Text style={styles.textButtonLabel}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  appTitle: {
    fontSize: 60,
    color: '#FFA500',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  buttonContainer: {
    width: '85%',
    alignItems: 'center',
    gap: 16,
    marginBottom: 40,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FFA500',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  textButton: {
    marginTop: 8,
  },
  textButtonLabel: {
    color: '#ccc',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
