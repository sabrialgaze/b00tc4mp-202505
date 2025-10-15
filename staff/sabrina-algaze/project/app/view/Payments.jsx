import { useNavigate } from 'react-router'
import { Routes, Route } from 'react-router'
import { NewPayment } from './NewPayment'

export const Payments = () => {
    const navigate = useNavigate()

    const handleNewPaymentClick = () => {
        navigate('/new-payment')
    }

    return <div className="flex">
        <h1 className="text-xl font-semibold text-left pr-2">Payments</h1>
        <button onClick={handleNewPaymentClick} className="border-2 rounded-xl border-black-600 px-2 py-0.5 hover:bg-gray-100 font-bold">+</button>
    </div>
}