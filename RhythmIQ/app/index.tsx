// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to launch screen on app start
  return <Redirect href="/(auth)/launch" />;
}