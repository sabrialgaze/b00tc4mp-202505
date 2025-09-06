import { useRole, useContext } from '../hooks'

import { logic } from '../logic'
import { convertISODateToFriendlyFormat } from './helper'

import { HeartIcon as HeartIconOutline, BookmarkIcon, ArchiveBoxIcon, ArchiveBoxXMarkIcon, TrashIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid'

export const Post = ({ post, onPostRemoved, onPostLikeToggled, onPostSaveToggled, onPostArchiveToggled }) => {
    const role = useRole()

    const { alert, confirm } = useContext()

    const handleDeletePostClick = () => {
        confirm('Delete post?')
            .then(ok => {
                if (!ok) return
                try {
                    logic.removePost(post.id)
                        .then(() => {
                            onPostRemoved()
                        })
                        .catch(error => {
                            console.error(error)

                            alert(error.message)
                        })
                } catch (error) {
                    console.error(error)

                    alert(error.message)
                }
            })
    }

    const handleToggleLikePostClick = () => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => {
                    onPostLikeToggled()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleToggleSavePostClick = () => {
        try {
            logic.toggleSavePost(post.id)
                .then(() => {
                    onPostSaveToggled()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleToggleArchivePostClick = () => {
        confirm(`${post.archived ? 'Unarchive' : 'Archive'} post?`)
            .then(ok => {
                if (!ok) return
                try {
                    logic.toggleArchivePost(post.id)
                        .then(() => {
                            onPostArchiveToggled()
                        })
                        .catch(error => {
                            console.error(error)

                            alert(error.message)
                        })
                } catch (error) {
                    console.error(error)

                    alert(error.message)
                }
            })
    }


    console.debug('Post -> render')

    return <li className="space-y-2">
        <h3 className="font-semibold italic">{post.author.username}</h3>
        <img
            className="w-full"
            src={post.image}
        />
        <p>{post.text}</p>
        <time className="text-sm">{convertISODateToFriendlyFormat(post.date)}</time>
        <button type="button" onClick={handleToggleLikePostClick}>{post.liked ? <HeartIconSolid className="w-6 h-6 inline text-red-500" /> : <HeartIconOutline className="w-6 h-6 inline text-gray-700" />} ({post.likesCount})</button>
        <button type="button" onClick={handleToggleSavePostClick}>{post.saved ? <BookmarkIconSolid className="w-6 h-6 inline text-cyan-600" /> : <BookmarkIcon className="w-6 h-6 inline text-gray-700" />}</button>
        {post.own && <button type="button" onClick={handleToggleArchivePostClick}>{post.archived ? <ArchiveBoxXMarkIcon className="w-6 h-6 inline text-gray-700" /> : <ArchiveBoxIcon className="w-6 h-6 inline text-gray-700" />}</button>}
        {(post.own || role === 'administrator') && <button type="button" onClick={handleDeletePostClick}><TrashIcon className="w-6 h-6 inline text-gray-700" /></button>}
    </li>
}