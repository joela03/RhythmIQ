import { View, Text, SafeAreaView, ScrollView, StyleSheet, KeyboardAvoidingView, Dimensions, Platform } from 'react-native';

export default function SignUp() {

  const { width, height } = Dimensions.get('window')
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View>
            <Text>Sign Up</Text>
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
});