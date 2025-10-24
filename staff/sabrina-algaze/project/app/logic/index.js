import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { getTrainingsForPlayer } from './getTrainingsForPlayer'
import { getTrainingById } from './getTrainingById'
import { getJoinedPlayersFromTraining } from './getJoinedPlayersFromTraining'
import { toggleJoinTraining } from './toggleJoinTraining'
import { getGroupsForPlayer } from './getGroupsForPlayer'
import { createPayment } from './createPayment'
import { getPaymentsForPlayer } from './getPaymentsForPlayer'

export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getTrainingsForPlayer,
    getTrainingById,
    getJoinedPlayersFromTraining,
    toggleJoinTraining,
    getGroupsForPlayer,
    createPayment,
    getPaymentsForPlayer
}