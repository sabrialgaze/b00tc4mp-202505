import { useState, useEffect } from 'react'
import { Training } from './Training'
import { logic } from '../logic'
import { useRole } from '../hooks'
import { useNavigate } from 'react-router'

export const Trainings = ({ onTrainingClicked }) => {
    const [trainings, setTrainings] = useState([])
    const navigate = useNavigate()

    const role = useRole()

    const loadTrainings = () => {
        if (!role) return

        try {
            if (role === 'player') {
                logic.getTrainingsForPlayer()
                    .then(trainings => {
                        setTrainings(trainings)
                    })
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })
            } else if (role === 'coach') {
                logic.getTrainingsForCoach()
                    .then(trainings => {
                        setTrainings(trainings)
                    })
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    useEffect(() => loadTrainings(), [role])

    const handleCreateTrainingClick = () => {
        navigate('/new-training')
    }

    console.debug('Trainings -> render')

    return <div>
        {role === 'coach' && (
            <div className="flex">
                <h1 className="text-xl font-normal text-left pr-2">Trainings</h1>
                <button onClick={handleCreateTrainingClick} className="border-2 rounded-xl border-black-600 px-2 py-0.5 hover:bg-gray-100 font-bold">+</button>
            </div>
        )}
        <ul>
            <li className="py-2">
                {trainings.map(training => <Training key={training.id} training={training} onTrainingClicked={onTrainingClicked} />)}
            </li>
        </ul>
    </div>
}