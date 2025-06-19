function Division() {
    Component.call(this, document.createElement('div'))
}

Division.prototype = Object.create(Component.prototype)
Division.prototype.constructor = Division