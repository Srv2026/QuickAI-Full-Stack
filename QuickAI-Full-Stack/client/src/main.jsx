
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

console.log('Environment check:', {
  hasKey: !!PUBLISHABLE_KEY,
  keyLength: PUBLISHABLE_KEY?.length,
  keyPrefix: PUBLISHABLE_KEY?.substring(0, 7),
  baseUrl: import.meta.env.VITE_BASE_URL
})

if (!PUBLISHABLE_KEY) {
  console.error('⚠️ Missing Publishable Key. Please check your .env file.')
  console.error('Current env vars:', import.meta.env)
  console.error('📝 Create a .env file in the client/ directory with VITE_CLERK_PUBLISHABLE_KEY')
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found! Make sure index.html has a div with id="root"')
}

if (!PUBLISHABLE_KEY) {
  // Show configuration error message
  rootElement.innerHTML = `
    <div style="padding: 40px; font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; border: 2px solid #ff6b6b; border-radius: 8px; background: #fff5f5;">
      <h1 style="color: #c92a2a; margin-top: 0;">⚠️ Configuration Required</h1>
      <p style="color: #495057; line-height: 1.6;">
        The application requires Clerk authentication to be configured.
      </p>
      <p style="color: #495057; line-height: 1.6;">
        Please create a <code style="background: #f1f3f5; padding: 2px 6px; border-radius: 3px;">.env</code> file in the <code style="background: #f1f3f5; padding: 2px 6px; border-radius: 3px;">client/</code> directory with:
      </p>
      <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto; border-left: 3px solid #c92a2a;"><code>VITE_CLERK_PUBLISHABLE_KEY=your_key_here
VITE_BASE_URL=http://localhost:3000</code></pre>
      <p style="color: #495057; line-height: 1.6;">
        See <code style="background: #f1f3f5; padding: 2px 6px; border-radius: 3px;">SETUP.md</code> for detailed instructions.
      </p>
    </div>
  `
} else {
  try {
    createRoot(rootElement).render(
      <React.StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ClerkProvider>
      </React.StrictMode>
    )
    console.log('App rendered successfully')
  } catch (error) {
    console.error('Error rendering app:', error)
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial; color: red;">
        <h1>Error Loading App</h1>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `
  }
}
