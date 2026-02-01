import { getAccessToken } from '../utils/tokens'
import { refreshAccessToken } from './auth'

const API_URL = 'https://api-vouch.sidshr.in/api/'

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    let accessToken = getAccessToken()

    let res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        },
    })

    // Access token expired
    if (res.status === 401) {
        accessToken = await refreshAccessToken()

        res = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        })
    }

    return res
}
