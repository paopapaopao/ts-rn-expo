import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomePage = () => {
  return <Link href='/posts'>Posts Page</Link>;
};

export default HomePage;
