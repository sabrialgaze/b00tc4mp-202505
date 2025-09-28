export const calculateNextTrainingDate = (groupDayNumber) => {
    const today = new Date()
    const todayDayNumber = today.getDay()

    let daysToAdd

    if (todayDayNumber <= groupDayNumber) {
        daysToAdd = groupDayNumber - todayDayNumber
    } else {
        daysToAdd = 7 - todayDayNumber + groupDayNumber
    }

    const nextTrainingDate = new Date(today)
    nextTrainingDate.setDate(today.getDate() + daysToAdd)

    return nextTrainingDate
}