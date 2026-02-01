import type { ChangeEvent } from 'react'

type Props = {
    title: string
    description: string
    setTitle: (val: string) => void
    setDescription: (val: string) => void
    // later we can add image setter here too
}

const BasicEventDetails = ({
    title,
    description,
    setTitle,
    setDescription,
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

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setDescription(e.target.value)
    }

    return (
        <div className="mb-2 position-relative">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="fw-medium" style={headingStyle}>
                    Basic event details
                </p>
                <button
                    type="button"
                    className="btn"
                    style={{
                        width: '162px',
                        height: '48px',
                        borderRadius: '15px',
                        marginTop: '32px',
                        border: '1px solid #5B6CFF',
                        fontSize: '16px',
                        color: '#EDEEF3',
                    }}
                >
                    Add event Image +
                </button>
            </div>

            <div className="mb-3">
                <label className="form-label small" style={subHeadingStyle}>
                    Enter event title
                </label>
                <input
                    type="text"
                    name="title"
                    className="placeholder form-control"
                    placeholder="Enter event title..."
                    value={title}
                    onChange={handleTitleChange}
                    style={{ ...inputBoxStyle, height: '48px' }}
                />
            </div>

            <div className="mb-3">
                <label className="form-label small" style={subHeadingStyle}>
                    Short Description
                </label>
                <textarea
                    name="description"
                    className="form-control placeholder"
                    rows={3}
                    placeholder="A brief summary shown on the event card..."
                    value={description}
                    onChange={handleDescriptionChange}
                    maxLength={150}
                    style={{
                        ...inputBoxStyle,
                        height: '96px',
                    }}
                ></textarea>
                <div
                    className="text-end"
                    style={{ color: '#7C8194', fontSize: '16px' }}
                >
                    {description.length}/150
                </div>
            </div>
        </div>
    )
}

export default BasicEventDetails


