import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { logic } from '../logic'
import { helper } from './helper'

export const Payments = () => {
    const navigate = useNavigate()
    const [payments, setPayments] = useState([])

    useEffect(() => {
        try {
            logic.getPaymentsForPlayer()
                .then(payments => {
                    setPayments(payments)
                })
                .catch(error => {
                    console.error(error)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [])

    const handleNewPaymentClick = () => {
        navigate('/new-payment')
    }

    return <div>
        <div className="flex">
            <h1 className="text-xl font-semibold text-left pr-2">Payments</h1>
            <button onClick={handleNewPaymentClick} className="border-2 rounded-xl border-black-600 px-2 py-0.5 hover:bg-gray-100 font-bold">+</button>
        </div>
        <div>
            {payments.map(payment => {
                const isPastPayment = helper.isPaymentPast(payment)
                const cardClasses = isPastPayment
                    ? "border-2 rounded-xl border-black-600 bg-gray-100 p-4 mt-2"
                    : "border-2 rounded-xl border-black-600 bg-green-100 p-4 mt-2"

                return <div className={cardClasses} key={payment.id}>
                    {payment.service === 'day' ? `${helper.formatPaymentInfo(payment)}` : `${helper.formatPaymentInfo(payment)}`} - Group: {payment.group.name}
                </div>
            })}
        </div>
    </div>
}