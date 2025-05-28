export function getValue(target, path) { 
    if (typeof target !== 'object') throw new TypeError ('target is not an object')
    if (arguments.length === 1) return target

    if (typeof path !== 'string') throw new TypeError ('path is not a string')

    let keys = path.split('.')

    let value = target

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]

        value = value[key]
    }

    if (value === undefined) throw new RangeError ('path does not exist')

    return value
}