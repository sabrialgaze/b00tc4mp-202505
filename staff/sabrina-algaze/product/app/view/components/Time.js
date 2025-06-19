function Time() {
    Component.call(this, document.createElement('time'))
}

Time.prototype = Object.create(Component.prototype)
Time.prototype.constructor = Time