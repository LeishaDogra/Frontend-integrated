import AddEventForm from './AddEventForm'

const AddEvents = () => {
    return (
        <div
            className="min-vh-100"
            style={{
                backgroundColor: '#0E0F13',
                paddingTop: '53px',
            }}
        >
            <div className="container" style={{ marginLeft: '65px' }}>
                <div className="mb-4">
                    <h2
                        className="fw-medium mb-0"
                        style={{ color: '#EDEEF3', fontSize: '32px' }}
                    >
                        Add New Event
                    </h2>
                    <p
                        className="fw-light"
                        style={{ color: '#EDEEF3', fontSize: '16px' }}
                    >
                        Share your event with the instiview community
                    </p>
                </div>

                <div className="row g-4" style={{ marginBottom: '80px' }}>
                    {/* Add Event Form */}
                    <AddEventForm />
                </div>
            </div>
        </div>
    )
}

export default AddEvents
