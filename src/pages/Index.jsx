import Header from "../components/Header"
import Slider from "../components/Slider"
import Caffeine_chart from "../pages/Caffeine_chart"
import Coffee_Collection from "./Coffee_Collection"
function index() {

  return (
    <>
      <Header/>
      <Slider/>
      <Caffeine_chart/>
      <Coffee_Collection/>
    </>
  )
}

export default index