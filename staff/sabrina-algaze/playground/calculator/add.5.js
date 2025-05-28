function add(a, b) {
    // TODO implement me
    
    if (typeof a === 'string') throw new Error('invalid a type')
    if (typeof a === undefined) throw new Error('invalid a type')
    if (typeof b === 'string') throw new Error('invalid b type')
    //if (typeof b === undefined) throw new Error('invalid b type')
    

    return a + b
}

// TEST

console.info('TEST add')


console.info('CASE a is 10 and b is 20 then returns 30')

const r = add(10, 20)

console.assert(r === 30, 'r is 30')


console.info('CASE a is "10" and b is 20 then throws error "invalid a type"')

var expectedError = null

try {
    add('10', 20)
} catch (error) {
    expectedError = error
}

console.debug(expectedError)
// Error: invalidad a type

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalidad a type')

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
// console.info('CASE b is undefined and a is 10 then throws error "invalid b type")

var expectedError = null

try {
    add(undefined, 20)
} catch (error) {
    expectedError = error
}

/* try {
    add(10)
}  catch (error) {
    expectedError = error
}
*/

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid a type')
//console.assert(expectedError.message === 'invalid b type')

