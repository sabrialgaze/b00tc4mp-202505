import { logic } from '../logic'
import { useNavigate } from 'react-router'

export const NewGroup = () => {
    const navigate = useNavigate()

    const handleNewGroupSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const day = form.day.value
        const time = form.time.value
        const location = form.location.value
        const coachEmail = form.coachEmail.value

        try {
            logic.createGroup(name, day, time, location, coachEmail)
                .then(() => {
                    form.reset()

                    navigate('/')
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
    return <div>
        <h1 className="text-xl font-semibold text-left pr-2">New Group</h1>
        <form className="flex flex-col gap-1" onSubmit={handleNewGroupSubmit}>
            <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="text" id="name" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="day">Day</label>
                <select className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" id="day">
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
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="time" id="time" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="location">Location</label>
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="text" id="location" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="coachEmail">Coach Email</label>
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="email" id="coachEmail" required />
            </div>
            <div className="flex justify-end mt-2 gap-1">
                <button type="reset" className="rounded-full px-3 py-1 border text-gray-700 hover:bg-gray-100 transition" >
                    Clear
                </button>
                <button type="submit" className="rounded-full px-3 py-1 bg-gray-900 text-white hover:bg-gray-700 transition">
                    Create
                </button>
            </div>
        </form>
    </div>
}   