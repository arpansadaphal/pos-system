import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWJhN2MzMzI0OWFjYmIyNDBiODUwZSIsInJvbGUiOiJDQVNISUVSIiwiaWF0IjoxNzc3NDU3ODI5LCJleHAiOjE3Nzc1NDQyMjl9.JmawOuzFANUvsFxsMVOdOinikgLHlbpx97HVWLrS27U");
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
