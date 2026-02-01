import type { EventData } from './types'
import EventList from './EventList'
import { useState } from 'react'
import EventsHeader from './EventsPageHeader'
import EventDetails from './EventDetails'

// Will get rid if this later
const MOCK_EVENTS: EventData[] = [
    {
        id: 1,
        title: 'Airshow 2026',
        organizer: 'Aeromodelling Club',
        image: '',
        date: '26 Jan',
        time: '5:00 PM',
        location: 'LA 202',
        rating: 4.8,
        reviewCount: 120,
        description:
            'Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text ',
    },
    {
        id: 1,
        title: 'Airshow 2027',
        organizer: 'Aeromodelling Club',
        image: '',
        date: '26 Jan',
        time: '5:00 PM',
        location: 'LA 202',
        rating: 4.8,
        reviewCount: 120,
        description:
            'Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text ',
    },
    {
        id: 1,
        title: 'Airshow 2028',
        organizer: 'Aeromodelling Club',
        image: '',
        date: '26 Jan',
        time: '5:00 PM',
        location: 'LA 202',
        rating: 4.8,
        reviewCount: 120,
        description:
            'Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text ',
    },
    {
        id: 1,
        title: 'Airshow 2026',
        organizer: 'Aeromodelling Club',
        image: '',
        date: '26 Jan',
        time: '5:00 PM',
        location: 'LA 202',
        rating: 4.8,
        reviewCount: 120,
        description:
            'Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text ',
    },
    {
        id: 1,
        title: 'Airshow 2026',
        organizer: 'Aeromodelling Club',
        image: '',
        date: '26 Jan',
        time: '5:00 PM',
        location: 'LA 202',
        rating: 4.8,
        reviewCount: 120,
        description:
            'Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text ',
    },
    {
        id: 1,
        title: 'Airshow 2026',
        organizer: 'Aeromodelling Club',
        image: '',
        date: '26 Jan',
        time: '5:00 PM',
        location: 'LA 202',
        rating: 4.8,
        reviewCount: 120,
        description:
            'Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text Random Text ',
    },
]

const EventsPagePast = () => {
    const [events, _setEvents] = useState<EventData[]>(MOCK_EVENTS)
    const [selectedEvent, setSelectedEvent] = useState<EventData>(
        MOCK_EVENTS[0],
    )
    return (
        <div
            className="container-fluid min-vh-100"
            style={{ backgroundColor: '#16181F' }}
        >
            <div className="row min-vh-100">
                <div
                    className="col-md-3 col-lg-3 overflow-auto"
                    style={{
                        height: '100vh',
                        minHeight: 0,
                        paddingTop: '30px',
                        borderRight: ' 1px solid rgba(237, 238, 243, 0.1) ',
                        borderTopRightRadius: '16px',
                        borderBottomRightRadius: '16px',
                    }}
                >
                    {/* Events list */}
                    <EventList
                        events={events}
                        selectedId={selectedEvent.id}
                        onSelect={setSelectedEvent}
                    />
                </div>

                {/* Main content */}

                <div
                    className="col-md-9 col-lg-9 overflow-auto p-4"
                    style={{ backgroundColor: '#0E0F13' }}
                >
                    {/* Header */}
                    <EventsHeader />

                    {/* Event Details */}
                    <EventDetails event={selectedEvent} isCurrent={false} />

                    {/* Footer */}
                    <div
                        className="text-center mt-1 "
                        style={{ fontSize: '10px', color: '#B2B6C7' }}
                    >
                        **InstiView is not responsible for the content/matter
                        that is represented by the above Club/Team/Person**
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventsPagePast
