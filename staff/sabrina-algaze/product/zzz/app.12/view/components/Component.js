function Component(container) {
    this.container = container

    this.children = []
}

Component.prototype.add = function (child) {
    if (!(child instanceof Component)) throw new TypeError('child is not a Component')

    this.children.push(child)

    this.container.appendChild(child.container)
}

Component.prototype.remove = function (child) {
    if (!(child instanceof Component)) throw new TypeError('child is not a Component')

    const index = this.children.findIndex(_child => _child === child)

    if (index < 0) throw new Error('child not found')
    this.children.splice(index)

    this.container.removeChild(child.container)
}

Component.prototype.removeAll = function () {
    this.children.length = 0

    this.container.innerHTML = ''
}

Component.prototype.addClass = function () {
    Array.prototype.forEach.call(arguments, className =>
        this.container.classList.add(className))
}

Component.prototype.addBehavior = function (eventName, listener) {
    this.container.addEventListener(eventName, event => {
        event.preventDefault()

        listener()
    })
}