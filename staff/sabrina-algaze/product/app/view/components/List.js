function List() {
    Component.call(this, document.createElement('ul'))
}

List.prototype = Object.create(Component.prototype)
List.prototype.constructor = List