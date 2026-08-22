// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index"
import Promotion from "./pages/Promotion"
import Cafe_Details from "./pages/Cafe_Details"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/cafe-details" element={<Cafe_Details />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
