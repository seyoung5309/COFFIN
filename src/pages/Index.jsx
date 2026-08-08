import Footer from "../components/Footer"
import Header from "../components/Header"
import Slider from "../components/Slider"
import Caffeine_chart from "../pages/Caffeine_chart"
import About_Page from "./About_Page"
import Coffee_Collection from "./Coffee_Collection"
import Quick_Link from "./Quick_Link"
function index() {

  return (
    <>
      <Header/>
      <Slider/>
      <Caffeine_chart/>
      <Coffee_Collection/>
      <About_Page/>
      <Quick_Link/>
      <Footer/>
    </>
  )
}

export default index