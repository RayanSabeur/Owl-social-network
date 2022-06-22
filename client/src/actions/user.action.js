import axios from "axios";


export const GET_USER = "GET_USER"; //table des matiere de toutes nos actions

export const UPLOAD_PICTURE = "UPLOAD_PICTURE"; 
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";



export const getUser = (uid) => { // on se passe en parametre le  uid de notre user

    return (dispatch) => {

        return axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`) //on recup les infos du user avec axios
        .then((res) => { //c une promesse donc .then
            dispatch({type: GET_USER, payload: res.data}) //ça partira au reducer, avec comme type get user , et le payload = cqu'on envoie, donc les data recup du get (res.data)
         }) //= la data qu'on envoie
            .catch((err) => console.log(err))
        
    }
}

export const uploadPicture = (data, id) => {


    return (dispatch) => {
        return axios
        .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
        .then(() => {
            return axios 
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
                dispatch({type: UPLOAD_PICTURE , payload : res.data.picture })
            })
        })
        .catch((err) => console.log(err)
        );
    }
};

export const updateBio = (userId, bio) => {

    return (dispatch) => {

        return axios({
         method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: {bio}
        }).then((res) => {
            dispatch({type: UPDATE_BIO, payload:bio })
        })
        .catch((err) => console.log(err))
    }
}

export const followUser = (followerId, idToFollow) => {


    return (dispatch) => {

        return axios(
            {
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
                data: {idToFollow},
            }
        ) //c'est exactement ce qu'on a fait dans postman pour follow une personne, la methode, l'url, l'id du user et la personne a follow
        .then((res) => {
            dispatch({type: FOLLOW_USER, payload: {idToFollow}})
        })
        .catch((err) => console.log(err))
    }
}

export const UnfollowUser = (followerId, idToUnfollow) => {


    return (dispatch) => {

        return axios(
            {
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
                data: {idToUnfollow},
            }
        ) //c'est exactement ce qu'on a fait dans postman pour follow une personne, la methode, l'url, l'id du user et la personne a follow
        .then((res) => {
            dispatch({type: UNFOLLOW_USER, payload: {idToUnfollow}})
        })
        .catch((err) => console.log(err))
    }
}