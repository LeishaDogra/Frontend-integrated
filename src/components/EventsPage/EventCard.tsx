import type { EventData } from './types'

interface EventCardProps {
    events: EventData[]
    selectedId: number
    // eslint-disable-next-line no-unused-vars
    onSelect: (event: EventData) => void
}

const EventCard = ({ events, selectedId, onSelect }: EventCardProps) => {
    return (
        <>
            {events.map((event) => (
                <div
                    key={event.id}
                    onClick={() => onSelect(event)}
                    className="mb-3 p-2 rounded-3"
                    style={{
                        backgroundColor:
                            selectedId === event.id ? '#262A36' : '#16181F',
                        border: '1px solid #2B2F3A',
                        cursor: 'pointer',
                    }}
                >
                    {/* Image  */}
                    <div
                        className="w-100 mb-2 overflow-hidden rounded-2"
                        style={{ height: '100px' }}
                    >
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-100 h-100"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    {/* Title and info */}
                    <div className="px-1">
                        <p
                            className="mb-0 fw-medium"
                            style={{ fontSize: '16px', color: '#EDEEF3' }}
                        >
                            {event.title}
                        </p>
                        <p
                            className="mb-0"
                            style={{ fontSize: '12px', color: '#B2B6C7' }}
                        >
                            By {event.organizer}
                        </p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default EventCard
