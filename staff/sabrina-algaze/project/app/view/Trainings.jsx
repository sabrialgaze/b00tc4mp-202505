import { useState, useEffect } from 'react'
import { Training } from './Training'
import { logic } from '../logic'

export const Trainings = ({ onTrainingClicked }) => {
    const [trainings, setTrainings] = useState([])

    const loadTrainings = () => {
        try {
            logic.getTrainingsForPlayer()
                .then(trainings => {
                    setTrainings(trainings)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    useEffect(() => loadTrainings(), [])

    console.debug('Trainings -> render')

    return <div>
        <ul>
            <li className="py-2">
                {trainings.map(training => <Training key={training.id} training={training} onTrainingClicked={onTrainingClicked} />)}
            </li>
        </ul>
    </div>
}