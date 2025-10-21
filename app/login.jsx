import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  ImageBackground, 
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import whispLogo from '@/assets/images/whisp.png';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing Info', 'Please fill in both fields.');
      return;
    }

    // Example login check
    if (email === 'admin' && password === 'admin') {
      Alert.alert('Welcome!', 'You are now signed in.');
      router.push('/(tabs)/home');
    } else {
      Alert.alert('Invalid Login', 'Email or password is incorrect.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={whispLogo} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <Text style={styles.appTitle}>Whisp</Text>
            <Text style={styles.tagline}>Sign in to continue sharing your voice</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ccc"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.textButtonLabel}>Create a new account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
              <Text style={styles.textButtonLabel}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#000' },
  image: { flex: 1, justifyContent: 'center' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'space-between',
    paddingVertical: 60,
    alignItems: 'center',
  },
  headerContainer: { alignItems: 'center', marginTop: 40 },
  appTitle: {
    fontSize: 60,
    color: '#FFA500',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  tagline: { fontSize: 18, color: '#fff', marginTop: 8, textAlign: 'center', paddingHorizontal: 30 },
  formContainer: { width: '85%', alignItems: 'center', gap: 16 },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    color: '#fff',
    marginBottom: 12,
    fontSize: 16,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#FFA500',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { color: '#000', fontSize: 18, fontWeight: '600' },
  textButtonLabel: { color: '#ccc', fontSize: 16, textDecorationLine: 'underline', marginTop: 8 },
});
