import { getAccessToken } from '../utils/tokens'
import { refreshAccessToken } from './auth'

const API_URL = 'https://api-vouch.sidshr.in/api/'

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    let accessToken = getAccessToken()

    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
    }

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
    }

    let res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    })

    if (res.status === 401) {
        try {
            accessToken = await refreshAccessToken()

            const retryHeaders: Record<string, string> = {
                ...(options.headers as Record<string, string>),
                Authorization: `Bearer ${accessToken}`,
            }

            res = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers: retryHeaders,
            })
        } catch (e) {
            return res
        }
    }

    return res
}

