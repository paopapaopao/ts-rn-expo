import { StyleSheet, View } from 'react-native';

import Skeleton from '../Skeleton';

const styles = StyleSheet.create({
  card: {
    padding: 8,
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  body: {
    gap: 4,
  },
});

const PostCardSkeleton = () => {
  return (
    <View style={styles.card}>
      <Skeleton style={{ height: 18, width: '50%' }} />
      <View style={styles.body}>
        <Skeleton style={{ height: 16, width: '90%' }} />
        <Skeleton style={{ height: 16, width: '100%' }} />
        <Skeleton style={{ height: 16, width: '70%' }} />
        <Skeleton style={{ height: 16, width: '80%' }} />
      </View>
    </View>
  );
};

export default PostCardSkeleton;
