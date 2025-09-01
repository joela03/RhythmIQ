import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, KeyboardAvoidingView, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassweord] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.heroSection}>
            <View style={styles.brandContainer}>
              <Text style={styles.brandName}>RhythmIQ</Text>
              <View style={styles.brandAccent}/>
              <Text style={styles.headline}>
                Build better habits{'\n'}with your AI Coach
              </Text>
              <Text style={styles.subheading}>
                Transform your life with personalised insights and social accountability
              </Text>
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
});