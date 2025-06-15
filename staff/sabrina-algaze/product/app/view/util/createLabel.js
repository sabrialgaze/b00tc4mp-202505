const createLabel = (htmlFor, text) => {
    const label = document.createElement('label')
    label.htmlFor = htmlFor
    label.textContent = text

    return label
} 
