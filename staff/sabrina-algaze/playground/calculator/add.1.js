function add(a, b) {
    // TODO implement me
}

// TEST

console.info('TEST add')

console.info('CASE a is 10 and b is 20 then returns 30')

const r = add(10, 20)

console.debug(r)
// 30

console.assert(r === 30, 'r is 30')

console.info('CASE a is "10" and b is 20 then throws error "invalid a type"')

let expectedError

try {
    add('10', 20)
} catch (error) {
    expectedError = error
}

console.debug(expectedError)
// Error: invalidad a type

console.assert(expectedError instanceof Error, 'expectedError is instance of Error constructor')
console.assert(expectedError.message === 'invalid a type')
