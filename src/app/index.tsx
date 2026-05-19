import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  page: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomePage = () => {
  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style='auto' />
      <Link href='/posts'>Posts Page</Link>
    </SafeAreaView>
  );
};

export default HomePage;
