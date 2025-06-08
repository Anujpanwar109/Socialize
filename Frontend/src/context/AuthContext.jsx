import React , {createContext, useState, useContext,useEffect} from "react";

import { authApi } from "../services/api";

let AuthContext=createContext()

export const AuthProvider=({children})=>{
 const [user,setUser]=useState(null)
 const [loading,setLoading]=useState(true)

 //Check for existing token on mount

 useEffect(()=>{
    const token =localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if(token && savedUser && savedUser !== "undefined"){
        setUser(JSON.parse(savedUser))
    }
    setLoading(false)
 },[])

 const signup=async(name,email,password) => {
    try{
        const response=await authApi.signup({name,email,password})
        //       let user = {
        //     id: response.data.data._id,
        //     name: response.data.data.name, 
        //     email:  response.data.data.email,

        // }
        // let token =  response.data.data.token

        const {user,token}=response.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        setUser(user)
        return { success: true }
    }

     catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: error.response?.data?.message || 'Signup failed' }
    }
 }



 const login= async (email,password)=>{
    try{
        const response=await authApi.login({email,password})
        
        let user = {
            id: response.data.data._id,
            name: response.data.data.name, 
            email:  response.data.data.email,

        }
        let token =  response.data.data.token
        

        localStorage.setItem('token',token)
        localStorage.setItem('user',JSON.stringify(user))

        setUser(user)

        return {success:true}
    }catch(error){
        console.error('Login error:', error)
        return{success:false, error:error.response?.data?.message || 'Login failed'}

    }
 }

 const logout = async()=>{
    try{
        await authApi.logout()

    }
    catch(error){
        console.error('Logout error:',error)
    }
    finally{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }
 }
 return(
    <AuthContext.Provider value={{user,login,signup,logout,loading}}>
        {children}
    </AuthContext.Provider>
 )
}
 export const useAuth =()=>useContext(AuthContext)



