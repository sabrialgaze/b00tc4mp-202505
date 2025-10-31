import { useState, useEffect } from 'react'
import { Training } from './Training'
import { logic } from '../logic'
import { useRole } from '../hooks'

export const Trainings = ({ onTrainingClicked }) => {
    const [trainings, setTrainings] = useState([])

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

    console.debug('Trainings -> render')

    return <div>
        <ul>
            <li className="py-2">
                {trainings.map(training => <Training key={training.id} training={training} onTrainingClicked={onTrainingClicked} />)}
            </li>
        </ul>
    </div>
}