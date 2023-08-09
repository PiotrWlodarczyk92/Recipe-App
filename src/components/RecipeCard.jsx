import supabase from "../client"
import { useNavigate } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {

  const navigate = useNavigate()

  const baseImageUrl = "https://bwbtvynagbvchywkzvfp.supabase.co/storage/v1/object/public/Images/" + recipe.created_by + '/' + recipe.recipe_image

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
            <img src={baseImageUrl} className="self-center" width="100" height="100" onError={(e) => e.target.src="/dish.svg"}/>
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