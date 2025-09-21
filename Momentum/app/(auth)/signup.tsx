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

  const handleEmailSignUp = async () => {
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
        setEmailError('Password must be at least 8 characters');
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
            await handleLogin(email.trim(), password);
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

    const handleLogin = async (email: string, password: string) => {
      try {
        const API_URL = 'http://localhost:80';

        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);

        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          await AsyncStorage.setItem('access_token', data.access_token);
          await AsyncStorage.setItem('user_data', JSON.stringify(data.user));
          
          console.log('Login successful:', data.user);
        } else {
          setEmailError(data.detail || 'Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Login error:', error);
        setEmailError('Network error. Please check your connection.');
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
          <View style={styles.socialSection}>
            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.socialButtonContent}>
                <Ionicons name="logo-google" size={20} color="#4285F4"/>
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.emailSection}>
            {emailError ? (
              <View style ={styles.errorContainer}>
                <Ionicons name="alert-circle" size={16} color="#EF4444" />
                <Text style={styles.errorText}>{emailError}</Text>
              </View>
            ) : null}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (!emailError) setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText= {(text) => {
                  setPassword(text);
                  if (emailError) setEmailError('');
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#6B7280" 
                />
            </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={[
                styles.emailButton,
                (!email || !password || isLoading) && styles.emailButtonDisabled // Conditional styling
              ]}
              onPress={handleEmailSignUp}
              disabled={!email || !password || isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={(!email || !password || isLoading) 
                  ? ['#E5E7EB', '#D1D5DB']
                  : ['#7c3aed', '#8b5cf6']
                }
                style={styles.emailButtonGradient}
              >
                <Text style={[
                  styles.emailButtonText,
                  (!email || !password || isLoading) && styles.emailButtonTextDisabled
                ]}>
                  {isLoading ? 'Creating Account...' : 'Continue with Email'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
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
    paddingHorizontal: 24,
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
    backgroundColor: '#7c3aed',
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
  socialSection: {
    marginBottom: 30,
    width: '100%',
  },
  googleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
    width: '100%',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },

  emailSection: {
    marginBottom: 30,
    width: '100%',
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
    errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
  passwordInput: {
    paddingRight: 55,
  },
  passwordToggle: {
    position: 'absolute',
    right: 20,
    top: 10, 
    padding: 5,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  primaryButton: {
    width: width - 48,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  emailButton: {
    borderRadius: 16,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  
  emailButtonDisabled: {
    shadowOpacity: 0.1, 
  },
  
  emailButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  
  emailButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
  emailButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});