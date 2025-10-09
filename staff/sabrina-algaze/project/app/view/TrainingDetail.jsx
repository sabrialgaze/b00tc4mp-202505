import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { logic } from '../logic'
import { helper } from './helper'

export const TrainingDetail = () => {
    const { trainingId } = useParams()
    const [training, setTraining] = useState(null)
    const [joinedPlayers, setJoinedPlayers] = useState([])

    const loadTrainingData = () => {
        try {
            Promise.all([
                logic.getTrainingById(trainingId),
                logic.getJoinedPlayersFromTraining(trainingId)
            ])
                .then(([training, joinedPlayers]) => {
                    setTraining(training)
                    setJoinedPlayers(joinedPlayers)
                })
                .catch(error => {
                    console.error(error)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }

    }

    useEffect(() => {
        loadTrainingData()
    }, [])

    console.debug('TrainingDetail -> render')

    return training ? <div>
        <h1>
            {helper.friendlyISODate(training.date)}
        </h1>
        <p>
            {training.group.name}
        </p>
        <p>
            {training.group.location}
        </p>

        <div>
            {joinedPlayers.length === 0 ? (
                <p>No players joined</p>
            ) : (
                <ul>
                    {joinedPlayers.map(player => (
                        <li className="border-2 rounded-xl border-black-600 p-4" key={player.id}>{player.name}</li>
                    ))}
                </ul>
            )}
        </div>
    </div>
        :
        <div>Loading...</div>
}