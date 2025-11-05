import { useState, useEffect } from 'react'
import { Group } from './Group'
import { logic } from '../logic'

export const Groups = ({ onGroupClicked }) => {
    const [groups, setGroups] = useState([])

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

    console.debug('Groups -> render')

    return <div>
        <div className="flex">
            <h1 className="text-xl font-normal text-left pr-2">Groups</h1>
            <button className="border-2 rounded-xl border-black-600 px-2 py-0.5 hover:bg-gray-100 font-bold">+</button>
        </div>
        <ul>
            <li className="py-2">
                {groups.map(group => <Group key={group.id} group={group} onGroupClicked={onGroupClicked} />)}
            </li>
        </ul>
    </div>
}