const NavMainScreen = () => {
    return (
        <div>
            <nav
                className={
                    'navbar navbar-expand navbar-transparent navbar-dark'
                }
            >
                <div className="container-fluid">
                    <a
                        className="navbar-brand"
                        href="#"
                        style={{
                            position: 'absolute',
                            left: '52px',
                            top: '29px',
                            width: '214px',
                            height: '66px',

                            paddingBottom: '0px',
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: '48px',
                            fontWeight: 700,
                            color: '#E6EAF0',
                        }}
                    >
                        InstiView
                    </a>

                    <div
                        className="collapse navbar-collapse navbar-nav position-absolute start-50 translate-middle-x"
                        id="navbarNav"
                        style={{
                            gap: '30px',
                            position: 'absolute',
                            top: '63px',
                            left: '554px',
                        }}
                    >
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Add Event
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    FAQ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Rate Events
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavMainScreen
