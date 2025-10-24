import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { createGroup } from './createGroup.js'
import { updateGroup } from './updateGroup.js'
import { deleteGroup } from './deleteGroup.js'
import { addPlayerToGroup } from './addPlayerToGroup.js'
import { removePlayerFromGroup } from './removePlayerFromGroup.js'
import { createTraining } from './createTraining.js'
import { toggleJoinTraining } from './toggleJoinTraining.js'
import { getTrainingsForPlayer } from './getTrainingsForPlayer.js'
import { getTrainingById } from './getTrainingById.js'
import { getJoinedPlayersFromTraining } from './getJoinedPlayersFromTraining.js'
import { createPayment } from './createPayment.js'
import { getGroupsForCoach } from './getGroupsForCoach.js'
import { getGroupsForPlayer } from './getGroupsForPlayer.js'
import { getPaymentsForPlayer } from './getPaymentsForPlayer.js'

export const logic = {
    registerUser,
    authenticateUser,
    createGroup,
    updateGroup,
    deleteGroup,
    addPlayerToGroup,
    removePlayerFromGroup,
    createTraining,
    getTrainingsForPlayer,
    getTrainingById,
    toggleJoinTraining,
    getJoinedPlayersFromTraining,
    createPayment,
    getGroupsForCoach,
    getGroupsForPlayer,
    getPaymentsForPlayer,
}