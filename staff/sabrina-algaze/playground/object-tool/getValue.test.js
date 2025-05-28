import { getValue } from './getValue.js'

console.info('TEST getValue')

const o1 = {
    k1: [
        10,
        { k1: 100, k2: 200, k3: 300 },
        function () { return 20 },
        [30, 40, 50, {
            k1: 'hello',
            k2: {
                k1: 'world'
            }
        }]
    ],
    k2: {
        k1: {
            k1: {
                k1: 'hola',
                k2: 'mundo'
            },
            k2: {
                k1: true,
                k2: false
            },
            k3: {
                k1: undefined,
                k2: null
            },
            k4: {
                k1: NaN,
                k2: Infinity
            },
            k5: 123
        },
        k2: 'i love coding'
    },
    k3: 'first do it'
}

console.info('CASE gets first level value in object tree')

{
    const value = getValue(o1, 'k3')

    console.assert(value === 'first do it', 'value is "first do it"')

}

console.info('CASE gets second level value in object tree')

{
    const value = getValue(o1, 'k2.k2')

    console.assert(value === 'i love coding', 'value is "i love coding"')
}

console.info('CASE gets third level value in object tree')

{
    const value = getValue(o1, 'k2.k1.k5')

    console.assert(value === 123, 'value is 123')
}

console.info('CASE gets fourth level value in object tree')

{
    const value = getValue(o1, 'k2.k1.k2.k1')

    console.assert(value === true, 'value is true')
}

console.info('CASE gets fifth level value in object tree')

{
    const value = getValue(o1, 'k1.3.3.k2.k1')

    console.assert(value === 'world', 'value is "world"')
}

console.info('CASE target is o1 and path is not present then returns o1')

{
    const value = getValue(o1)

    console.assert(value === o1, 'value is o1')
}

console.info('CASE throws error on non-string path')

{
    let expectedError = null

    try {
        getValue(o1, undefined)
    } catch (error) {
        expectedError = error
    }

    console.assert(expectedError instanceof TypeError, 'error is instance of TypeError')
    console.assert(expectedError.message === 'path is not a string')
}

console.info('CASE throws error on wrong path to array')

{
    let expectedError = null

    try {
        getValue(o1, 'k1.10')
    } catch (error) {
        expectedError = error
    }

    console.assert(expectedError instanceof RangeError, 'error is instance of RangeError')
    console.assert(expectedError.message === 'path does not exist')
}

console.info('CASE throws error on non-object target')

{
    let expectedError = null

    try {
        getValue(undefined, 'k1.0')
    } catch (error) {
        expectedError = error
    }

    console.assert(expectedError instanceof TypeError, 'error in instance of TypeError')
    console.assert(expectedError.message === 'target is not an object')
}

console.info('CASE throws error on non-object target and no path')

{
    let expectedError = null

    try {
        getValue(undefined)
    } catch (error) {
        expectedError = error
    }

    console.assert(expectedError instanceof TypeError, 'error in instance of TypeError')
    console.assert(expectedError.message === 'target is not an object')
}
