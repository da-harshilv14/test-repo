import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import SignUpp from './SignUpp.jsx'
import Hello from './Hello.jsx'
import Signup from './Signup.jsx'
import Try from './Try.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignUpp />
  </StrictMode>,
)
