export interface EventFormData {
    title: string
    description: string
    location: string
    date: string
    time: string
    organizer: string
    contactName: string
    contactEmail: string
    allowRatings: boolean
    makePublic: boolean
    image: File | null
    imagePreviewUrl: string // Helper for frontend preview
}
