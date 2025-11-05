import { Routes, Route, useNavigate, Link } from 'react-router'
import { useRole } from '../hooks'

import { ArrowRightStartOnRectangleIcon, CalendarIcon, BanknotesIcon, UserGroupIcon } from '@heroicons/react/24/outline'

import { logic } from '../logic'
import { Trainings } from './Trainings'
import { TrainingDetail } from './TrainingDetail'
import { Payments } from './Payments'
import { NewPayment } from './NewPayment'
import { Groups } from './Groups'
import { GroupDetail } from './GroupDetail'
import { AddPlayer } from './AddPlayer'

export const Home = ({ onUserLoggedOut }) => {
    const navigate = useNavigate()

    const role = useRole()

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch (error) {
            console.error(error)

            alert(error.message
            )
        }
    }

    const handleTrainingClicked = trainingId => {
        navigate(`/training/${trainingId}`)
    }

    const handleGroupClicked = groupId => {
        navigate(`/group/${groupId}`)
    }

    console.debug('Home -> render')

    return <div>
        <header className="fixed top-0 w-full backdrop-blur-sm">
            <nav className="flex justify-between items-center p-4 ">
                <h1 className="text-3xl font-semibold"><Link to="/">Count.in</Link></h1>
                <button type="button" onClick={handleLogoutClick}><ArrowRightStartOnRectangleIcon className="w-5 h-5 text-gray-700" /></button>
            </nav>
        </header>

        <div className="py-20">
            <Routes>
                {role === 'player' && (
                    <>
                        <Route path="/" element={<Trainings onTrainingClicked={handleTrainingClicked} />} />
                        <Route path="/training/:trainingId" element={<TrainingDetail />} />
                        <Route path="/payments" element={<Payments />} />
                        <Route path="/new-payment" element={<NewPayment />} />
                    </>
                )}
                {role === 'coach' && (
                    <>
                        <Route path="/" element={<Groups onGroupClicked={handleGroupClicked} />} />
                        <Route path="/group/:groupId" element={<GroupDetail />} />
                        <Route path="/trainings" element={<Trainings onTrainingClicked={handleTrainingClicked} />} />
                        <Route path="/training/:trainingId" element={<TrainingDetail />} />
                        <Route path="/group/:groupId/add-player" element={<AddPlayer />} />
                    </>
                )}
            </Routes>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 py-6 bg-gray-300">
            <div className="flex justify-center space-x-4">
                {role === 'player' && (
                    <>
                        <button type="button"><Link to="/"><CalendarIcon className="w-10 h-10 text-gray-700" /></Link></button>
                        <button type="button"><Link to="/payments"><BanknotesIcon className="w-10 h-10 text-gray-700" /></Link></button>
                    </>
                )}
                {role === 'coach' && (
                    <>
                        <button type="button"><Link to="/"><UserGroupIcon className="w-10 h-10 text-gray-700" /></Link></button>
                        <button type="button"><Link to="/trainings"><CalendarIcon className="w-10 h-10 text-gray-700" /></Link></button>
                    </>
                )}
            </div>
        </footer>
    </div>
}
