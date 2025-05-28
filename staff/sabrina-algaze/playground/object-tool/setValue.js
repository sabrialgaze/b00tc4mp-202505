export const setValue = (target, path, value) => {
    // target[path] = value
    // return target
    
    let keys = path.split('.')

    let myPath = target

    for (let i = 0; i < keys.length - 1; i++) {
        let key = keys[i]

        myPath = myPath[key]
    }
    myPath[keys[keys.length - 1]] = value

    return target
}

