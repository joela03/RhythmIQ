import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function SignUp() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Sign Up</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});