import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { logic } from '../logic'

export const GroupDetail = () => {
    const { groupId } = useParams()
    const [group, setGroup] = useState(null)
    const [players, setPlayers] = useState([])

    const loadGroupData = () => {
        try {
            logic.getGroupInfoForCoach(groupId)
                .then(group => {
                    setGroup(group)
                    setPlayers(group.players)
                })
                .catch(error => {
                    console.error(error)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    useEffect(() => {
        loadGroupData()
    }, [])

    console.debug('GroupDetail -> render')

    return group ? <div>
        <div className="mb-6 flex justify-between items-start">
            <div>
                <h1 className="text-xl font-bold mb-2">
                    {group.name}
                </h1>
                <h2 className="text-gray-600">
                    {group.location}
                </h2>
            </div>
        </div>
        <div>
            {group.players.length === 0 ? (
                <p>No players in this group</p>
            ) : (
                <ul>
                    {group.players.map(player => (
                        <li className="border-2 rounded-xl border-black-600 p-4 mt-2" key={player.id}>{player.name}</li>
                    ))}
                </ul>
            )}
        </div>
    </div>
        :
        <div>Loading...</div>
}