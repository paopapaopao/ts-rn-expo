import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  page: {
    padding: 8,
    flex: 1,
  },
});

const Layout = () => {
  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style='auto' />
      <Slot />
    </SafeAreaView>
  );
};

export default Layout;
