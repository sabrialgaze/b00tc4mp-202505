import { logic } from '../logic'

export const NewPost = ({ onCreated, onCancelled }) => {
    const handleNewPostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const text = form.text.value

        try {
            logic.createPost(image, text)
                .then(() => {
                    form.reset()

                    onCreated()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleNewPostCancelClick = () => onCancelled()

    console.debug('New Post -> render')

    return <div>
        <h2 className="font-semibold text-lg">New post</h2>
        <form className="flex flex-col gap-1" onSubmit={handleNewPostSubmit}>
            <div className="flex flex-col">
                <label htmlFor="image">Image</label>
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" id="image" type="url" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="text">Text</label>
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" id="text" type="text" />
            </div>
            <div className="flex justify-end mt-2 gap-1">
                <button className="rounded-full px-3 py-1 border text-gray-700 hover:bg-gray-100 transition" type="button" onClick={handleNewPostCancelClick}>Cancel</button>
                <button className="rounded-full px-3 py-1 bg-gray-900 text-white hover:bg-gray-700 transition" type="submit">Create</button>
            </div>
        </form>
    </div>
}