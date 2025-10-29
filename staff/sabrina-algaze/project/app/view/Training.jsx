import { helper } from './helper'

export const Training = ({ training, onTrainingClicked }) => {
    console.debug('Training -> render')

    const handleTrainingClick = () => {
        if (!training.isPaid) return

        onTrainingClicked(training.id)
    }

    const isPastTraining = new Date(training.date) < new Date()

    const cardClases = isPastTraining
        ? "border-2 rounded-xl border-black-600 bg-gray-100 p-4 mt-2"
        : "border-2 rounded-xl border-black-600 bg-green-100 p-4 mt-2"

    return <div onClick={handleTrainingClick} className={cardClases}>
        <div className="flex justify-between items-start">
            <div>
                <div className="text-lg font-semibold text-left">{helper.friendlyISODate(training.date)} - Group: {training.group.name}</div>
                <div className="text-sm text-left mt-1">{training.group.location} {!training.isPaid && (
                    <span className="px-2 py-1 text-xs bg-red-200 text-red-800 rounded-full"> {isPastTraining ? 'not paid' : 'pending payment'}</span>
                )}
                    {isPastTraining && training.isPaid && (
                        <span className="px-2 py-1 text-xs bg-orange-200 text-orange-800 rounded-full">not joined</span>
                    )}
                </div>
            </div>
            <div className="text-right">
                <div className="text-sm text-gray-600">nº players:</div>
                <div className="text-sm text-gray-600 mt-1">{training.joined.length}/{training.group.playersCount}</div>
            </div>
        </div>
    </div>

}