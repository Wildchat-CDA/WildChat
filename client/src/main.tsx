import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import './index.css'
import React from 'react'
import { RoomProvider } from './context/RoomContext.tsx'
import App from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <App/>
      </RoomProvider>
    </BrowserRouter>
  </StrictMode>
)
