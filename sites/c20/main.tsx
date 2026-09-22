import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ChargeSplitPage from '@/visions/candidates/c20-charge-split'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChargeSplitPage />
  </StrictMode>,
)
