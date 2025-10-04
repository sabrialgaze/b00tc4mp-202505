import { data } from '../../data'
import { SessionError } from 'com'
import { jwtDecode } from 'jwt-decode'


export const getUserId = () => {
    const token = data.loadToken()

    if (!token) throw new SessionError('user not logged in')

    const decoded = jwtDecode(token)
    const { sub: userId } = decoded

    return userId
}

