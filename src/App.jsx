// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index"
import Promotion from "./pages/Promotion"
import Cafe_Details from "./pages/Cafe_Details"
import Map from "./pages/Map";
import Coming_Soon from "./pages/Coming_Soon";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/cafe-details" element={<Cafe_Details />} />
        <Route path="/map" element={<Map />} />
        {/* 아직 페이지가 없는 메뉴는 준비 중 화면으로 연결 */}
        <Route path="/promotion/register" element={<Coming_Soon title="프로모션 등록을 준비 중이에요" />} />
        <Route path="/caffeine-chart" element={<Coming_Soon title="카페인 차트를 준비 중이에요" />} />
        <Route path="/coffee/:id" element={<Coming_Soon title="커피 상세 페이지를 준비 중이에요" />} />
        <Route path="*" element={<Coming_Soon title="페이지를 찾을 수 없어요" desc="주소가 맞는지 확인해 주세요." />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
