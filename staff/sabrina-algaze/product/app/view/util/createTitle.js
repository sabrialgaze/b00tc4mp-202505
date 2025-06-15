const createTitle = (level, text) => {
    const title = document.createElement('h' + level)
    const titleText = document.createTextNode(text)
    title.appendChild(titleText)

    return title
}