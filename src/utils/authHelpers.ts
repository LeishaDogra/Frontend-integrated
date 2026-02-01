import { getAccessToken } from './tokens'

export const getLoggedInUserId = () => {
    const token = getAccessToken()
    if (!token) return null

    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.user_id || payload.id || payload.sub || null
    } catch (e) {
        return null
    }
}

