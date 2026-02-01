import LoginSignupHeader from './LoginSignupHeader'
import LoginSignupForm from './LoginSignupForm'
import '../../App.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backgroundLink from '../../assets/Background.jpg'
import { getAccessToken } from '../../utils/tokens'

const LoginSignup = () => {
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = getAccessToken()
        if (token) {
            navigate('/eventspagecurrent', { replace: true })
        }
    }, [navigate])

    const switchMode = () => {
        setIsSignup((prev) => !prev)
    }

    return (
        <div
            className="login-page d-flex flex-column bg-black text-white"
            style={{
                backgroundImage: `url(${backgroundLink})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <LoginSignupHeader />

            <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-3">
                <h1
                    className="display-4 fw-medium mb-3 mt-0"
                    style={{
                        color: '#B2B6C7',
                        fontSize: '64px',
                        paddingTop: '50px',
                    }}
                >
                    Explore Insti like never Before!
                </h1>
                <p
                    style={{
                        color: '#B2B6C7',
                        fontSize: '24px',
                        paddingTop: '40px',
                    }}
                >
                    Login/SignUp to Explore & Review Campus events
                </p>

                <LoginSignupForm isSignup={isSignup} switchMode={switchMode} />
            </div>
        </div>
    )
}

export default LoginSignup
