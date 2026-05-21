import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSX } from 'react';

type Props = { children: JSX.Element };

const queryClient = new QueryClient();

const Provider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
