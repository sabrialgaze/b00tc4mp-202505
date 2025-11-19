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
import { getTrainingsForCoach } from './getTrainingsForCoach.js'
import { getTrainingInfo } from './getTrainingInfo.js'
import { createPayment } from './createPayment.js'
import { getGroupsForCoach } from './getGroupsForCoach.js'
import { getGroupsForPlayer } from './getGroupsForPlayer.js'
import { getGroupInfoForCoach } from './getGroupInfoForCoach.js'
import { getPaymentsForPlayer } from './getPaymentsForPlayer.js'
import { getPaymentsForCoach } from './getPaymentsForCoach.js'
import { toggleConfirmPayment } from './toggleConfirmPayment.js'

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
    getTrainingsForCoach,
    getTrainingInfo,
    toggleJoinTraining,
    createPayment,
    getGroupsForCoach,
    getGroupsForPlayer,
    getGroupInfoForCoach,
    getPaymentsForPlayer,
    getPaymentsForCoach,
    toggleConfirmPayment,
}