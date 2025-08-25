export const convertISODateToFriendlyFormat = isoDate => {
    const nowDate = new Date
    const targetDate = new Date(isoDate)
    const monthName = new Intl.DateTimeFormat('en-EN', { month: 'long' }).format(targetDate)


    if (nowDate.getYear() > targetDate.getYear()) {
        return `${targetDate.getDate()} ${monthName} ${targetDate.getFullYear()}`
    } else {
        if (nowDate.getDate() !== targetDate.getDate()) {
            return `${targetDate.getDate()} ${monthName}`
        } else {
            const diff = nowDate.getTime() - targetDate.getTime()
            const seconds = Math.floor(diff / 1000)
            const minutes = Math.floor(diff / 1000 / 60)
            const hours = Math.floor(diff / 1000 / 60 / 60)

            if (hours > 0) {
                return `${hours} hour${hours > 1 ? 's' : ''} ago`
            } else if (minutes > 0) {
                return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
            } else {
                return `${seconds} second${seconds > 1 ? 's' : ''} ago`
            }
        }
    }
}
