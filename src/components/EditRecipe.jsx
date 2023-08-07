import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../client";

const EditRecipe = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [prep, setPrep] = useState("")

  useEffect(() => {
    async function fetchData() {
      const { data, error }  = await supabase
      .from('recipes')
      .select()
      .eq('id', id)
      .single()
      setName(data.name),
      setIngredients(data.ingredients),
      setPrep(data.prep)
      
    }
    fetchData()
  }
  , [])

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const { } = await supabase
      .from('recipes')
      .update({ name:name, ingredients:ingredients, prep:prep })
      .eq('id', id)
  
      navigate('..')
  
  }

    return (
      <div className="h-screen flex flex-col justify-center items-center p-2">
        <button className="self-end" onClick={() => {navigate('..')}}>X</button>
        <form style={{"--tw-bg-opacity": 0.5}} className="flex flex-col justify-center items-center w-3/4 gap-5 px-2 py-4 mb-2 bg-slate-100 rounded-lg" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
          <label>Ingredients:</label>
          <textarea rows={5} cols={50} name="ingredients" placeholder="Separate ingredients by Enter" value={ingredients} onChange={(e) => setIngredients(e.target.value)}/>
          <label>Preparation:</label>
          <textarea rows={5} cols={50} name="prep" placeholder="Separate preparation steps by Enter" value={prep} onChange={(e) => setPrep(e.target.value)}/>
          {/*<input type="file"></input>*/}
          <button className="rounded bg-green-400 px-6 pb-2 pt-2.5 text-l font-medium uppercase leading-normal text-neutral-800" type="submit">Save changes</button>
        </form>
    </div>
    );
  }

export default EditRecipe