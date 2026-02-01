import type { ChangeEvent } from 'react'

const headingStyle = { color: '#EDEEF3', fontSize: '32px' }
const subHeadingStyle = { color: '#FFFFFF', fontSize: '16px' }
const inputBoxStyle = {
    border: '2px solid #5B6CFF',
    borderRadius: '15px',
    backgroundColor: '#16181F',
    color: '#EDEEF3',
    fontSize: '16px',
    lineHeight: 'normal',
    fontWeight: 400,
    height: '48px',
    cursor: 'text',
    boxShadow: 'none',
    outline: 'none',
}

type Props = {
    location: string
    date: string
    time: string
    setLocation: (val: string) => void
    setDate: (val: string) => void
    setTime: (val: string) => void
}

const EventMetaInformation = ({
    location,
    date,
    time,
    setLocation,
    setDate,
    setTime,
}: Props) => {
    function handleLocationChange(e: ChangeEvent<HTMLInputElement>) {
        setLocation(e.target.value)
    }

    function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
        setDate(e.target.value)
    }

    function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
        setTime(e.target.value)
    }

    return (
        <div className="mb-5">
            <style>
                {`
                .placeholder::placeholder {
                    color: white !important;
                }
                `}
            </style>

            <div className="mb-3">
                <p className="fw-medium" style={headingStyle}>
                    Event Meta Information
                </p>

                <div className="row g-3" style={{ maxWidth: '90%' }}>
                    <Info
                        icon="bi-geo-alt"
                        label="Location"
                        value={location}
                        onChange={handleLocationChange}
                    />
                    <Info
                        icon="bi-calendar-event"
                        label="Date"
                        value={date}
                        onChange={handleDateChange}
                    />
                    <Info
                        icon="bi-clock"
                        label="Time"
                        value={time}
                        onChange={handleTimeChange}
                    />
                </div>
            </div>
        </div>
    )
}

const Info = ({
    icon,
    label,
    value,
    onChange,
}: {
    icon: string
    label: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => (
    <div className="col-md-4">
        <label className="form-label" style={subHeadingStyle}>
            {label}
        </label>
        <div className="input-group">
            <span
                className="input-group-text bg-transparent border-end-0"
                style={{
                    ...inputBoxStyle,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }}
            >
                <i className={`bi ${icon} text-info me-1`}></i>
            </span>

            <input
                type="text"
                className="placeholder form-control bg-transparent border-start-0"
                placeholder={`${label}...`}
                value={value}
                onChange={onChange}
                style={{
                    ...inputBoxStyle,
                    borderBottomLeftRadius: 0,
                    borderTopLeftRadius: 0,
                }}
            />
        </div>
    </div>
)

export default EventMetaInformation

