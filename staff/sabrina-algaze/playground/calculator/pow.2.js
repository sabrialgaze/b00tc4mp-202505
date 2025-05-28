function pow(a, b){
    // TODO implement me
    if (typeof a !== 'number' && typeof b !== 'number') throw new Error ('invalid a and b type')
    if (typeof a !== 'number') throw new Error ('invalid a type')
    if (typeof b !== 'number') throw new Error ('invalid b type')
    
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

console.info('CASE a is "2" and b is "3" then throws error "invalid a and b type"')

var expectedError = null

try {
    pow('2', '3')
} catch (error) {
    expectedError = error
}

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid a and b type') 
