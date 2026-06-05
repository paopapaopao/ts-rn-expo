import { Button, StyleSheet, View } from 'react-native';

import Input from '../Input';

const styles = StyleSheet.create({
  view: { gap: 16 },
});

const PostForm = () => {
  const handlePress = () => {};

  return (
    <View style={styles.view}>
      <Input label='Title' />
      <Input
        label='Body'
        multiline
        style={{ height: 100 }}
      />
      <Button
        title='Create Post'
        onPress={handlePress}
      />
    </View>
  );
};

export default PostForm;
