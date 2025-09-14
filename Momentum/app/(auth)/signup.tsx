import React, { useState } from 'react';
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View,
  Text,
  SafeAreaView,
  ScrollView, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Dimensions, 
  Platform,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window');

export default function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSignUp = () => {
      setEmailError('');
      setIsLoading(true);
      
      if (!email.trim()) {
        setEmailError('Please enter your email address');
        setIsLoading(false);
        return;
      }
      
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }
      
      if (password.length < 8) {
        setEmailError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }
  
      try {
        const API_URL = 'http://localhost:8000';

        const response = await fetch (`${API_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        });
        
        const data = await response.json();

          if (response.ok) {
            await handleLoginAfterSignup(email.trim(), password);
          } else {
            setEmailError(data.detail || 'Signup failed. Please try again.');
          }
        } catch (error) {
          console.error('Signup error:', error);
          setEmailError('Network error. Please check your connection.');
        } finally {
          setIsLoading(false);
        }
      }
    };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
      <LinearGradient
          colors={['#faf7ff', '#f3f0ff', '#eef2ff']}
          style={styles.backgroundGradient}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.heroSection}>
            <View style={styles.brandContainer}>
              <Text style={styles.brandName}>Momentum</Text>
              <View style={styles.brandAccent}/>
              <Text style={styles.headline}>
                Build better habits{'\n'}with your AI Coach
              </Text>
              <Text style={styles.subheading}>
                Transform your life with personalised insights and social accountability
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.socialButtonContent}>
                <Ionicons name="logo-google" size={20} color="#4285F4"/>
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#6B7280" 
                />
            </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  backgroundGradient: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
},

  heroSection: {
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: 30,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
    letterSpacing: 1,
  },
  brandAccent: {
    width: 40,
    height: 3,
    color: '#7c3aed',
    borderRadius: 2,
    marginTop: 5,
  },
  headline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
    socialButton: {
    width: '100%',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  socialButtonContent: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 12,
  },
  googleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
  },
    textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  passwordInput: {
    paddingRight: 55,
  },
  passwordToggle: {
    position: 'absolute',
    right: 20,
    top: 18, 
    padding: 5,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
});