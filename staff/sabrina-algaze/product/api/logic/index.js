import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUserInfo } from './getUserInfo.js'
import { createPost } from './createPost.js'
import { getPosts } from './getPosts.js'
import { removePost } from './removePost.js'
import { toggleLikePost } from './toggleLikePost.js'
import { toggleSavePost } from './toggleSavePost.js'
import { toggleArchivePost } from './toggleArchivePost.js'
import { getSavedPosts } from './getSavedPosts.js'
import { getArchivedPosts } from './getArchivedPosts.js'
import { getLikedPosts } from './getLikedPosts.js'

export const logic = {
    registerUser,
    authenticateUser,
    getUserInfo,
    createPost,
    getPosts,
    removePost,
    toggleLikePost,
    toggleSavePost,
    toggleArchivePost,
    getSavedPosts,
    getArchivedPosts,
    getLikedPosts
}