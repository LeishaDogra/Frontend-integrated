import { redirectToLogin } from '../utils/redirect'
import {
    getRefreshToken,
    setAccessToken,
    setTokens,
    clearTokens,
} from '../utils/tokens'

const API_URL = 'https://api-vouch.sidshr.in/api/'

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
        throw new Error('Login failed')
    }

    const data = await response.json()
    setTokens(data.accessToken, data.refreshToken)
}

export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
        throw new Error('No refresh token available')
    }

    const response = await fetch(`${API_URL}auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
        clearTokens()
        redirectToLogin()
        throw new Error('Refresh token expired')
    }

    const data = await response.json()
    setAccessToken(data.accessToken)
    return data.accessToken
}

export const logout = () => {
    clearTokens()
}
