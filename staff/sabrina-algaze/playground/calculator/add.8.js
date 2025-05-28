function add(a, b) {
    // TODO implement me
    
    if (arguments.length === 0) return 0
    if (typeof a !== 'number') throw new Error ('invalid a type')
    if (arguments.length === 1) return a
    // if (typeof a === 'string') throw new Error('invalid a type')
    // if (typeof a === 'undefined' && typeof b === 'undefined') throw new Error('invalid a and b type')
    // if (typeof a === 'undefined') throw new Error('invalid a type')
    // if (typeof b === 'string') throw new Error('invalid b type')
    // if (typeof b === 'undefined') throw new Error('invalid b type')
    // if (typeof a === 'boolean') throw new Error('invalid a type')
    // if (typeof a !== 'number' && typeof b !== 'number') throw new Error ('invalid a and b type')
    if (typeof b !== 'number') throw new Error ('invalid b type')   
        
    return a + b
}

// TEST

console.info('TEST add')


console.info('CASE a is 10 and b is 20 then returns 30')

var r = add(10, 20)

console.assert(r === 30, 'r is 30')


console.info('CASE a is "10" and b is 20 then throws error "invalid a type"')

var expectedError = null

try {
    add('10', 20)
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid a type')

console.info('CASE a is 10 and b is "20" then throws error "invalid b type"')

var expectedError = null

try {
    add(10, '20')
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid b type')

console.info('CASE a is undefined and b is 20 then throws error "invalid a type"')


var expectedError = null

try {
    add(undefined, 20)
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid a type')
//console.assert(expectedError.message === 'invalid b type')

console.info('CASE b is not present and a is 10 then returns 10')

var r = add(10)

console.assert(r === 10, 'r is 10')


console.info('CASE a is not present and b is not present then returns 0')

var r = add()

console.assert(r === 0, 'r is 0')

console.info('CASE b is undefined and a is 10 then throws error "invalid b type"')


var expectedError = null

try {
    add(10, undefined)
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid b type')

// console.info('CASE a is undefined and b is undefined then throws error "invalid a and b type"')


// var expectedError = null

// try {
//     add(undefined, undefined)
// } catch (error) {
//     expectedError = error
// }

// console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
// console.assert(expectedError.message === 'invalid a and b type')

console.info('CASE a is boolean and b is 20 then throws error "invalid a type"')

var expectedError = null

try {
    add(true, 20)
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid a type')

console.info('CASE b is not present and a is "10" then throws error "invalid a type"')

expectedError = null

try {
    add('10')
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid a type')