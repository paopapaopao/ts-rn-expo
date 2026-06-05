import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { PostCard, PostCardSkeleton } from '@/components';
import { Post } from '@/lib/types';

const styles = StyleSheet.create({
  page: {
    padding: 8,
    flex: 1,
  },
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
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  fabView: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    gap: 4,
  },
  fab: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: 'gray',
  },
});

const ItemSeparatorComponent = () => <View style={styles.spacer} />;
const ListHeaderComponent = () => <Text style={styles.header}>Post List</Text>;

const HomePage = () => {
  const {
    isPending,
    isError,
    error,
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `https://dummyjson.com/posts?limit=10&skip=${pageParam}&select=id,title,body`,
      );

      const data: {
        posts: Post[];
        skip: number;
        limit: number;
        total: number;
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

  const [isShown, setIsShown] = useState(false);
  const flatListRef = useRef<FlatList<Post>>(null);

  const router = useRouter();

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
      <View style={styles.errorView}>
        <Text style={styles.errorText}>{`Error: ${error?.message}`}</Text>
      </View>
    );
  }

  const posts = data.pages.flatMap((page) => page.posts);

  return (
    <View style={styles.page}>
      <FlatList
        ref={flatListRef}
        onScroll={(event) => {
          const offSetY = event.nativeEvent.contentOffset.y;

          setIsShown(offSetY > 400);
        }}
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
        refreshing={isRefetching}
        onRefresh={refetch}
      />
      <View style={styles.fabView}>
        {isShown && (
          <Pressable
            style={styles.fab}
            onPress={() => {
              flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            }}
          >
            <MaterialDesignIcons
              name='chevron-double-up'
              size={24}
              color='white'
            />
          </Pressable>
        )}
        <Pressable
          style={styles.fab}
          onPress={() => {
            router.push('/posts/form');
          }}
        >
          <MaterialDesignIcons
            name='plus'
            size={24}
            color='white'
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HomePage;
