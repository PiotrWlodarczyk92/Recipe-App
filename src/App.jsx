import './App.css'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import supabase from './client'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import RecipeFull from './components/RecipeFull'
import EditRecipe from './components/EditRecipe'

function App() {

  const [session, setSession] = useState(false)
  const [user, setUser] = useState('')
  const [userId, setUserId] = useState('')
  const [loginModal, setLoginModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession()
      if (data.session !== null) {
        setSession(true)
        setUser(data.session.user.user_metadata.name)
        setUserId(data.session.user.id)
      }   
    }
    getSession()
  }, [session, userId])


  return (
    <>
      <div className="relative bg-slate-500/50 h-screen w-screen flex flex-col items-center justify-center overflow-auto">
        {loginModal && <Login setLoginModal={setLoginModal} setCreateModal={setCreateModal} setSession={setSession}/>}
        {createModal && <CreateAccount setLoginModal={setLoginModal} setCreateModal={setCreateModal} setSession={setSession}/>}
        {session
          ? 
            <>
            <Routes>
              <Route path='/' element={<Dashboard />} />
                <Route index element={<Home user={user} userId={userId}/>} />
                <Route path='/:id' element={<RecipeFull />} />
                <Route path='/edit/:id' element={<EditRecipe />} />
            </ Routes>
            </>
          : 
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-center text-white font-extrabold text-6xl">Recipe App</h1>
              <h3 className="text-center text-white font-bold text-2xl">Keep your recipes online and access them anytime.</h3>
              <button className="bg-white p-4 rounded-lg text-black font-bold cursor-pointer" onClick={() => {setLoginModal(true)}}>Get started</button>
            </div>
            }
        </div>
    </>
  )
}

export default App
