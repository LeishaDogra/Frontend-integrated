import { Link } from 'react-router-dom'
import type { EventDataMainpage } from './types'
import styles from './EventCardMain.module.css'
import { IoLocationOutline } from 'react-icons/io5'

interface EventCardProps {
    event: EventDataMainpage
}

const EventCard = ({ event }: EventCardProps) => {
    return (
        <Link to={`/events/current/${event.id}`} className={styles.cardLink}>
            <div className={styles.card}>
                {/* Image */}
                <div
                    className={styles.imageWrapper}
                    style={{ borderRadius: '10px' }}
                >
                    <img
                        src={event.image || '/placeholder.png'}
                        alt={event.title}
                    />
                </div>

                {/* Content */}
                <div className={styles.content}>
                    <h3 className={styles.title}>{event.title}</h3>

                    <p className={styles.organizer}>By {event.organizer}</p>

                    <div className={styles.meta}>
                        <span>
                            <IoLocationOutline /> {event.location}
                        </span>
                        <span>
                            <span style={{ marginRight: '10px' }}>
                                {event.date}
                            </span>
                            <span>{event.time}</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EventCard
