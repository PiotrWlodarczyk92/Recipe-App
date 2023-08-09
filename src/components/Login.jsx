import supabase from '../client'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ setLoginModal, setCreateModal, setSession }) {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email:'',
        password:''
      })
    const [loginError, setLoginError] = useState(false)
    
      function handleChange(e) {
        setFormData((prevFormData) => {
          return{
            ...prevFormData,
            [e.target.name]:e.target.value
          }
        })
      }

      async function handleSubmit(e) {
        e.preventDefault()

        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })
          if (error) {
            setLoginError(true)
          } else {
            setLoginModal(false)
            setSession(true)
            navigate('/')
          }
          }


    return (
    <div className="absolute h-screen w-full flex items-center justify-center">
        <form className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg" onSubmit={handleSubmit}>
            <button className="self-end" onClick={() => {setLoginModal(false)}}>X</button>
            <label className="self-start font-bold">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" className="" onChange={handleChange}/>
            <label className="self-start font-bold">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" className="" onChange={handleChange}/>
            {loginError
            ? <span className="font-bold text-red-700">Invalid user data.</span>
            : null}
            <button type="submit" className="bg-slate-500 p-4 rounded-lg text-black font-bold cursor-pointer" >Login</button>
            <p>Don't have an account? Create one <button className="font-bold underline" onClick={() => {setCreateModal(true); setLoginModal(false)}}>here</button>.</p>
        </form>
    </div>
    )
  }
  
  export default Login