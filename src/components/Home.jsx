import { useNavigate } from 'react-router-dom'
import supabase from '../client'
import RecipesList from './RecipesList'

function Home({user, userId}) {

  const navigate = useNavigate()

    function handleLogout() {
        async function handleLogout() {
          const { } = await supabase.auth.signOut()
          localStorage.clear()
          window.location.reload()
        }
        handleLogout()
      }

    return (
      <>
        <nav className="w-full flex justify-end items-center gap-4 bg-slate-800 p-2">
              <h1 className="text-center text-white font-extrabold text-xl">Hello {user}!</h1>
              <button className="bg-white p-2 rounded-lg text-black font-bold cursor-pointer" onClick={handleLogout}>Log out</button>
            </nav>
          <RecipesList userId={userId}/>
      </>
    );
  }

  export default Home