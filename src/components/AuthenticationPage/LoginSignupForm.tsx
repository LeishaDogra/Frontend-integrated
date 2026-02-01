import { useState } from 'react'
import googleIcon from '../../assets/google.svg'
import type { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/auth'

interface Props {
    isSignup?: boolean
    switchMode: () => void
}

const LoginSignupForm = ({ isSignup, switchMode }: Props) => {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const switchPasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleLogin() {
        setError(null)

        if (formData.email.trim() === '' || formData.password.trim() === '') {
            setError('Please enter email and password')
            return
        }

        setLoading(true)

        try {
            // NOTE: only login implemented right now (no signup endpoint shown)
            await login(formData.email, formData.password)
            navigate('/eventspagecurrent', { replace: true })
        } catch (e) {
            setError('Login failed. Please check your credentials.')
        }

        setLoading(false)
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-11 col-md-4 col-lg-3 text-start">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        style={{ maxWidth: '349px' }}
                    >
                        {/* Email Field */}
                        <div className="mb-2">
                            <label
                                className="form-label mb-0"
                                style={{ color: '#B2B6C7', fontSize: '20px' }}
                            >
                                Enter Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control rounded-pill"
                                style={{ backgroundColor: '#B2B6C780' }}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="">
                            <label
                                htmlFor="password"
                                className="form-label mb-0"
                                style={{ color: '#B2B6C7', fontSize: '20px' }}
                            >
                                Enter Password
                            </label>
                            <div className="position-relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="form-control rounded-pill"
                                    style={{ backgroundColor: '#B2B6C780' }}
                                />

                                <span
                                    onClick={switchPasswordVisibility}
                                    className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer text-black"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {showPassword ? (
                                        <i className="bi bi-eye"></i>
                                    ) : (
                                        <i className="bi bi-eye-slash"></i>
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center small">
                                <div className="form-check ms-1">
                                    <input
                                        className="form-check-input border-secondary"
                                        type="checkbox"
                                        id="rememberMe"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="rememberMe"
                                        style={{
                                            color: '#7C8194',
                                            fontSize: '12px',
                                        }}
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div>
                                    {!isSignup && (
                                        <a
                                            href="/forgot-password"
                                            className="text-decoration-none"
                                            style={{
                                                color: '#7C8194',
                                                fontSize: '12px',
                                            }}
                                        >
                                            Forgot Password?
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <p
                                className="text-center mt-3"
                                style={{ color: '#ff6b6b', fontSize: '14px' }}
                            >
                                {error}
                            </p>
                        )}

                        {/* Submit Button */}
                        <div className="d-flex justify-content-center mt-4">
                            <button
                                type="button"
                                onClick={handleLogin}
                                disabled={loading}
                                className="btn rounded-4 fw-medium align-items-center"
                                style={{
                                    background:
                                        'linear-gradient(90deg, #743BCE 0%, #3B1E68 100%)',
                                    border: '1px solid white',
                                    color: '#E6EAF0',
                                    fontSize: '19px',
                                    width: '140px',
                                    height: '42px',
                                }}
                            >
                                {loading
                                    ? 'Loading...'
                                    : isSignup
                                      ? 'Sign Up'
                                      : 'Login'}
                            </button>
                        </div>

                        <div
                            className="text-center mt-3"
                            style={{ color: '#B2B6C7' }}
                        >
                            or
                        </div>

                        {/* Google Button (UI only) */}
                        <div className="d-flex justify-content-center mt-3">
                            <a
                                href="#"
                                className="btn rounded-4 border d-inline-flex align-items-center gap-2 fw-medium justify-content-center"
                                style={{
                                    background: '#0E0E0E',
                                    color: 'white',
                                    fontSize: '14px',
                                    height: '48px',
                                    width: '210px',
                                }}
                            >
                                <img
                                    src={googleIcon}
                                    alt="Google"
                                    width="34"
                                    height="34"
                                />
                                {isSignup
                                    ? 'Continue with Google'
                                    : 'Sign in with Google'}
                            </a>
                        </div>

                        <div
                            className="d-flex justify-content-center mt-4 "
                            style={{ color: '#B2B6C7' }}
                        >
                            {isSignup
                                ? 'Already have an account?'
                                : "Don't have an account?"}
                            <span
                                onClick={switchMode}
                                className="px-2 fw-bold"
                                style={{
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    color: '#603CCE',
                                }}
                                role="button"
                            >
                                {isSignup ? 'Login' : 'Create one'}
                            </span>
                        </div>

                        <div style={{ paddingTop: '100px' }}></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginSignupForm

