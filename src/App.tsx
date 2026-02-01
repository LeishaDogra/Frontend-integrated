import { Routes, Route, useNavigate } from 'react-router-dom'
import LoginSignup from './components/AuthenticationPage/LoginSignup'
import AboutUs from './components/AboutUs'
import EventsPageCurrent from './components/EventsPage/EventsPageCurrent'
import MainScreen from './components/MainScreen/MainScreen'
import TermsAndConditions from './components/TermsAndConditions'
import AddEvents from './components/AddEventsPage/AddEvents'
import EventsPagePast from './components/EventsPage/EventsPagePast'
import ProtectedRoute from './components/AuthenticationPage/ProtectedRoute'
import { setNavigate } from './utils/redirect'
import { useEffect } from 'react'

const App = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setNavigate(navigate)
    }, [navigate])

    return (
        <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="/loginsignup" element={<LoginSignup />} />

            <Route
                path="/addevents"
                element={
                    <ProtectedRoute>
                        <AddEvents />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/eventspagecurrent"
                element={
                    <ProtectedRoute>
                        <EventsPageCurrent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/eventspagepast"
                element={
                    <ProtectedRoute>
                        <EventsPagePast />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mainscreen"
                element={
                    <ProtectedRoute>
                        <MainScreen />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/events/current/:id"
                element={
                    <ProtectedRoute>
                        <EventsPageCurrent />
                    </ProtectedRoute>
                }
            />

            <Route path="/aboutus" element={<AboutUs />} />
            <Route
                path="/termsandconditions"
                element={<TermsAndConditions />}
            />
        </Routes>
    )
}

export default App

