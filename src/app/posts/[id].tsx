import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PostCard } from '@/components';
import { Post } from '@/lib/types';

const styles = StyleSheet.create({
  page: {
    padding: 8,
    flex: 1,
  },
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
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontStyle: 'italic',
  },
});

const PostPage = () => {
  const { id } = useLocalSearchParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await fetch(
        `https://dummyjson.com/posts/${id}?limit=32&select=id,title,body`,
      );

      const post: Post = await response.json();

      return post;
    },
  });

  if (isPending) {
    return (
      <View style={styles.loadingView}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error !== null) {
    return (
      <View style={styles.loadingView}>
        <Text style={styles.loadingText}>{`Error: ${error?.message}`}</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <Text style={styles.header}>{`Post ${id} Details`}</Text>
      <View style={styles.card}>
        <PostCard post={data ?? null} />
      </View>
    </View>
  );
};

export default PostPage;
