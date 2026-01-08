import { useNavigate, useParams, Link } from 'react-router'
import { useState, useEffect } from 'react'
import { logic } from '../logic'

export const UpdateGroup = () => {
    const navigate = useNavigate()
    const { groupId } = useParams()
    const [group, setGroup] = useState(null)

    useEffect(() => {
        try {
            logic.getGroupInfoForCoach(groupId)
                .then(group => {
                    setGroup(group)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [])

    const handleUpdateGroupSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const day = form.day.value
        const time = form.time.value
        const location = form.location.value

        const updates = {}

        if (name !== group.name) {
            updates.name = name
        }
        if (day !== group.day) {
            updates.day = day
        }
        if (time !== group.time) {
            updates.time = time
        }
        if (location !== group.location) {
            updates.location = location
        }

        if (Object.keys(updates).length === 0) {
            alert('No changes to save')
            return
        }

        try {
            logic.updateGroup(groupId, updates)
                .then(() => {
                    navigate(`/group/${groupId}`)
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

    console.debug('UpdateGroup -> render')

    if (!group) return <div>Loading...</div>

    return <div>
        <h1 className="text-xl font-semibold text-left pr-2">Update Group</h1>
        <form className="flex flex-col gap-1" onSubmit={handleUpdateGroupSubmit}>
            <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                    className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="text"
                    id="name"
                    defaultValue={group.name}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="day">Day</label>
                <select className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" id="day" defaultValue={group.day}>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="time">Time</label>
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="time" id="time" defaultValue={group.time} />
            </div>
            <div className="flex flex-col">
                <label htmlFor="location">Location</label>
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="text" id="location" defaultValue={group.location} />
            </div>
            <div className="flex justify-between items-center mt-2 gap-1">
                <Link className="text-m text-gray-600 hover:underline" to={`/group/${groupId}`}>Back</Link>
                <div className="flex gap-1">
                    <button type="reset" className="rounded-full px-3 py-1 border text-gray-700 hover:bg-gray-100 transition" >Clear</button>
                    <button type="submit" className="rounded-full px-3 py-1 bg-gray-900 text-white hover:bg-gray-700 transition" >Save</button>
                </div>
            </div>
        </form>
    </div>
}