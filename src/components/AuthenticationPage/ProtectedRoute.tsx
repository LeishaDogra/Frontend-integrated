import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getAccessToken } from '../../utils/tokens'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = getAccessToken()

    if (!token) {
        return <Navigate to="/loginsignup" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute

