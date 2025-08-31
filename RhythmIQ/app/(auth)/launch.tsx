import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Launch() {
  const handleGetStarted = () => {
    router.push('/(auth)/signup');
  };

  const handleSignIn = () => {
    console.log('Navigate to sign in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#faf7ff', '#f3f0ff', '#eef2ff']}
        style={styles.backgroundGradient}
      />
      
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandName}>RhythmIQ</Text>
            <View style={styles.brandAccent} />
          </View>
          
          <Text style={styles.headline}>
            Social Habit Tracking{'\n'}with AI-Powered Insights
          </Text>
          
          <Text style={styles.subheading}>
            Join friends to keep each other accountable and stay consitent with AI
          </Text>
        </View>

        <View style={styles.visualContainer}>
          <View style={styles.illustrationPlaceholder}>
            <View style={styles.iconGrid}>
              <View style={[styles.iconCard, styles.purpleGradient]}>
                <View style={styles.iconDot} />
              </View>
              <View style={[styles.iconCard, styles.indigoGradient]}>
                <View style={styles.iconDot} />
              </View>
              <View style={[styles.iconCard, styles.violetGradient]}>
                <View style={styles.iconDot} />
              </View>
              <View style={[styles.iconCard, styles.blueGradient]}>
                <View style={styles.iconDot} />
              </View>
            </View>
            <Text style={styles.illustrationText}>Your habits, intelligently tracked</Text>
          </View>
        </View>

        <View style={styles.ctaSection}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#7c3aed', '#8b5cf6']}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleSignIn}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryLink}>
              Already have an account? <Text style={styles.signInText}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  
  heroSection: {
    alignItems: 'center',
    marginTop: height * 0.08,
  },
  
  brandContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  
  brandName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6366f1',
    letterSpacing: 1.5,
  },
  
  brandAccent: {
    width: 50,
    height: 4,
    backgroundColor: '#7c3aed',
    borderRadius: 2,
    marginTop: 8,
  },
  
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 12,
  },
  
  subheading: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 15,
  },
  
  visualContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  
  illustrationPlaceholder: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
    shadowColor: '#7c3aed',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    alignItems: 'center',
    position: 'relative',
  },
  
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  
  iconCard: {
    width: 50,
    height: 50,
    borderRadius: 12,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  blueGradient: {
    backgroundColor: '#3b82f6',
  },
  
  orangeGradient: {
    backgroundColor: '#f97316',
  },
  
  greenGradient: {
    backgroundColor: '#10b981',
  },
  
  purpleGradient: {
    backgroundColor: '#8b5cf6',
  },

  indigoGradient: {
    backgroundColor: '#4B0082',
  },

  violetGradient: {
    backgroundColor: '#7F00FF',
  },

  
  iconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  
  illustrationText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  
  ctaSection: {
    alignItems: 'center',
    marginBottom: 40,
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
  
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  
  secondaryLink: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  
  signInText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
});