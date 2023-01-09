import { useState,useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./Create.css";
export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const ingredientInput  = useRef(null)
  // ingredient ka array ke liye bhi ek state banani padegi
  const [ingredients, setIngredients] = useState([]);

  const {postData , data , error} = useFetch('http://localhost:3000/recipes','POST')
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault();
    postData({title,ingredients,method , cookingTime : cookingTime + ' minutes'})
    
  };
  const handleAdd = (e) =>{
    e.preventDefault()
    const ing  = newIngredient.trim() // agar age peeche koi space hoga toh usse trim kr dega
    if(ing && !ingredients.includes(ing)){
        setIngredients(prevIngredients => [...prevIngredients,ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus() // baar baar click nhi krna padega input field mein

  }

  // redirect the user  when we get data response
  useEffect(() => {
    if(data){
        history.push("/")

    }

  },[data,history])
  return (
    <div className="create">
      <h2 className="page-title">Add a new recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        {/* ingredients go here */}
        <label>
          <span>Recipe Ingredients</span>
          <div className="ingredients">
            <input type="text" 
            onChange={(e)=> setNewIngredient(e.target.value)}
            value = {newIngredient}
            ref = {ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>Add</button>
          </div>
        </label>
        <p>Current Ingredients: {ingredients.map(i=><em key={i}>{i},</em>)}</p>

        <label>
          <span>Recipe Method</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking Time:(minutes)</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">submit</button>
      </form>
    </div>
  );
}
