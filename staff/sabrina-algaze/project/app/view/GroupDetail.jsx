import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { logic } from '../logic'
import { useNavigate } from 'react-router'
import { XMarkIcon, PlusIcon, PencilIcon } from '@heroicons/react/24/outline'

export const GroupDetail = () => {
    const navigate = useNavigate()
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

    const handleAddPlayerClick = () => {
        navigate(`/group/${groupId}/add-player`)
    }

    const handleRemovePlayerClick = playerId => {
        if (confirm('Remove player?')) {
            try {
                logic.removePlayerFromGroup(groupId, playerId)
                    .then(() => loadGroupData())
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })
            } catch (error) {
                console.error(error)
                alert(error.message)
            }
        }
    }

    const handleEditClick = () => {
        navigate(`/group/${groupId}/update`)
    }

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
            <button onClick={handleEditClick} className="border-1 rounded-xl border-black-600 px-1 py-1 hover:bg-gray-100 font-bold"><PencilIcon className="w-4 h-4" />
            </button>
        </div>
        <div className="flex">
            <h1 className="text-xl font-normal text-left pr-2">Players</h1>
            <button onClick={handleAddPlayerClick} className="border-1 rounded-xl border-black-600 px-1 py-1 hover:bg-gray-100 font-bold"><PlusIcon className="w-4 h-4" /></button>
        </div>
        <div>
            {group.players.length === 0 ? (
                <p>No players in this group</p>
            ) : (
                <ul>
                    {group.players.map(player => (
                        <li className="border-2 rounded-xl border-black-600 p-4 mt-2 flex justify-between items-center" key={player.id}>
                            <span>{player.name}</span>
                            <button onClick={() => handleRemovePlayerClick(player.id)} className="rounded-full p-1 hover:bg-gray-200 transition">
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
        :
        <div>Loading...</div>
}