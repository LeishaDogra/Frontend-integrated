import { Routes, Route, useNavigate } from 'react-router-dom'
import LoginSignup from './components/AuthenticationPage/LoginSignup'
import AboutUs from './components/AboutUs'
import EventsPageCurrent from './components/EventsPage/EventsPageCurrent'
import MainScreen from './components/MainScreen/MainScreen'
import TermsAndConditions from './components/TermsAndConditions'
import AddEvents from './components/AddEventsPage/AddEvents'
import EventsPagePast from './components/EventsPage/EventsPagePast'
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
            <Route path="/addevents" element={<AddEvents />} />
            <Route path="/eventspagecurrent" element={<EventsPageCurrent />} />
            <Route path="/eventspagepast" element={<EventsPagePast />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/mainscreen" element={<MainScreen />} />
            <Route path="/loginsignup" element={<LoginSignup />} />
            <Route
                path="/termsandconditions"
                element={<TermsAndConditions />}
            />
            <Route path="/events/current/:id" element={<EventsPageCurrent />} />
        </Routes>
    )
}

export default App
