import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Signup from './Signup.jsx'
import SignUpp from './SignUpp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Signup />
  </StrictMode>,
)
