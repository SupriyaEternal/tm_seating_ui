import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { NATSProvider } from './contexts/NatsContext.tsx'

createRoot(document.getElementById('root')!).render(

    <StrictMode>

        <BrowserRouter>

            <NATSProvider>

                <AppProvider>

                    <AuthProvider>

                        <App />         

                    </AuthProvider>

                </AppProvider>

            </NATSProvider>
            
        </BrowserRouter>

    </StrictMode>,
)
