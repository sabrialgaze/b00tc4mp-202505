import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { logic } from '../logic'

export const NewPayment = () => {
    const navigate = useNavigate()
    const [groups, setGroups] = useState([])

    useEffect(() => {
        try {
            logic.getGroupsForPlayer()
                .then(groups => setGroups(groups))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [])

    const handleNewPaymentSubmit = event => {
        event.preventDefault()

        const form = event.target

        const groupId = form.groupId.value
        const service = form.service.value

        try {
            logic.createPayment(groupId, service)
                .then(() => navigate('/payments'))
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
        navigate('/payments')
    }

    return <div>
        <h1 className="text-xl font-semibold text-left pr-2">New Payment</h1>
        <form onSubmit={handleNewPaymentSubmit} className="flex flex-col gap-2 mt-2">
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

            <div className="flex flex-col">
                <select
                    defaultValue=""
                    id="service"
                    className="border rounded-full px-3 py-1 bg-gray-100 text-gray-900"
                    required
                >
                    <option value="" disabled>
                        Select a service
                    </option>
                    <option value="month">Month</option>
                    <option value="day">Day</option>
                </select>
            </div>

            <div className="flex justify-end gap-1">
                <button type="button" className="rounded-full px-3 py-1 border text-gray-700 hover:bg-gray-100 transition" onClick={handleCancelClick}>
                    Cancel
                </button>
                <button type="submit" className="rounded-full px-3 py-1 bg-gray-900 text-white hover:bg-gray-700 transition">
                    Create
                </button>
            </div>
        </form>
    </div>
}