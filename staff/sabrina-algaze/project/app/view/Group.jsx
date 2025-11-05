export const Group = ({ group, onGroupClicked }) => {
    console.debug('Group -> render')

    const handleGroupClick = () => {
        onGroupClicked(group.id)
    }

    return <div onClick={handleGroupClick} className="border-2 rounded-xl border-black-600 p-4 mt-2">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-lg font-semibold text-left">{group.name}</h1>
                <h2 className="text-sm text-left mt-1">{group.location}</h2>
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-600">nº players:</p>
                <p className="text-sm text-gray-600 mt-1">{group.playersCount}</p>
            </div>
        </div>
    </div>
}   