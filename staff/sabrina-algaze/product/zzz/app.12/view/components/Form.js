function Form() {
    Component.call(this, document.createElement('form'))
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.addSubmitBehavior = function (listener) {
    this.addBehavior('submit', listener)
}

Form.prototype.clear = function () {
    this.container.reset()
}