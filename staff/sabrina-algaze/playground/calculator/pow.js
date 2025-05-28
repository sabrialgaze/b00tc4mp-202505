function pow(a, b){
    // TODO implement me
    if (arguments.length === 1) return a
    // if (typeof a !== 'number' && typeof b !== 'number') throw new Error ('invalid a and b type')
    if (typeof a !== 'number' || Number.isNaN(a)) throw new Error ('invalid a type')
    if (typeof b !== 'number' || Number.isNaN(b)) throw new Error ('invalid b type')
    // if (typeof a === NaN) throw new Error ('invalid a type')
    // if (Number.isNaN(a)) throw new Error ('invalid a type')
    // if (Number.isNaN(b)) throw new Error ('invalid b type')
    
    return a ** b

}

// TEST

console.info('TEST pow')

console.info('CASE a is 2 and b is 3 then returns 8')

var r = pow(2, 3)

console.assert(r === 8, 'r is 8')

console.info('CASE a is "2" and b is 3 then throws error "invalid a type"')

var expectedError = null

try {
    pow('2', 3)
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid a type')

console.info('CASE a is 2 and b is "3" then throws error "invalid b type')    

var expectedError = null

try {
    pow(2, '3') 
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid b type')

// console.info('CASE a is "2" and b is "3" then throws error "invalid a and b type"')

// var expectedError = null

// try {
//     pow('2', '3')
// } catch (error) {
//     expectedError = error
// }

// console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
// console.assert(expectedError.message === 'invalid a and b type') 

console.info('CASE a is undefined and b is 3 then throws error "invalid a type"')

var expectedError = null

try {
    pow(undefined, 3)
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid a type')

console.info('CASE a is 2 and b is undefined then throws error "invalid b type"')

var expectedError = null

try {
    pow(2, undefined)
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid b type')

console.info('CASE b is not present and a is 2 then returns 2')

var r = pow(2)

console.assert(r === 2, 'r is 2')

// console.info('CASE a and b are not present then returns invalid a and b type')

// var expectedError = null

// try {
//     pow()
// } catch (error) {
//     expectedError = error
// }

// console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
// console.assert(expectedError.message === 'invalid a and b type')

console.info('CASE a is NaN and b is 3 then throws error "invalid a type"')

var expectedError = null

try {
    pow(NaN, 3)
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid a type')

console.info('CASE a is 2 and b is NaN then throws error "invalid b type"')

var expectedError = null

try {
    pow(2, NaN)
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid b type')