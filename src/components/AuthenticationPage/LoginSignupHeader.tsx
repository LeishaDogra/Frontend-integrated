import { Link } from 'react-router-dom'

const LoginSignupHeader = () => {
    return (
        <nav className={'navbar navbar-expand navbar-transparent navbar-dark'}>
            <div className="container-fluid position-relative">
                <a
                    className="navbar-brand fw-medium"
                    style={{
                        paddingLeft: '57px',
                        paddingTop: '10px',
                        fontSize: '48px',
                        color: '#E6EAF0',
                    }}
                    href="#"
                >
                    InstiView
                </a>

                <span
                    className="position-absolute top-50 start-50 translate-middle fs-2 fw-medium"
                    style={{
                        fontSize: '32px',
                        color: '#E6EAF0',
                        paddingTop: '15px',
                    }}
                >
                    Howdy Fellas!
                </span>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a
                            className="nav-link fs-6"
                            href="#"
                            style={{
                                fontSize: '16px',
                                color: '#E6EAF0',
                                paddingRight: '30px',
                            }}
                        >
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/aboutus"
                            className="nav-link fs-6"
                            style={{
                                fontSize: '16px',
                                color: '#E6EAF0',
                                paddingRight: '40px',
                            }}
                        >
                            About Us
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default LoginSignupHeader
