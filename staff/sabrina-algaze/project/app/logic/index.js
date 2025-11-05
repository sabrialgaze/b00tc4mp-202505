import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { getTrainingsForPlayer } from './getTrainingsForPlayer'
import { getTrainingsForCoach } from './getTrainingsForCoach'
import { getTrainingInfo } from './getTrainingInfo.js'
import { toggleJoinTraining } from './toggleJoinTraining'
import { getGroupsForPlayer } from './getGroupsForPlayer'
import { getGroupsForCoach } from './getGroupsForCoach'
import { getGroupInfoForCoach } from './getGroupInfoForCoach.js'
import { createPayment } from './createPayment'
import { getPaymentsForPlayer } from './getPaymentsForPlayer'
import { getUserRole } from './getUserRole'
import { addPlayerToGroup } from './addPlayerToGroup'
import { createGroup } from './createGroup'

export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    createGroup,
    getTrainingsForPlayer,
    getTrainingsForCoach,
    getTrainingInfo,
    toggleJoinTraining,
    getGroupsForPlayer,
    getGroupsForCoach,
    getGroupInfoForCoach,
    createPayment,
    getPaymentsForPlayer,
    getUserRole,
    addPlayerToGroup
}