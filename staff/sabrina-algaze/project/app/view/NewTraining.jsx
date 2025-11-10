import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { logic } from '../logic'

export const NewTraining = () => {
    const navigate = useNavigate()
    const [groups, setGroups] = useState([])

    useEffect(() => {
        logic.getGroupsForCoach()
            .then(groups => setGroups(groups))
            .catch(error => console.error(error))
    }, [])

    const handleNewTrainingSubmit = event => {
        event.preventDefault()

        const form = event.target

        const groupId = form.groupId.value

        try {
            logic.createTraining(groupId)
                .then(() => navigate('/trainings'))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleCancelClick = () => {
        navigate('/trainings')
    }

    return <div>
        <h1 className="text-xl font-semibold text-left pr-2">New Training</h1>
        <form onSubmit={handleNewTrainingSubmit} className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col">
                <select
                    defaultValue=""
                    id="groupId"
                    className="border rounded-full px-3 py-1 bg-gray-100 text-gray-900"
                    required
                >
                    <option value="" disabled>
                        Select a group
                    </option>
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end gap-1">
                <button onClick={handleCancelClick} type="button" className="rounded-full px-3 py-1 border text-gray-700 hover:bg-gray-100 transition">
                    Cancel
                </button>
                <button type="submit" className="rounded-full px-3 py-1 bg-gray-900 text-white hover:bg-gray-700 transition">
                    Create
                </button>
            </div>
        </form>
    </div>
}