import { GET_USERS } from "../actions/allUser.actions";


const initialState = {};

export default function allusersReducer(state = initialState, action)
 {

    switch(action.type) {

        case GET_USERS:
            return action.payload;

            default:
                 return state;
    
 }
}
