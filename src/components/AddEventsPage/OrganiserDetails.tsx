import type { ChangeEvent } from 'react'

type Props = {
    organizer: string
    contactName: string
    contactEmail: string
    allowRatings: boolean
    makePublic: boolean
    setOrganizer: (val: string) => void
    setContactName: (val: string) => void
    setContactEmail: (val: string) => void
    setAllowRatings: (val: boolean) => void
    setMakePublic: (val: boolean) => void
}

const OrganiserDetails = ({
    organizer,
    contactName,
    contactEmail,
    allowRatings,
    makePublic,
    setOrganizer,
    setContactName,
    setContactEmail,
    setAllowRatings,
    setMakePublic,
}: Props) => {
    const headingStyle = { color: '#EDEEF3', fontSize: '32px' }
    const subHeadingStyle = { color: '#FFFFFF', fontSize: '16px' }
    const inputBoxStyle = {
        border: '2px solid #5B6CFF',
        borderRadius: '15px',
        backgroundColor: '#16181F',
        color: '#EDEEF3',
        paddingLeft: '16px',
        fontSize: '16px',
        lineHeight: 'normal',
        fontWeight: 400,
        cursor: 'text',
        boxShadow: 'none',
        outline: 'none',
    }

    function handleOrganizerChange(e: ChangeEvent<HTMLInputElement>) {
        setOrganizer(e.target.value)
    }

    function handleContactNameChange(e: ChangeEvent<HTMLInputElement>) {
        setContactName(e.target.value)
    }

    function handleContactEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setContactEmail(e.target.value)
    }

    function handleAllowRatingsChange(e: ChangeEvent<HTMLInputElement>) {
        setAllowRatings(e.target.checked)
    }

    function handleMakePublicChange(e: ChangeEvent<HTMLInputElement>) {
        setMakePublic(e.target.checked)
    }

    return (
        <div className="mb-5">
            <div className="row gap-3">
                <p className="fw-medium" style={headingStyle}>
                    Organiser Details
                </p>

                <div className="col-md" style={{ maxWidth: '30%' }}>
                    <div className="mb-3">
                        <label className="form-label small" style={subHeadingStyle}>
                            Organising Body/Person
                        </label>
                        <input
                            type="text"
                            className="form-control placeholder"
                            placeholder="Enter"
                            value={organizer}
                            onChange={handleOrganizerChange}
                            style={{ ...inputBoxStyle, height: '48px' }}
                        />
                        <div className="form-text" style={{ fontSize: '10px', color: '#7C8194' }}>
                            You are logged in as Om Kedare
                        </div>
                    </div>
                </div>

                <div className="col-md" style={{ maxWidth: '40%' }}>
                    <div className="mb-3">
                        <label className="form-label small" style={subHeadingStyle}>
                            Contact Person
                        </label>
                        <input
                            type="text"
                            className="form-control placeholder mb-3"
                            placeholder="Name"
                            value={contactName}
                            onChange={handleContactNameChange}
                            style={{ ...inputBoxStyle, height: '48px' }}
                        />
                        <input
                            type="text"
                            className="form-control placeholder"
                            placeholder="Email Address"
                            value={contactEmail}
                            onChange={handleContactEmailChange}
                            style={{ ...inputBoxStyle, height: '48px' }}
                        />
                    </div>
                </div>

                <div className="col-md" style={{ maxWidth: '18%' }}>
                    <div
                        className="d-flex flex-column justify-content-center"
                        style={{
                            backgroundColor: '#16181F',
                            border: '2px solid #2B2F3A',
                            borderRadius: '15px',
                            marginLeft: '20px',
                            marginTop: '20px',
                            padding: '24px',
                        }}
                    >
                        <p className="fw-medium mb-3" style={{ color: '#EDEEF3', fontSize: '24px' }}>
                            Visibility
                        </p>

                        <div className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="allowRatings"
                                checked={allowRatings}
                                onChange={handleAllowRatingsChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="allowRatings"
                                style={{
                                    color: '#EDEEF3',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                }}
                            >
                                Allow Ratings
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="makePublic"
                                checked={makePublic}
                                onChange={handleMakePublicChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="makePublic"
                                style={{
                                    color: '#EDEEF3',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                }}
                            >
                                Make Public
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganiserDetails
