import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { getUserInfo } from './getUserInfo'
import { isUserLoggedIn } from './isUserLoggedIn'
import { logoutUser } from './logoutUser'

import { createPost } from './createPost'
import { getPosts } from './getPosts'
import { removePost } from './removePost'
import { toggleLikePost } from './togglelikePost'
import { toggleSavePost } from './toggleSavePost'
import { getSavedPosts } from './getSavedPosts'
import { toggleArchivePost } from './toggleArchivePost'
import { getArchivedPosts } from './getArchivePosts'

export const logic = {
    registerUser,
    loginUser,
    getUserInfo,
    isUserLoggedIn,
    logoutUser,

    createPost,
    getPosts,
    removePost,
    toggleLikePost,
    toggleSavePost,
    getSavedPosts,
    toggleArchivePost,
    getArchivedPosts
}