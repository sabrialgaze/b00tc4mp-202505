import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { createGroup } from './createGroup'
import { createTraining } from './createTraining'
import { getTrainingsForPlayer } from './getTrainingsForPlayer'
import { getTrainingsForCoach } from './getTrainingsForCoach'
import { getTrainingInfo } from './getTrainingInfo.js'
import { toggleJoinTraining } from './toggleJoinTraining'
import { getGroupsForPlayer } from './getGroupsForPlayer'
import { getGroupsForCoach } from './getGroupsForCoach'
import { getGroupInfoForCoach } from './getGroupInfoForCoach.js'
import { createPayment } from './createPayment'
import { getPaymentsForPlayer } from './getPaymentsForPlayer'
import { getPaymentsForCoach } from './getPaymentsForCoach'
import { getUserRole } from './getUserRole'
import { addPlayerToGroup } from './addPlayerToGroup'
import { removePlayerFromGroup } from './removePlayerFromGroup.js'
import { toggleConfirmPayment } from './toggleConfirmPayment'
import { updateGroup } from './updateGroup'


export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    createGroup,
    createTraining,
    getTrainingsForPlayer,
    getTrainingsForCoach,
    getTrainingInfo,
    toggleJoinTraining,
    getGroupsForPlayer,
    getGroupsForCoach,
    getGroupInfoForCoach,
    createPayment,
    getPaymentsForPlayer,
    getPaymentsForCoach,
    getUserRole,
    addPlayerToGroup,
    removePlayerFromGroup,
    toggleConfirmPayment,
    updateGroup
}