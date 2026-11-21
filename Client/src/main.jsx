import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@fontsource-variable/figtree'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux'
import { store } from './app/store.js'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 26 * 1000,
      gcTime: 3 * 60 * 1000
    }
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
      </StrictMode>
    </QueryClientProvider>
  </Provider>
)
