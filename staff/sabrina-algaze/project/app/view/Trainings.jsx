import { useState, useEffect } from 'react'
import { Training } from './Training'
import { logic } from '../logic'
import { helper } from './helper'

export const Trainings = () => {
    const [trainings, setTrainings] = useState([])

    const loadTrainings = () => {
        try {
            const playerId = helper.getUserId()
            logic.getTrainingsForPlayer(playerId)
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
            {trainings.map(training => <Training key={training.id} training={training} />)}
        </ul>
    </div>
}