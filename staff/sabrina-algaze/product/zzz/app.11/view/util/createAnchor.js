const createAnchor = (href, text) => {
    const anchor = document.createElement('a')
    anchor.href = href
    anchor.textContent = text

    return anchor
}