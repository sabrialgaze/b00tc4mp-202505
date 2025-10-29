import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { logic } from '../logic'
import { helper } from './helper'

export const TrainingDetail = () => {
    const { trainingId } = useParams()
    const [training, setTraining] = useState(null)
    const [joinedPlayers, setJoinedPlayers] = useState([])

    const isPastTraining = training && new Date(training.date) < new Date()

    const loadTrainingData = () => {
        try {
            logic.getTrainingInfo(trainingId)
                .then(training => {
                    setTraining(training)
                    setJoinedPlayers(training.joined)
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

    const handleToggleJoinTrainingClick = () => {
        try {
            logic.toggleJoinTraining(trainingId)
                .then(() => {
                    loadTrainingData()
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

    useEffect(() => {
        loadTrainingData()
    }, [])

    console.debug('TrainingDetail -> render')

    return training ? <div>
        <div className="mb-6 flex justify-between items-start">
            <div>
                <h1 className="text-xl font-bold mb-2">
                    {helper.friendlyISODate(training.date)}
                </h1>
                <h2 className="text-gray-600">
                    {training.group.location}
                </h2>
            </div>
            {!isPastTraining && (<button onClick={handleToggleJoinTrainingClick} className="border-2 rounded-xl border-black-600 px-4 py-2 hover:bg-gray-100">
                {training.isJoined ? 'Unjoin' : 'Join'}
            </button>)}
        </div>
        <div>
            {joinedPlayers.length === 0 ? (
                <p>No players joined</p>
            ) : (
                <ul>
                    {joinedPlayers.map(player => (
                        <li className="border-2 rounded-xl border-black-600 p-4 mt-2" key={player.id}>{player.name}</li>
                    ))}
                </ul>
            )}
        </div>
    </div>
        :
        <div>Loading...</div>
}