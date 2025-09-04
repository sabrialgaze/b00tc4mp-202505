export const Alert = ({ message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted()

    return <div className="bg-black/50 h-full fixed top-0 left-0 w-full flex items-center justify-center">
        <div className="bg-white border-2 border-black p-4 ">
            <p>{message}</p>
            <button className="border-1 border-black px-2 bg-black text-white" type="button" onClick={handleAcceptClick}>Ok</button>
        </div>
    </div>
}
