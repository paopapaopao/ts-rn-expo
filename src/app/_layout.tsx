import { Stack } from 'expo-router';

import Provider from '@/provider';

const Layout = () => {
  return (
    <Provider>
      <Stack>
        <Stack.Screen
          name='(tabs)'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='posts/[id]'
          options={{ title: 'Post Details' }}
        />
        <Stack.Screen
          name='posts/form'
          options={{ title: 'Post Form' }}
        />
      </Stack>
    </Provider>
  );
};

export default Layout;
