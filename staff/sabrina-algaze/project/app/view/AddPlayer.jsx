import { useNavigate, useParams } from 'react-router'
import { logic } from '../logic'

export const AddPlayer = () => {
    const navigate = useNavigate()
    const { groupId } = useParams()

    const handleAddPlayerSubmit = event => {
        event.preventDefault()

        const form = event.target

        const playerEmail = form.playerEmail.value

        try {
            logic.addPlayerToGroup(groupId, playerEmail)
                .then(() => navigate(`/group/${groupId}`))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    console.debug('AddPlayerToGroup -> render')

    return <div>
        <h1 className="text-xl font-semibold text-left pr-2">Add Player</h1>
        <form onSubmit={handleAddPlayerSubmit} className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col">
                <label htmlFor="playerEmail"></label>
                <input className="border rounded-full px-3 py-1 bg-gray-100 text-gray-900" type="email" id="playerEmail" placeholder="Enter player's email" required />
            </div>
            <div className="flex justify-end gap-1">
                <button type="reset" className="rounded-full px-3 py-1 border text-gray-700 hover:bg-gray-100 transition" >Clear</button>
                <button type="submit" className="rounded-full px-3 py-1 bg-gray-900 text-white hover:bg-gray-700 transition" >Add</button>
            </div>
        </form>
    </div>
}