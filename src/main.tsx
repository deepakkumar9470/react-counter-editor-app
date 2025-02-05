import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from "@/components/ui/provider";
import { Provider as ReduxProvider } from "react-redux";
import { store } from './store/store.ts';
import { ClerkProvider } from '@clerk/clerk-react';
import { ColorModeProvider } from "@/components/ui/color-mode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file');
}

createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <Provider>
            <Toaster />
            <App />
          </Provider>
        </ClerkProvider>
      </ColorModeProvider>
    </ChakraProvider>
  </ReduxProvider>
);
