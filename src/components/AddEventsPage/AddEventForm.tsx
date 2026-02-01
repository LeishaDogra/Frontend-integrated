import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasicEventDetails from './BasicEventDetails'
import EventMetaInformation from './EventMetaInformation'
import OrganiserDetails from './OrganiserDetails.tsx'
import { apiFetch } from '../../services/api'

const AddEventForm = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const [organizer, setOrganizer] = useState('')
    const [contactName, setContactName] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [allowRatings, setAllowRatings] = useState(false)
    const [makePublic, setMakePublic] = useState(false)

    const [imageURL, setImageURL] = useState('')

    async function handleSubmit() {
        setMessage(null)

        if (title.trim() === '' || description.trim() === '') {
            setMessage('Please fill all required fields')
            return
        }

        if (location.trim() === '' || date.trim() === '' || time.trim() === '') {
            setMessage('Please fill location, date and time')
            return
        }

        let startTimeISO = ''
        try {
            startTimeISO = new Date(`${date} ${time}`).toISOString()
        } catch (e) {
            setMessage('Invalid date/time format')
            return
        }

        setLoading(true)

        try {
            const res = await apiFetch('events/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    content: description,
                    location: location,
                    startTime: startTimeISO,
                    imageURL: imageURL,
                }),
            })

            if (!res.ok) {
                setMessage('Could not add event')
                setLoading(false)
                return
            }

            await res.json()
            setMessage('Event published successfully ✅')

            // reset fields
            setTitle('')
            setDescription('')
            setLocation('')
            setDate('')
            setTime('')
            setImageURL('')

            // organiser fields are UI-only but reset anyway (optional)
            setOrganizer('')
            setContactName('')
            setContactEmail('')
            setAllowRatings(false)
            setMakePublic(false)

            // redirect after a short delay so user sees the success message
            setTimeout(() => {
                navigate('/eventspagecurrent')
            }, 800)
        } catch (e) {
            setMessage('Could not add event')
        }

        setLoading(false)
    }

    return (
        <div className="col-12">
            <div
                style={{
                    backgroundColor: '#16181F',
                    border: '1px solid #2B2F3A',
                    borderRadius: '15px',
                    paddingLeft: '38px',
                    paddingTop: '20px',
                    paddingRight: '29px',
                }}
            >
                <BasicEventDetails
                    title={title}
                    description={description}
                    setTitle={setTitle}
                    setDescription={setDescription}
                />

                <EventMetaInformation
                    location={location}
                    date={date}
                    time={time}
                    setLocation={setLocation}
                    setDate={setDate}
                    setTime={setTime}
                />

                {/* simple input so imageURL actually gets set */}
                <div className="mb-4" style={{ maxWidth: '90%' }}>
                    <label
                        className="form-label small"
                        style={{ color: '#FFFFFF', fontSize: '16px' }}
                    >
                        Image URL (optional)
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="https://..."
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        style={{
                            border: '2px solid #5B6CFF',
                            borderRadius: '15px',
                            backgroundColor: '#16181F',
                            color: '#EDEEF3',
                            fontSize: '16px',
                            height: '48px',
                            boxShadow: 'none',
                            outline: 'none',
                        }}
                    />
                </div>

                {/* keep UI, but it does NOT affect API call */}
                <OrganiserDetails
                    organizer={organizer}
                    contactName={contactName}
                    contactEmail={contactEmail}
                    allowRatings={allowRatings}
                    makePublic={makePublic}
                    setOrganizer={setOrganizer}
                    setContactName={setContactName}
                    setContactEmail={setContactEmail}
                    setAllowRatings={setAllowRatings}
                    setMakePublic={setMakePublic}
                />

                {message && (
                    <p
                        className="text-center mt-3"
                        style={{ color: '#EDEEF3', fontSize: '14px' }}
                    >
                        {message}
                    </p>
                )}

                <div className="d-flex justify-content-center mb-4">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-primary rounded-pill px-4 py-2 fw-bold"
                        disabled={loading}
                        style={{
                            background:
                                'linear-gradient(90deg, #5B6CFF 0%, #374199 100%)',
                            border: '1px solid #2B2F3A',
                            color: '#FFFFFF',
                            fontSize: '18px',
                            width: '200px',
                            height: '50px',
                        }}
                    >
                        {loading ? 'Publishing...' : 'Publish Event'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddEventForm
