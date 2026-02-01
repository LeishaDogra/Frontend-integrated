import EventCard from './EventCard'
import type { EventData } from './types'

interface EventListProps {
    events: EventData[]
    selectedId: number
    // eslint-disable-next-line no-unused-vars
    onSelect: (event: EventData) => void
}

const EventList = ({ events, selectedId, onSelect }: EventListProps) => {
    return (
        <div className="d-flex flex-column h-100 w-100">
            <h4
                className="fw-bold mb-4 text-center"
                style={{
                    color: '#B2B6C7',
                    paddingRight: '30px',
                    fontSize: '32px',
                }}
            >
                Event List
            </h4>

            <div
                className="custom-scroll flex-grow-1"
                style={{
                    overflowY: 'auto',
                    paddingLeft: '20px',
                    paddingRight: '40px',
                }}
            >
                <style>{`
        .custom-scroll::-webkit-scrollbar {
        width: 10px;
        }

        .custom-scroll::-webkit-scrollbar-track {
        border: 1px solid #B2B6C7;  
        border-radius: 6px;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
        background-color: #B2B6C7;
        border-radius: 6px;
        border: 2px solid #B2B6C7;
        }
      `}</style>
                <EventCard
                    events={events}
                    selectedId={selectedId}
                    onSelect={onSelect}
                />
            </div>
        </div>
    )
}

export default EventList
