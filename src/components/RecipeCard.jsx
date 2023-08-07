import supabase from "../client"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from "react"

const RecipeCard = ({ recipe }) => {

  const [recipeImage, setRecipeImage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const { data } = supabase
      .storage
      .from('Images')
      .getPublicUrl(recipe.created_by + '/' + recipe.recipe_image)

      setRecipeImage(data.publicUrl)
  }, []) 

  const handleDelete = async () => {

    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', recipe.id)
      window.location.reload()
  }

    return (
        <div className="relative flex flex-col col-1 justify-center rounded-lg p-2 bg-slate-100" >
          <div className="flex flex-col mb-3" onClick={() => navigate("/" + recipe.id)}>
            <img src={recipeImage} className="self-center" width="100" height="100" />
            <h3 className="text-2xl font-bold" >{recipe.name}</h3>
          </div>
          <div className="flex justify-around">
            <button className="rounded bg-green-400 px-6 pb-2 pt-2.5 text-l font-medium uppercase leading-normal text-neutral-800" onClick={() => navigate("/edit/" + recipe.id)}>Edit</button>
            <button className="rounded bg-red-400 px-6 pb-2 pt-2.5 text-l font-medium uppercase leading-normal text-neutral-800" onClick={handleDelete}>Delete</button>
          </div>
        </div>
    );
  }

export default RecipeCard