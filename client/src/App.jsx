import { Outlet } from "react-router-dom";
import NavBar from './component/nav/NavBar'
import Footer from "./component/footer/Footer";


export default function App() {
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
