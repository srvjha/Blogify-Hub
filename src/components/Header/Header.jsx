import React from 'react'
import {Container,LogoutBtn,Logo} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userLogo from '../../assets/avatar.png'



function Header() {
  const authStatus = useSelector((state)=>state.auth.status)
  const userData = useSelector(state=>state.auth.userData)
  const navigate = useNavigate()
  const navItems = [
    {
      name:'Home',
      slug:'/',
      active:true
    },
    {
      name:'Login',
      slug:'/login',
      active:!authStatus,
    },
    {
      name:'SignUp',
      slug:'/signup',
      active:!authStatus,
    },
    {
      name:'All Posts',
      slug:'/all-posts',
      active:authStatus,
    },
    {
      name:'Add Post',
      slug:'/add-post',
      active:authStatus,
    },
  ]
  return (
   <header className=' bg-opacity-75 backdrop-blur-lg shadow-lg py-2 '>
    <Container>
      <nav className="flex">
        <div className="mr-4">
          <Link to='/'>
          <Logo/>
          </Link>
        </div>
        <ul className='flex mr-auto text-center'>
         {navItems.map((item)=>
         item.active?(
          <li key={item.name}>
           <button
           onClick={()=>navigate(item.slug)}
           className='inline-block px-6 py-2 duration-200  hover:bg-yellow-300 hover:text-black rounded-full text-white text-xl'
           >{item.name}</button>
          </li>
         ):null
         )}
         <div className=' ml-96 flex'>
         {authStatus && (
          <>
          <img src={userLogo} className=' w-10 h-10 ' />    
          <div className=' font-semibold md:text-left text-white mt-10 -ml-[50px] '>
            {userData.name}</div>
          </>
         )}
         {authStatus && (
          
          <li>
            <LogoutBtn/>
          </li>
         )}
         </div>
         
        </ul>

      </nav>
    </Container>
   </header>
  )
}

export default Header