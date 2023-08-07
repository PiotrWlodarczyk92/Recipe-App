import supabase from '../client'
import { useState } from 'react'

function CreateAccount({ setLoginModal, setCreateModal, setSession }) {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:''
      })
    
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
    
        const {} = await supabase.auth.signUp(
          {
            email: formData.email,
            password: formData.password,
            options: {
              data: {
                name: formData.name,
              }
            }
          }
        )
        setCreateModal(false)

        const {} = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })
        setSession(true)
        }


    return (
    <div className="absolute h-screen w-full flex items-center justify-center">
        <form className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg" onSubmit={handleSubmit}>
            <button className="self-end" onClick={() => {setCreateModal(false)}}>X</button>
            <label className="self-start font-bold">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" className="" onChange={handleChange}/>
            <label className="self-start font-bold">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" className="" onChange={handleChange}/>
            <label className="self-start font-bold">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" className="" onChange={handleChange}/>
            <button type="submit" className="bg-slate-500 p-4 rounded-lg text-black font-bold cursor-pointer">Create Account</button>
            <p>Already have an account? You can login <button className="font-bold underline" onClick={() => {setLoginModal(true); setCreateModal(false)}}>here</button>.</p>
        </form>
    </div>
    )
  }
  
  export default CreateAccount