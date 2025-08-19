import { useNavigate, useSearchParams } from 'react-router'

export const Search = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useSearchParams()
    const query = search.get('q') || ''

    const handleSearchSubmit = event => {
        event.preventDefault()

        const query = event.target.query.value

        //logic to handle search with the query
        console.log(`Searching for ${query}`)

        const queryString = new URLSearchParams({ q: query }).toString()

        navigate(`/search-posts?${queryString}`)
    }

    console.debug('Search -> render')

    return <form onSubmit={handleSearchSubmit}>
        <input type="text" placeholder="Search posts..." id="query" defaultValue={query} />
        <button type="submit">Search</button>
    </form>
}