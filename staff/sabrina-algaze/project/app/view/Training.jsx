import { helper } from './helper'

export const Training = ({ training }) => {
    console.debug('Training -> render')

    const isPastTraining = new Date(training.date) < new Date()

    const cardClases = isPastTraining
        ? "border-2 rounded-xl border-black-600 bg-gray-100 p-4"
        : "border-2 rounded-xl border-black-600 bg-green-100 p-4"

    return <li className="py-2">
        <div className={cardClases}>
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-lg font-semibold text-left">{helper.friendlyISODate(training.date)} - Group: {training.group.name}</div>
                    <div className="text-sm text-left mt-1">{training.group.location}</div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-600">nº players:</div>
                    <div className="text-sm text-gray-600 mt-1">{training.joined.length}/{training.group.playersCount}</div>
                </div>
            </div>
        </div>
    </li>
}