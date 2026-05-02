import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: '0.875rem',
            borderRadius: '12px',
            border: '1.5px solid #F2DDE8',
            boxShadow: '0 8px 24px rgba(21,10,16,0.1)',
            color: '#150A10',
            padding: '0.75rem 1rem',
          },
          success: {
            iconTheme: { primary: '#F72585', secondary: '#FFE0EF' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fef2f2' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
