import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Provider from '@/provider';

const styles = StyleSheet.create({
  page: {
    padding: 8,
    flex: 1,
  },
});

const Layout = () => {
  return (
    <Provider>
      <SafeAreaView style={styles.page}>
        <StatusBar style='auto' />
        <Slot />
      </SafeAreaView>
    </Provider>
  );
};

export default Layout;
