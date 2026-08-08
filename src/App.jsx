// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index"
import Promotion from "./pages/Promotion"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/promotion" element={<Promotion/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
