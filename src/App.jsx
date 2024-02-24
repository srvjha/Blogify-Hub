import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { login,logout } from './store/authSlice'
import authService from './appwrite/auth'
import blogHome from './assets/blogHome.jpg'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'


function App() {
  const [loading,setLoading] = useState(true)
  const dispatch  = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData)
      {
        dispatch(login({userData}))
        console.log("Login")
      }
      else{
        dispatch(logout())
        console.log("Logout")
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading?(
    <div className=" min-h-screen flex flex-wrap content-between bg-gradient-to-r from-zinc-900 to-indigo-900  bg-cover">
      <div className="w-full block">
       <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
