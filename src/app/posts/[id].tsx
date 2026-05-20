import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  header: {
    marginBlockEnd: 16,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const PostPage = () => {
  const { id } = useLocalSearchParams();

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const readPost = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/posts/${id}?limit=32&select=id,title,body`,
        );

        const post: Post = await response.json();

        setPost(post);
      } catch (error) {
        console.error(`readPost: ${error}`);
      }
    };

    readPost();
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style='auto' />
      <Text style={styles.header}>{`Post ${id} Details`}</Text>
      <View style={styles.card}>
        <Text style={styles.title}>{post?.title}</Text>
        <Text style={styles.body}>{post?.body}</Text>
      </View>
    </SafeAreaView>
  );
};

export default PostPage;
