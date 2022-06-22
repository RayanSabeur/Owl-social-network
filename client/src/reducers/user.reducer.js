import { FOLLOW_USER,
     GET_USER, 
     UNFOLLOW_USER,
      UPDATE_BIO, 
      UPLOAD_PICTURE } from "../actions/user.action";

const initialState = {}; // etat de base de tous nos reduceur, on pourra demander de la data en back et le mettre a l'interrieur 

export default function userReducer(state = initialState, action) { // on met en parametre l'etat de base de la fonction, et une action
switch (action.type) {
case GET_USER: // -> de user.action, on fait donc un switch pour tous les cas, ici quand il est dans le cas d'un get user il renvoie action.payload (toute la data des user qu'on a recuperer du get) qui s'incremente dans notre initial state
    return action.payload;
    case UPLOAD_PICTURE:
        return {
            ...state, 
            picture: action.payload,
        };
        case UPDATE_BIO: 
        return {
            ...state, 
            bio: action.payload,
        };
        case FOLLOW_USER:
        return {
            ...state,
            following: [action.payload.idToFollow, ...state.following], // ...state.following, on se recupere la suite du tableau pour ne pas tout ecraser avec notre action.payload.idToFollow  dans notre tableau following
        };
        case UNFOLLOW_USER:
        return {
            ...state,
            following: state.following.filter((id) => id !== action.payload.idToUnfollow), // ...state.following, on se recupere la suite du tableau pour ne pas tout ecraser avec notre action.payload.idToFollow  dans notre tableau following
        };


    default:
        return state;

}


}