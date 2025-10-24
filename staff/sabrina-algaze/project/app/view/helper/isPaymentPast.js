export const isPaymentPast = payment => {
    const paymentDate = new Date(payment.date)
    const now = new Date()

    if (payment.service === 'month') {
        return paymentDate.getFullYear() < now.getFullYear() ||
            (paymentDate.getFullYear() === now.getFullYear() &&
                paymentDate.getMonth() < now.getMonth())
    } else {
        return paymentDate.getMonth() < now.getMonth() ||
            (paymentDate.getMonth() === now.getMonth() &&
                paymentDate.getDate() < now.getDate())
    }
}
