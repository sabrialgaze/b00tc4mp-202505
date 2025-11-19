import { logic } from '../logic'

export const useRole = () => {
    const role = logic.getUserRole()

    return role
}