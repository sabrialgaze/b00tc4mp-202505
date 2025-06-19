console.info('TEST find')

console.info('CASE returns the index of the first element from array that satisfies the provided testing callback')

{
    const nums = [10, 20, 30]

    let iterations = 0
    const elements = []
    const indexes = []
    const selfies = []

    const foundIndex = nums.findIndex((element, index, array) => {
        iterations++
        elements.push(element)
        indexes.push(index)
        selfies.push(array)

        return element > 15
    })

    console.assert(foundIndex === 1, 'foundIndex is 1')
    console.assert(iterations === 2, 'iterations is 2')
    console.assert(elements[0] === 10, 'elements at 0 is 10')
    console.assert(elements[1] === 20, 'elements at 1 is 20')
    console.assert(indexes[0] === 0, 'indexes at 0 is 0')
    console.assert(indexes[1] === 1, 'indexes at 1 is 1')
    console.assert(selfies[0] === nums, 'selfies at 0 is nums')
    console.assert(selfies[1] === nums, 'selfies at 1 is nums')
}

console.info('CASE cant find the element from array that satisfies the testing callback')

{
    const nums = [10, 20, 30]

    let iterations = 0
    const elements = []
    const indexes = []
    const selfies = []

    const foundIndex = nums.findIndex((element, index, array) => {
        iterations++
        elements.push(element)
        indexes.push(index)
        selfies.push(array)

        return element < 10
    })

    console.assert(foundIndex === -1, 'foundIndex is -1')
    console.assert(iterations === 3, 'iterations is 3')
    console.assert(elements[0] === 10, 'elements at 0 is 10')
    console.assert(elements[1] === 20, 'elements at 1 is 20')
    console.assert(elements[2] === 30, 'elements at 2 is 30')
    console.assert(indexes[0] === 0, 'indexes at 0 is 0')
    console.assert(indexes[1] === 1, 'indexes at 1 is 1')
    console.assert(indexes[2] === 2, 'indexes at 2 is 2')
    console.assert(selfies[0] === nums, 'selfies at 0 is nums')
    console.assert(selfies[1] === nums, 'selfies at 1 is nums')
    console.assert(selfies[2] === nums, 'selfies at 2 is nums')
}

console.info('CASE the array is empty')

{
    const nums = []

    const foundIndex = nums.findIndex(num => num < 10)

    console.assert(foundIndex === -1, 'foundIndex is -1')
}

console.info('CASE testing callback is not provided')

{
    let expectedError = null

    try {
        const nums = [10, 20, 30]

        nums.findIndex()
    } catch (error) {
        expectedError = error
    }

    console.assert(expectedError instanceof TypeError, 'expectedError is instance of TypeError constructor')
    console.assert(expectedError.message === 'undefined is not a function')
}

console.info('CASE testing callback is a number')

{
    let expectedError = null

    try {
        const nums = [10, 20, 30]

        nums.findIndex(1)
    } catch (error) {
        expectedError = error
    }

    console.assert(expectedError instanceof TypeError, 'expectedError is instance of TypeError constructor')
    console.assert(expectedError.message === 'number 1 is not a function', 'expectedError message is "number 1 is not a function"')
}

console.info('CASE testing callback is provided with undefined')

{
    let expectedError = null

    try {
        const nums = [10, 20, 30]

        nums.findIndex(undefined)
    } catch (error) {
        expectedError = error
    }

    console.assert(expectedError instanceof TypeError, 'expectedError is instance of TypeError constructor')
    console.assert(expectedError.message === 'undefined is not a function')
}