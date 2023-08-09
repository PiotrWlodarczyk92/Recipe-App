import supabase from '../client'
import { useState } from 'react'

function AddRecipe({ setAddModal, userId }) {

    const [formData, setFormData] = useState({
        name:'',
        ingredients:'',
        prep:''
      })

      const [addRecipeError, setAddRecipeError] = useState(false)

    const fileName = Date.now()
      function handleChange(e) {
        setFormData((prevFormData) => {
          return{
            ...prevFormData,
            [e.target.name]:e.target.value
          }
        })
      }

      async function uploadImage(e) {
        let file = e.target.files[0];

        const { data, error } = await supabase
        .storage
        .from('Images')
        .upload(userId + '/' + fileName, file)
      }


      async function handleSubmit(e) {

        e.preventDefault()

        if (!formData.name || !formData.ingredients || !formData.prep) {
        setAddRecipeError(true)
    
        } else {

         setAddRecipeError(false) 
          const { } = await supabase
        .from('recipes')
        .insert({ created_by: userId, name:formData.name, ingredients:formData.ingredients, prep:formData.prep, recipe_image:fileName })

        setAddModal(false)
        window.location.reload()
        }
      }


    return (
    <div className="absolute h-screen w-full flex items-center justify-center z-10">
        <form className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg" onSubmit={handleSubmit}>
            <button className="self-end" onClick={() => {setAddModal(false)}}>X</button>
            <label className="self-start font-bold">Name</label>
            <input type="text" id="name" name="name" placeholder="" className="" onChange={handleChange}/>
            <label className="self-start font-bold">Ingredients</label>
            <textarea id="ingredients" name="ingredients" placeholder="" className="" onChange={handleChange}/>
            <label className="self-start font-bold">Prep</label>
            <textarea id="prep" name="prep" placeholder="" className="" onChange={handleChange}/>
            <input type="file" id='image' name='image' onChange={(e) => uploadImage(e)}></input>
            {addRecipeError
            ? <span className="font-bold text-red-700">Please fill all the informations.</span>
            : null}
            <button type="submit" className="bg-slate-500 p-4 rounded-lg text-black font-bold cursor-pointer">Add recipe</button>
        </form>
    </div>
    )
  }
  
  export default AddRecipe