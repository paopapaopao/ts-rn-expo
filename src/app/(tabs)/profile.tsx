import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  page: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

const ProfilePage = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>Profile Page</Text>
    </View>
  );
};

export default ProfilePage;
