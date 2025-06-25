function ListItem() {
    Component.call(this, document.createElement('li'))
}

ListItem.prototype = Object.create(Component.prototype)
ListItem.prototype.constructor = ListItem