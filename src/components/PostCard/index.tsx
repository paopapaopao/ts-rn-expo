import { StyleSheet, Text } from 'react-native';

import { Post } from '@/lib/types';

type Props = { post: Post | null };

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
  },
});

const PostCard = ({ post }: Props) => {
  return (
    <>
      <Text style={styles.title}>{post?.title}</Text>
      <Text style={styles.body}>{post?.body}</Text>
    </>
  );
};

export default PostCard;
