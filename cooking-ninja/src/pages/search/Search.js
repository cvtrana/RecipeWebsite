import { useLocation } from 'react-router-dom'
import RecipeList from '../../components/RecipeList'
import { useFetch } from '../../hooks/useFetch'
import './Search.css'
export default function Search() {
    const queryString  = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q') // isse query ki value mil jayegi 
    // ? q = 
    const url = '  http://localhost:3000/recipes?q=' + query
    const  {error,Ispending,data} = useFetch(url)
    return(
        <div>
            <h2 className="page-title">
                Recipes including "{query}"
            </h2>
            {error && <p className='error'>{error}</p>}
            {Ispending && <p className='loading'>Loading...</p>}
            {data && <RecipeList recipes = {data}/>}
        </div>
    )
}