import { useSearchParams } from 'react-router'
import { useState, useEffect } from 'react'

import { Post } from './Post'

import { logic } from '../logic'

export const SearchPosts = ({ alert, confirm }) => {
    const [search, setSearch] = useSearchParams()
    const query = search.get('q') || ''

    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            query && logic.searchPosts(query)
                .then(posts => {
                    setPosts(posts)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [query])


    const handleSearchSubmit = event => {
        event.preventDefault()

        const query = event.target.query.value

        setSearch({ q: query })
    }

    const handlePostRemoved = () => {
        try {
            logic.searchPosts(query)
                .then(posts => {
                    setPosts(posts)
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

    const handlePostLikeToggled = () => {
        try {
            logic.searchPosts(query)

                .then(posts => {
                    setPosts(posts)
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

    const handlePostSaveToggled = () => {
        try {
            logic.searchPosts(query)

                .then(posts => {
                    setPosts(posts)
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

    const handlePostArchiveToggled = () => {
        try {
            logic.searchPosts(query)

                .then(posts => {
                    setPosts(posts)
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

    console.debug('Search -> render')

    return <div>
        <form className="w-full space-y-1 space-x-1" onSubmit={handleSearchSubmit}>
            <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="text" placeholder="Search posts..." id="query" defaultValue={query} />

            <button className="rounded-full px-3 bg-gray-900 text-white hover:bg-gray-700 transition" type="submit">Search</button>
        </form>

        <ul className="list-style-none p-0">
            {posts.map(post => <Post key={post.id} post={post} onPostRemoved={handlePostRemoved} onPostLikeToggled={handlePostLikeToggled} onPostSaveToggled={handlePostSaveToggled} onPostArchiveToggled={handlePostArchiveToggled} />)}
        </ul>
    </div>
}