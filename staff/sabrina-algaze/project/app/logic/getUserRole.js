import { data } from '../data'
import { SessionError } from 'com'
import { jwtDecode } from 'jwt-decode'

export const getUserRole = () => {
    const token = data.loadToken()

    if (!token) throw new SessionError('user not logged in')

    const { role } = jwtDecode(token)

    return role
}