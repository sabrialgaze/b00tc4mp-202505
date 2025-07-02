import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { getUserInfo } from './getUserInfo'
import { isUserLoggedIn } from './isUserLoggedIn'
import { logoutUser } from './logoutUser'
import { createPost } from './createPost'
import { getPosts } from './getPosts'
import { removePost } from './removePost'
import { likePost } from './likePost'

export const logic = {
    registerUser,
    loginUser,
    getUserInfo,
    isUserLoggedIn,
    logoutUser,

    createPost,
    getPosts,
    removePost,
    likePost
}