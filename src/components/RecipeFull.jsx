import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../client";

const RecipeFull = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    prep: "",
    created_by: "",
    recipe_image: ""
  })

  useEffect(() => {
    async function fetchData() {
      const { data, error }  = await supabase
      .from('recipes')
      .select()
      .eq('id', id)
      .single()
      setRecipe({
        name: data.name,
        ingredients: data.ingredients,
        prep: data.prep,
        created_by: data.created_by,
        recipe_image: data.recipe_image
      })
    }
    fetchData()
  }
  , [])

  

      const baseImageUrl = "https://bwbtvynagbvchywkzvfp.supabase.co/storage/v1/object/public/Images/" + recipe.created_by + '/' + recipe.recipe_image

  const handleDelete = async () => {

    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id)
      navigate('..')
  }


    return (
      <div className="h-screen w-full flex flex-col justify-center p-6">
        <div style={{"--tw-bg-opacity": 0.5}} className="flex flex-col items-center gap-5 px-2 py-4 m-2 mt-0 bg-slate-100 rounded-lg">
        <button className="self-end" onClick={() => {navigate('..')}}>X</button>
          <img src={baseImageUrl} width="400" height="400" onError={(e) => e.target.src="/dish.svg"} />
          <h1 className="text-xl font-bold">{recipe.name}</h1>
          <div>
            <h3>Składniki:</h3>
            <ul className="list-disc">
              {recipe.ingredients.split(/\r?\n/).map(ingredient => (
              <li>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Przygotowanie:</h3>
            <ol className="list-decimal">
              {recipe.prep.split(/\r?\n/).map(step => (
              <li>{step}</li>
              ))}
            </ol>
          </div>
          <div className=" w-3/4 flex justify-between">
            <button className="rounded bg-green-400 px-6 pb-2 pt-2.5 text-l font-medium uppercase leading-normal text-neutral-800" onClick={() => navigate("/edit/" + id)}>Edit</button>
            <button className="rounded bg-red-400 px-6 pb-2 pt-2.5 text-l font-medium uppercase leading-normal text-neutral-800" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    );
  }

export default RecipeFull