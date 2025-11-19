import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { logic } from '../logic'
import { helper } from './helper'
import { useRole } from '../hooks'
import { PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export const Payments = () => {
    const [payments, setPayments] = useState([])
    const navigate = useNavigate()

    const role = useRole()

    const loadPayments = () => {
        if (!role) return

        try {
            if (role === 'player') {
                logic.getPaymentsForPlayer()
                    .then(payments => {
                        setPayments(payments)
                    })
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })
            } else if (role === 'coach') {
                logic.getPaymentsForCoach()
                    .then(payments => {
                        setPayments(payments)
                    })
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })
            }
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    useEffect(() => loadPayments(), [])

    const handleNewPaymentClick = () => {
        navigate('/new-payment')
    }

    const handleToggleConfirm = paymentId => {
        try {
            logic.toggleConfirmPayment(paymentId)
                .then(() => loadPayments())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    console.debug('Payments -> render')

    return <div>
        <div className="flex">
            <h1 className="text-xl font-normal text-left pr-2">Payments</h1>
            {role === 'player' && <button onClick={handleNewPaymentClick} className="border-2 rounded-xl border-black-600 px-2 py-0.5 hover:bg-gray-100 font-bold">+</button>}
        </div>
        <div>
            {payments.map(payment => {
                if (role === 'player') {
                    const isPastPayment = helper.isPaymentPast(payment)
                    const cardClasses = isPastPayment
                        ? "border-2 rounded-xl border-black-600 bg-gray-100 p-4 mt-2"
                        : "border-2 rounded-xl border-black-600 bg-green-100 p-4 mt-2"

                    return <div className={cardClasses} key={payment.id}>
                        {payment.service === 'day' ? `${helper.formatPaymentInfo(payment)}` : `${helper.formatPaymentInfo(payment)}`} - Group: {payment.group.name}
                    </div>
                } else if (role === 'coach') {
                    return <div className="border-2 rounded-xl border-black-600 bg-gray-100 p-4 mt-2 flex justify-between items-center" key={payment.id}>
                        <div className="flex flex-col">
                            <p className="font-bold text-lg">{payment.player.name}</p>
                            <p className="text-sm italic text-gray-600 mt-1">{payment.service === 'day' ? `Day: ${helper.formatPaymentInfo(payment)}` : `Month: ${helper.formatPaymentInfo(payment)}`} - Group: {payment.group.name}
                            </p>
                        </div>
                        <div>
                            <button onClick={() => handleToggleConfirm(payment.id)} className="ml-4 p-2 hover:bg-gray-200 rounded-full transition" >
                                {payment.confirmed ? (<CheckCircleIcon className="w-6 h-6 text-green-500" />) : (<PlusCircleIcon className="w-6 h-6 text-gray-500" />)}
                            </button>
                        </div>
                    </div>
                }
            })}
        </div>
    </div>
}