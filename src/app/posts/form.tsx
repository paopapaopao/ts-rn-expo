import { StyleSheet, Text, View } from 'react-native';

import { PostForm } from '@/components';

const styles = StyleSheet.create({
  page: {
    padding: 8,
    flex: 1,
  },
});

const PostFormPage = () => {
  return (
    <View style={styles.page}>
      <PostForm />
    </View>
  );
};

export default PostFormPage;
