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

const { width, height } = Dimensions.get('window');

const LaunchScreen = () => {
  const handleGetStarted = () => {
    console.log('Navigate to onboarding');
  };

  const handleSignIn = () => {
    console.log('Navigate to sign in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f8fafc', '#eff6ff', '#faf5ff']}
        style={styles.backgroundGradient}
      />
      
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.headline}>
            RhythmIQ
          </Text>
          <Text style={styles.subheading}>
            Social Habit Tracking{'\n'}with AI-Powered Insights
          </Text>
        </View>

        <View style={styles.visualContainer}>
          <View style={styles.illustrationPlaceholder}>
            <View style={styles.iconGrid}>
              <View style={[styles.iconCard, styles.blueGradient]}>
                <View style={styles.iconDot} />
              </View>
              <View style={[styles.iconCard, styles.orangeGradient]}>
                <View style={styles.iconDot} />
              </View>
              <View style={[styles.iconCard, styles.greenGradient]}>
                <View style={styles.iconDot} />
              </View>
              <View style={[styles.iconCard, styles.purpleGradient]}>
                <View style={styles.iconDot} />
              </View>
            </View>
            <Text style={styles.illustrationText}>Your habits, visualized</Text>
          </View>
        </View>

        <View style={styles.ctaSection}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#3b82f6', '#06b6d4']}
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
};

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
    marginTop: height * 0.1, 
  },
  
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827', // 
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 16,
  },
  
  subheading: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  
  visualContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  
  illustrationPlaceholder: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
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

export default LaunchScreen;