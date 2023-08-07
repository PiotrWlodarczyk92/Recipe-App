import supabase from "../client";
import { useState, useEffect } from "react";
import AddRecipe from "./AddRecipe";
import RecipeCard from "./RecipeCard";

function RecipesList({ userId }) {

    const [recipes, setRecipes] = useState([])
    const [addModal, setAddModal] = useState(false)

    useEffect(() => {
        async function fetchRecipes() {  
            const { data, error }  = await supabase
              .from('recipes')
              .select()
              .eq('created_by', userId)
              
              if (data) {
                setRecipes(data)
              }
              if (error) {
                return
              }
              
              
          }
          fetchRecipes()
        
    }, [userId])



 return (
    <div className="relative h-screen w-full flex flex-col items-center">
        {addModal && <AddRecipe setAddModal={setAddModal} userId={userId} />}
        <button className="flex justify-start p-2 my-4 rounded-lg bg-green-400 text-l font-bold" onClick={() => {setAddModal(true)}}>Add Recipe</button>
    {recipes.length > 0 
        ? <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe}/>
        ))}
        </div>
            
          :              
           <span className=" text-center self-center font-bold">It seems you don't have any recipes yet. Add a recipe by clicking button above.</span>
            
    }
    </div>
 )
}

export default RecipesList