import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ChargeSplitPage from '@/site'
import '@/site/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChargeSplitPage />
  </StrictMode>,
)
