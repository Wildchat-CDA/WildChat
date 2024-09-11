import App2 from './App2.tsx' 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import React from 'react'
import { RoomProvider } from './context/RoomContext.tsx'
import {Home} from './page/Home.tsx'
import { Room } from './page/Room.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path= "/room/:id" element ={<Room />} />
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  </StrictMode>
)