import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "../App"
import Home from "../page/Home"
import About from "../page/About"
import Blog from "../page/Blog"
import Shop from "../page/Shop"
import Contact from "../page/Contact"
import Login from "../page/Login"
import Register from "../page/Register"
import Cart from "../page/Cart"
import Wish from "../page/Wish"
import Checkout from "../page/Checkout"
import Detail from "../page/Detail"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import Profile from "../page/Profile"
import AdminHome from "../admin/page/AdminHome"
import UpdateProfile from "../page/updateProfile"




export default function Route() {
  let {user} = useContext(AuthContext)
  const isAdmin = user?.user?.role?.name === 'Admin'
  

    const router = createBrowserRouter([
        {
          path: "/",
          element : <App/>,
          children: [
            {
              path: "/",
              element: <Home/>
            },
            {
              path : "/about",
              element : <About/>
            },
            {
              path : "/blog",
              element : <Blog/>
            },
            {
              path : '/shop',
              element : <Shop/>
            },
            {
              path : '/contact',
              element : <Contact/>
            },
            {
              path : '/cart',
              element : user ? <Cart/> : <Login/>
            },
            {
              path : '/wish',
              element : user ? <Wish/> : <Login/> 
            },
            {
              path : '/detail/:id',
              element : <Detail/> 
            },
            {
              path : '/checkout',
              element : user ? <Checkout/> : <Login/>
            },
            {
              path : '/login',
              element : !user && <Login/>
            },
            {
              path : '/register',
              element  : !user && <Register/>
            },
            {
              path : '/profile',
              element : user ? <Profile/> : <Login/>
            },
            {
              path : '/admin',
              element : isAdmin ? <AdminHome/> : <Login/>
            },
            {
              path : '/update/profile/:id',
              element : <UpdateProfile/>
            }
          ]
        }
    ])
  return (
    <RouterProvider router={router} />
  )
}
