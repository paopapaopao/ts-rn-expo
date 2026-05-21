import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { PostCard } from '@/components';
import { Post } from '@/lib/types';

const styles = StyleSheet.create({
  card: {
    padding: 8,
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  spacer: {
    height: 16,
  },
  header: {
    marginBlockEnd: 16,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    marginBlockStart: 16,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  empty: {
    alignSelf: 'center',
    fontSize: 24,
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

const PostsPage = () => {
  const {
    isPending,
    isError,
    error,
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `https://dummyjson.com/posts?limit=10&skip=${pageParam}&select=id,title,body`,
      );

      const data: {
        posts: Post[];
        total: number;
        skip: number;
        limit: number;
      } = await response.json();

      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const skip = lastPage.skip + 10;
      const pageParam = skip < lastPage.total ? skip : null;

      return pageParam;
    },
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (isPending) {
    return (
      <View style={styles.loadingView}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loadingView}>
        <Text style={styles.loadingText}>{`Error: ${error?.message}`}</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item: post }) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            asChild
          >
            <Pressable style={styles.card}>
              <PostCard post={post} />
            </Pressable>
          </Link>
        )}
        ItemSeparatorComponent={<View style={styles.spacer} />}
        ListHeaderComponent={<Text style={styles.header}>Post List</Text>}
        ListFooterComponent={
          posts.length > 0 ? (
            <Text style={styles.footer}>End of List</Text>
          ) : null
        }
        ListEmptyComponent={<Text style={styles.empty}>No Post(s) found</Text>}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

export default PostsPage;
