import { useState, useEffect } from 'react'
import { logic } from '../logic'

export const useRole = () => {
    const [role, setRole] = useState(null)

    useEffect(() => {
        try {
            const role = logic.getUserRole()

            setRole(role)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    return role
}