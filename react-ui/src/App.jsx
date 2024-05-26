import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Signout from "./pages/Signout"
import Header from "./components/Header"


export default function App() {
  return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/sign-in" element={<Signin></Signin>}></Route>
      <Route path="/sign-out" element={<Signout></Signout>}></Route>
      <Route path="/about" element={<About></About>}></Route>
      <Route path="/profile" element={<Home></Home>}></Route>
      <Route path="/" element={<Profile></Profile>}></Route>
    </Routes>
    </BrowserRouter>
  )
}
