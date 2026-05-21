import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PostCard } from '@/components';
import { Post } from '@/lib/types';

const styles = StyleSheet.create({
  header: {
    marginBlockEnd: 16,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    padding: 8,
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
});

const PostPage = () => {
  const { id } = useLocalSearchParams();

  const { data } = useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await fetch(
        `https://dummyjson.com/posts/${id}?limit=32&select=id,title,body`,
      );

      const post: Post = await response.json();

      return post;
    },
    initialData: null,
  });

  return (
    <>
      <Text style={styles.header}>{`Post ${id} Details`}</Text>
      <View style={styles.card}>
        <PostCard post={data} />
      </View>
    </>
  );
};

export default PostPage;
