import { useState, useEffect } from 'react'
import { Group } from './Group'
import { logic } from '../logic'
import { useNavigate } from 'react-router'
import { PlusIcon } from '@heroicons/react/24/outline'

export const Groups = ({ onGroupClicked }) => {
    const [groups, setGroups] = useState([])
    const navigate = useNavigate()

    const loadGroups = () => {
        try {
            logic.getGroupsForCoach()
                .then(groups => setGroups(groups))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    useEffect(() => loadGroups(), [])

    const handleCreateGroupClick = () => {
        navigate('/new-group')
    }

    console.debug('Groups -> render')

    return <div>
        <div className="flex">
            <h1 className="text-xl font-normal text-left pr-2">Groups</h1>
            <button onClick={handleCreateGroupClick} className="border-2 rounded-xl border-black-600 px-1 py-1 hover:bg-gray-100 font-bold"><PlusIcon className="w-4 h-4" /></button>
        </div>
        <ul>
            <li className="py-2">
                {groups.map(group => <Group key={group.id} group={group} onGroupClicked={onGroupClicked} />)}
            </li>
        </ul>
    </div>
}