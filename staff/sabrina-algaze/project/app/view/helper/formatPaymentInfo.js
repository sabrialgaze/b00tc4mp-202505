export const formatPaymentInfo = payment => {
    const date = new Date(payment.trainingDate)

    if (payment.service === 'day') {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        return `${day}/${month}`
    } else {
        return date.toLocaleDateString('en-US', { month: 'long' })
    }
}