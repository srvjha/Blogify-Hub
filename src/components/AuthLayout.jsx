// its a mechansim to protect pages and routes
import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Protected({children,authentication=true}) {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector((state)=>state.auth.status)
    useEffect(()=>{
        if(authentication && authStatus!=authentication)  // true && (false !=true)=>true
        {
            navigate('/login')
        }
        else if(!authentication && authStatus!=authentication)  // false && (true !=true)=>false 
        {
            navigate('/')
        }
        setLoader(false)
    },[authStatus,authentication,navigate])
  return loader?<h1>Loading...</h1>:<>{children}</>
}
