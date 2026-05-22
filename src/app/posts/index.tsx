import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { PostCard, PostCardSkeleton } from '@/components';
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

const ItemSeparatorComponent = () => <View style={styles.spacer} />;
const ListHeaderComponent = () => <Text style={styles.header}>Post List</Text>;

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
      <FlatList
        data={Array.from({ length: 10 }, (_, index) => index)}
        renderItem={() => <PostCardSkeleton />}
        keyExtractor={(item) => String(item)}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={ListHeaderComponent}
      />
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
    <FlatList
      data={posts}
      renderItem={({ item: post }) => (
        <Link
          href={`/posts/${post.id}`}
          asChild
        >
          <Pressable style={styles.card}>
            <PostCard post={post} />
          </Pressable>
        </Link>
      )}
      keyExtractor={(post) => String(post.id)}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={
        hasNextPage && isFetchingNextPage ? (
          <View>
            {Array.from({ length: 10 }).map((_, index) => (
              <View key={index}>
                <ItemSeparatorComponent />
                <PostCardSkeleton />
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.footer}>End of List</Text>
        )
      }
      ListEmptyComponent={<Text style={styles.empty}>No Post(s) found</Text>}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

export default PostsPage;
