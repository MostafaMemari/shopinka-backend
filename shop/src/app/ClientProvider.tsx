'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { ReactNode } from 'react';

interface ClientProviderProps {
  children: ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
