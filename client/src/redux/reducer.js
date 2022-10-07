
import { GET_POKEMONS } from "./actions";

const initialState = {
  allPokemons: [],
  pokemons: [],
  types: [],
  details: [],
};


export default function rootReducer(state = initialState, action) {

    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons:action.payload,
                allPokemons:action.payload
            }
            default: return state
    }
  
}

