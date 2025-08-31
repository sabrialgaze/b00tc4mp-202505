import { data } from '../data'
import { SessionError } from '../../com'
import { extractPayloadFromToken } from './helper'

export const getUserRole = () => {
    const token = data.loadToken()

    if (!token) throw new SessionError('user not logged in')

    const { role } = extractPayloadFromToken(token)

    return role
}