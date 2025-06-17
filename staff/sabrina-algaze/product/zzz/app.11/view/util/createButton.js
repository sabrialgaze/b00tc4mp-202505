const createButton = (type, text) => {
    const button = document.createElement('button')
    button.type = type
    button.textContent = text

    return button
}