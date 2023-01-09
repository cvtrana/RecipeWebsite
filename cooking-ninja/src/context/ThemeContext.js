import { createContext ,useReducer } from "react";
export const ThemeContext = createContext();
const themeReducer =(state,action)=>{
    // sara state logic yha likha jayega
    switch (action.type){
        case 'CHANGE_COLOR' :
            return {...state ,color : action.payload}

        case 'CHANGE_MODE' :
            return {...state , mode :action.payload} // always spread the state

        default :
            return state
    }


}
export function ThemeProvider({ children }) {
    // custom logic likh skta idhr ,  islie theme provider banana jaruri hai
    const [state,dispatch] = useReducer(themeReducer,{
        color:'#58249c',
        mode:'dark'
    })
    const changecolor = (color) =>{
        dispatch({type:'CHANGE_COLOR',payload : color})

    }
    const changeMode = (mode) =>{
        dispatch({type:'CHANGE_MODE',payload:mode})

    }
  return (
    <ThemeContext.Provider value={{ ...state , changecolor , changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
