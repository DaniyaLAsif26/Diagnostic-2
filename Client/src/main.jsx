import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      staleTime : 1 *60*1000,
      gcTime : 10*60*1000
    }
  }
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <StrictMode>
      <App />
  </StrictMode>
  </QueryClientProvider>
)
