import type { NavigateFunction } from 'react-router-dom'

let navigate: NavigateFunction | null = null

export const setNavigate = (nav: NavigateFunction) => {
    navigate = nav
}

export const redirectToLogin = () => {
    // FIX: you don't have /login route, you have /loginsignup
    navigate?.('/loginsignup', { replace: true })
}
