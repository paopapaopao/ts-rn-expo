import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Post = {
  id: number;
  title: string;
  body: string;
};

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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
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
});

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const readPosts = async () => {
      try {
        const response = await fetch(
          'https://dummyjson.com/posts?limit=32&select=id,title,body',
        );

        const { posts }: { posts: Post[] } = await response.json();

        setPosts(posts);
      } catch (error) {
        console.error(`readPosts: ${error}`);
      }
    };

    readPosts();
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style='auto' />
      <FlatList
        data={posts}
        renderItem={({ item: post }) => (
          <View
            style={styles.card}
            key={post.id}
          >
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.body}>{post.body}</Text>
          </View>
        )}
        ItemSeparatorComponent={<View style={styles.spacer} />}
        ListHeaderComponent={<Text style={styles.header}>Post List</Text>}
        ListFooterComponent={
          posts.length > 0 ? (
            <Text style={styles.footer}>End of List</Text>
          ) : null
        }
        ListEmptyComponent={<Text style={styles.empty}>No Post(s) found</Text>}
      />
    </SafeAreaView>
  );
};

export default PostsPage;
