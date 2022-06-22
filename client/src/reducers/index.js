import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import allusersReducer from "./alluser.reducer";
import postReducer from "./post.reducer";
import allPostsReducer from "./allPosts.reducer"
import trendingReducer from "./trending.reducer"

// combine tous nos reduceur et les envoie dans notre store au plus haut de notre apk (index.js)
export default combineReducers({

    userReducer, 
    allusersReducer,
    postReducer,
    allPostsReducer,
    trendingReducer
});