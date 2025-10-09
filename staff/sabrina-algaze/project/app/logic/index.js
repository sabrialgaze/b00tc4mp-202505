import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { getTrainingsForPlayer } from './getTrainingsForPlayer'
import { getTrainingById } from './getTrainingById'
import { getJoinedPlayersFromTraining } from './getJoinedPlayersFromTraining'

export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getTrainingsForPlayer,
    getTrainingById,
    getJoinedPlayersFromTraining
}