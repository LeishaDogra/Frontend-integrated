import { Link } from 'react-router-dom'
import backgroundLink from '../assets/Background.jpg'

const AboutUs = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundLink})`,
                backgroundSize: 'cover',
            }}
        >
            {/* Navigation Bar */}
            <div className="container d-flex justify-content-end">
                <Link
                    to="/"
                    className="text-white text-decoration-none small fw-bold"
                    style={{ paddingTop: '40px', paddingRight: '0px' }}
                >
                    Back to HOME
                </Link>
            </div>

            {/* Main Content */}
            <div className="container fw-normal" style={{ maxWidth: '900px' }}>
                <h1
                    className="fw-medium text-center mt-5 mb-5 pb-5"
                    style={{ color: '#B2B6C7', fontSize: '64px' }}
                >
                    What InstiView Is?
                </h1>

                <div style={{ color: '#EDEEF3' }}>
                    <div className="mb-5">
                        <p className=" mb-0" style={{ fontSize: '20px' }}>
                            IIT Bombay hosts hundreds of events every year —
                            talks, workshops, competitions, cultural nights, and
                            club activities. While these events create memorable
                            experiences, there has never been a single place
                            where students can look back at them, understand
                            their impact, or share structured feedback.
                        </p>
                        <h3 className="fw-medium">
                            InstiView bridges that gap.
                        </h3>
                    </div>
                    <div className="mb-5">
                        <h3 className="fw-medium mb-0">
                            The Problem WE noticed
                        </h3>
                        <p className=" mb-0" style={{ fontSize: '20px' }}>
                            Campus Events often exist only in the event
                        </p>
                        <p className="" style={{ fontSize: '20px' }}>
                            the feedback is scattered or lost, Organisers lack
                            long term insights
                        </p>
                    </div>
                    <div className="mb-5">
                        <h3 className="fw-medium mb-0">What InstiView Does?</h3>
                        <p className="" style={{ fontSize: '20px' }}>
                            BOOM! Now You can rate past events, Share feedback
                            through ratings and discover the Top-Rated events of
                            IIT Bombay
                        </p>
                    </div>
                    <div className="mb-5">
                        <h3 className="fw-medium mb-3">Who's it for?</h3>
                        <div className="mb-3">
                            <h6 className="mb-0 " style={{ fontSize: '20px' }}>
                                Students
                            </h6>
                            <p className="" style={{ fontSize: '20px' }}>
                                Discover which events were worth attending and
                                learn from past experiences
                            </p>
                        </div>
                        <div className="mb-3">
                            <h6 className="mb-0 " style={{ fontSize: '20px' }}>
                                Event organizers & clubs
                            </h6>
                            <p className="" style={{ fontSize: '20px' }}>
                                Understand how events were received and improve
                                future editions
                            </p>
                        </div>
                        <div className="mb-3">
                            <h6 className="mb-0 " style={{ fontSize: '20px' }}>
                                The campus community
                            </h6>
                            <p className="" style={{ fontSize: '20px' }}>
                                Build collective memory and accountability
                                around campus activities
                            </p>
                        </div>
                    </div>
                    <div className="mb-3">
                        <p className="" style={{ fontSize: '20px' }}>
                            By preserving feedback and experiences, Instiview
                            helps campus events live beyond a single day —
                            enabling better decisions, better events, and a more
                            informed student community.
                        </p>
                    </div>
                    {/* Footer */}
                    <div
                        className="text-center mt-5 fw-bold"
                        style={{ fontSize: '20px' }}
                    >
                        You've Reached The end
                    </div>
                    <div style={{ height: '80px' }}></div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
