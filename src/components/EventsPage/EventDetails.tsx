import { useEffect, useState } from 'react'
import type { EventData } from './types'
import BlueTickIcon from '../../assets/bluetick.svg'
import { apiFetch } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { getLoggedInUserId } from '../../utils/authHelpers'

interface EventDetailProps {
    event: EventData
    isCurrent?: boolean
}

const EventDetail = ({ event, isCurrent }: EventDetailProps) => {
    const navigate = useNavigate()

    const [isExpanded, setIsExpanded] = useState(false)

    const [isAttended, setIsAttended] = useState(false)

    const [userRating, setUserRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    const [comment, setComment] = useState('')

    const [reviews, setReviews] = useState<any[]>([])
    const [reviewsLoading, setReviewsLoading] = useState(false)
    const [reviewsError, setReviewsError] = useState<string | null>(null)

    const [submitting, setSubmitting] = useState(false)
    const [submitMsg, setSubmitMsg] = useState<string | null>(null)

    const [deletingEvent, setDeletingEvent] = useState(false)
    const [deleteEventMsg, setDeleteEventMsg] = useState<string | null>(null)

    // creator check (token -> user id)
    const loggedInUserId = getLoggedInUserId()
    const isCreator =
        loggedInUserId !== null &&
        typeof event.user === 'number' &&
        Number(loggedInUserId) === event.user

    useEffect(() => {
        setIsExpanded(false)
        setSubmitMsg(null)
        setDeleteEventMsg(null)
        setComment('')
        setUserRating(0)
        setHoverRating(0)
    }, [event.id])

    // fetch reviews when event changes
    useEffect(() => {
        async function fetchReviews() {
            setReviewsLoading(true)
            setReviewsError(null)

            try {
                const res = await apiFetch(`events/${event.id}/reviews/`)

                if (!res.ok) {
                    setReviewsError('Could not load reviews')
                    setReviews([])
                    setReviewsLoading(false)
                    return
                }

                const data = await res.json()

                // supports either: [] or { reviews: [] }
                if (Array.isArray(data)) {
                    setReviews(data)
                } else if (Array.isArray(data?.reviews)) {
                    setReviews(data.reviews)
                } else {
                    setReviews([])
                }
            } catch (e) {
                setReviewsError('Could not load reviews')
                setReviews([])
            }

            setReviewsLoading(false)
        }

        if (event?.id !== undefined && event?.id !== null) {
            fetchReviews()
        }
    }, [event.id])

    const textToShow =
        isExpanded || !(event.description.length > 150)
            ? event.description
            : event.description.slice(0, 150) + '...'

    async function handleSubmitReview() {
        setSubmitMsg(null)

        if (userRating === 0) {
            setSubmitMsg('Please select rating first')
            return
        }

        if (comment.trim().length === 0) {
            setSubmitMsg('Please write a comment')
            return
        }

        setSubmitting(true)

        try {
            const res = await apiFetch(`events/${event.id}/reviews/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating: userRating,
                    comment: comment.trim(),
                }),
            })

            if (!res.ok) {
                setSubmitMsg('Could not submit review')
                setSubmitting(false)
                return
            }

            const newReview = await res.json()

            const newList: any[] = []
            newList.push(newReview)
            for (let i = 0; i < reviews.length; i++) {
                newList.push(reviews[i])
            }
            setReviews(newList)

            setComment('')
            setUserRating(0)
            setHoverRating(0)
            setSubmitMsg('Review submitted ✅')
        } catch (e) {
            setSubmitMsg('Could not submit review')
        }

        setSubmitting(false)
    }

    async function handleDeleteReview(reviewId: number) {
        try {
            const res = await apiFetch(
                `events/${event.id}/reviews/${reviewId}/delete/`,
                { method: 'DELETE' },
            )

            if (!res.ok) return

            const newList: any[] = []
            for (let i = 0; i < reviews.length; i++) {
                if (reviews[i].id !== reviewId) {
                    newList.push(reviews[i])
                }
            }
            setReviews(newList)
        } catch (e) {
            // do nothing
        }
    }

    async function handleDeleteEvent() {
        const ok = window.confirm('Are you sure you want to cancel this event?')
        if (!ok) return

        setDeletingEvent(true)
        setDeleteEventMsg(null)

        try {
            const res = await apiFetch(`events/${event.id}/delete/`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                setDeleteEventMsg('Could not cancel event')
                setDeletingEvent(false)
                return
            }

            setDeleteEventMsg('Event cancelled ✅')

            setTimeout(() => {
                navigate('/eventspagecurrent')
            }, 800)
        } catch (e) {
            setDeleteEventMsg('Could not cancel event')
        }

        setDeletingEvent(false)
    }

    return (
        <div
            style={{
                backgroundColor: '#0E0F13',
                border: '2px solid #2B2F3A',
                height: 'fit-content',
                padding: '18px',
                marginLeft: '100px',
                marginRight: '100px',
                marginTop: '50px',
                paddingTop: '32px',
                borderRadius: '15px',
                paddingBottom: '18px',
            }}
        >
            {/* Image */}
            <div
                className="w-100 mb-4 overflow-hidden position-relative"
                style={{ height: '280px' }}
            >
                <img
                    src={event.image}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover', borderRadius: '15px' }}
                />
            </div>

            {/* Title */}
            <div
                className="d-flex justify-content-between align-items-start mb-3"
                style={{ paddingLeft: '59px' }}
            >
                <div>
                    <h2
                        className="fw-medium mb-0"
                        style={{ color: '#EDEEF3', fontSize: '44px' }}
                    >
                        {event.title}
                    </h2>
                    <p
                        className="mb-1"
                        style={{ color: '#B2B6C7', fontSize: '14px' }}
                    >
                        organised by {event.organizer}
                    </p>
                </div>
                <button
                    className="btn btn-sm text-white"
                    style={{ paddingRight: '61px', fontSize: '12px' }}
                >
                    More <i className="bi bi-chevron-down"></i>
                </button>
            </div>

            {/* Description */}
            <div className="mb-4" style={{ paddingLeft: '59px' }}>
                <p className="mb-0" style={{ color: 'white', fontSize: '12px' }}>
                    ABOUT
                </p>
                <p
                    style={{
                        maxWidth: '90%',
                        color: '#EDEEF3',
                        fontSize: '14px',
                    }}
                >
                    {textToShow}
                    {event.description.length > 150 && (
                        <span
                            className="ms-1 fw-bold"
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{ cursor: 'pointer', color: '#522991' }}
                        >
                            {isExpanded ? ' Show Less' : ' Read More'}
                        </span>
                    )}
                </p>
            </div>

            {/* More Info */}
            <div className="row" style={{ maxWidth: '100%' }}>
                {/* Time, Venue, Date */}
                <div
                    className="col-md"
                    style={{ paddingLeft: '59px', maxWidth: '37%' }}
                >
                    <div
                        className="h-100 d-flex flex-column justify-content-center"
                        style={{
                            backgroundColor: '#0E0F13',
                            border: '2px solid #2B2F3A',
                            borderRadius: '15px',
                            paddingLeft: '30px',
                            paddingRight: '40px',
                            paddingTop: '10px',
                        }}
                    >
                        {!isCurrent && (
                            <p
                                className="mb-2 fw-medium"
                                style={{ fontSize: '16px', color: '#FFFFFF' }}
                            >
                                Happened At
                            </p>
                        )}
                        <InfoRow
                            icon="geo-alt"
                            label="Location"
                            value={event.location}
                        />
                        <InfoRow
                            icon="calendar-event"
                            label="Date"
                            value={event.date}
                        />
                        <InfoRow icon="clock" label="Time" value={event.time} />
                    </div>
                </div>

                {/* Ratings + Review submit */}
                <div className="col-md" style={{ maxWidth: '42%' }}>
                    <div className="d-flex flex-column gap-3 h-100">
                        {/* Ratings Summary */}
                        <div
                            className="d-flex flex-column justify-content-center"
                            style={{
                                backgroundColor: '#0E0F13',
                                border: '2px solid #2B2F3A',
                                borderRadius: '15px',
                                padding: '20px',
                                flex: 1,
                            }}
                        >
                            <p
                                className="mb-2 "
                                style={{ fontSize: '16px', color: '#FFFFFF' }}
                            >
                                Ratings Summary:
                            </p>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div
                                        className="text-warning me-2"
                                        style={{ fontSize: '1.2rem' }}
                                    >
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i
                                                key={star}
                                                className={`bi bi-star${star <= Math.floor(event.rating) ? '-fill' : ''} me-1`}
                                            ></i>
                                        ))}
                                    </div>
                                    <span
                                        style={{
                                            fontSize: '16px',
                                            color: '#EDEEF3',
                                        }}
                                    >
                                        ({event.rating}/5)
                                    </span>
                                </div>
                                <span
                                    style={{
                                        fontSize: '16px',
                                        color: '#EDEEF3',
                                    }}
                                >
                                    {event.reviewCount} Ratings
                                </span>
                            </div>
                        </div>

                        {/* Rate Here */}
                        <div
                            className="d-flex flex-column justify-content-center"
                            style={{
                                backgroundColor: '#0E0F13',
                                border: '2px solid #2B2F3A',
                                borderRadius: '15px',
                                padding: '20px',
                                flex: 1,
                            }}
                        >
                            <small
                                className="text-white mb-2 d-block"
                                style={{ fontSize: '1rem' }}
                            >
                                Rate Here: ✨
                            </small>

                            <div className="d-flex align-items-center justify-content-between">
                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        fontSize: '1.5rem',
                                        cursor: 'pointer',
                                    }}
                                    onMouseLeave={() => setHoverRating(0)}
                                >
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i
                                            key={star}
                                            className={`bi bi-star${star <= (hoverRating || userRating) ? '-fill' : ''} me-2`}
                                            style={{
                                                color:
                                                    star <=
                                                    (hoverRating || userRating)
                                                        ? '#f6ac16'
                                                        : '#6c757d',
                                            }}
                                            onMouseEnter={() =>
                                                setHoverRating(star)
                                            }
                                            onClick={() => setUserRating(star)}
                                        ></i>
                                    ))}
                                </div>
                                <span
                                    className="fw-light"
                                    style={{
                                        fontSize: '16px',
                                        color: '#EDEEF3',
                                    }}
                                >
                                    Rate out of 5
                                </span>
                            </div>

                            <div className="mt-3">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your review..."
                                    className="form-control"
                                    style={{
                                        backgroundColor: '#0E0F13',
                                        color: '#EDEEF3',
                                        border: '1px solid #2B2F3A',
                                        fontSize: '12px',
                                    }}
                                    rows={3}
                                />
                            </div>

                            <button
                                className="btn btn-sm mt-2 text-white"
                                style={{ backgroundColor: '#522991' }}
                                onClick={handleSubmitReview}
                                disabled={submitting}
                            >
                                {submitting ? 'Submitting...' : 'Submit Review'}
                            </button>

                            {submitMsg && (
                                <small
                                    className="mt-2 d-block"
                                    style={{
                                        fontSize: '12px',
                                        color: '#B2B6C7',
                                    }}
                                >
                                    {submitMsg}
                                </small>
                            )}

                            <small
                                className="text-center mt-2 d-block"
                                style={{ fontSize: '10px', color: '#B2B6C7' }}
                            >
                                Your Response will be added to the average of
                                All Ratings
                            </small>
                        </div>
                    </div>
                </div>

                {/* Interested / Attended */}
                <div className="col-md" style={{ maxWidth: '21%' }}>
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{
                            backgroundColor: '#0E0F13',
                            border: '2px solid #2B2F3A',
                            borderRadius: '15px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}
                    >
                        <p
                            className="mb-2"
                            style={{ fontSize: '10px', color: '#EDEEF3' }}
                        >
                            Total Registerations
                        </p>
                        <span style={{ fontSize: '16px', color: '#FFFFFF' }}>
                            1000+
                        </span>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => setIsAttended(!isAttended)}
                        style={{ cursor: 'pointer', padding: '10px' }}
                    >
                        <div
                            className="d-flex justify-content-center align-items-center gap-2"
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                color: '#0d6efd',
                                paddingTop: '100px',
                            }}
                        >
                            <img
                                src={BlueTickIcon}
                                alt="BlueTick"
                                width="34"
                                height="34"
                            />

                            <span
                                style={{
                                    color: 'rgba(237, 238, 243, 0.6)',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                }}
                            >
                                Mark as {isCurrent ? 'Interested' : 'Attended'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel event (creator only) */}
            {isCurrent && isCreator && (
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={handleDeleteEvent}
                        disabled={deletingEvent}
                    >
                        {deletingEvent ? 'Cancelling...' : 'Cancel Event'}
                    </button>
                </div>
            )}

            {deleteEventMsg && (
                <p
                    className="text-end mt-2"
                    style={{ fontSize: '12px', color: '#B2B6C7' }}
                >
                    {deleteEventMsg}
                </p>
            )}

            {/* Reviews section */}
            <div style={{ paddingLeft: '59px', marginTop: '25px' }}>
                <p style={{ color: '#EDEEF3', fontSize: '16px' }}>Reviews</p>

                {reviewsLoading && (
                    <p style={{ color: '#B2B6C7', fontSize: '12px' }}>
                        Loading reviews...
                    </p>
                )}

                {reviewsError && (
                    <p style={{ color: '#ff6b6b', fontSize: '12px' }}>
                        {reviewsError}
                    </p>
                )}

                {!reviewsLoading && !reviewsError && reviews.length === 0 && (
                    <p style={{ color: '#B2B6C7', fontSize: '12px' }}>
                        No reviews yet.
                    </p>
                )}

                {!reviewsLoading &&
                    !reviewsError &&
                    reviews.map((r) => {
                        const dateText = r.created_at
                            ? new Date(r.created_at).toLocaleString()
                            : ''

                        return (
                            <div
                                key={r.id}
                                style={{
                                    border: '1px solid #2B2F3A',
                                    borderRadius: '10px',
                                    padding: '12px',
                                    marginBottom: '10px',
                                    maxWidth: '90%',
                                }}
                            >
                                <div className="d-flex justify-content-between">
                                    <div style={{ color: '#EDEEF3' }}>
                                        <span style={{ marginRight: '10px' }}>
                                            {'★'.repeat(r.rating || 0)}
                                        </span>
                                        <span
                                            style={{
                                                color: '#B2B6C7',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {dateText}
                                        </span>
                                    </div>

                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        style={{ fontSize: '10px' }}
                                        onClick={() => handleDeleteReview(r.id)}
                                    >
                                        Delete
                                    </button>
                                </div>

                                <p
                                    style={{
                                        color: '#EDEEF3',
                                        fontSize: '13px',
                                        marginTop: '8px',
                                        marginBottom: 0,
                                    }}
                                >
                                    {r.comment}
                                </p>
                            </div>
                        )
                    })}
            </div>

            <div
                className="text-end mt-3 "
                style={{ fontSize: '10px', color: '#B2B6C7' }}
            >
                *Clubs/Teams/People cancel events that are only added by them
            </div>
        </div>
    )
}

const InfoRow = ({
    icon,
    label,
    value,
}: {
    icon: string
    label: string
    value: string
}) => (
    <div className="d-flex align-items-center mb-3">
        <i
            className={`bi bi-${icon} text-info me-3`}
            style={{ fontSize: '25px' }}
        ></i>
        <div>
            <small
                className="d-block"
                style={{ fontSize: '10px', color: '#B2B6C7' }}
            >
                {label}
            </small>
            <strong style={{ fontSize: '20px', color: '#B2B6C7' }}>
                {value}
            </strong>
        </div>
    </div>
)

export default EventDetail


