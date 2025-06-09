console.info('TEST find')

console.info('CASE returns first element from array that satisfies the testing callback')

{
    const nums = [10, 20, 30]

    let iterations = 0
    const elements = []
    const indexes = []
    const selfies = []

    const found = nums.find((num, index, array) => {
        iterations++
        elements.push(num)
        indexes.push(index)
        selfies.push(array)

        return num > 15
    })

    console.assert(found === 20, 'found is 20')
    console.assert(iterations === 2, 'iterations is 2')
    console.assert(elements[0] === 10, 'elements at 0 is 10')
    console.assert(elements[1] === 20, 'elements at 1 is 20')
    console.assert(indexes[0] === 0, 'indexes at 0 is 0')
    console.assert(indexes[1] === 1, 'indexes at 0 is 1')
    console.assert(selfies[0] === nums, 'selfies at 0 is nums')
    console.assert(selfies[1] === nums, 'selfies at 1 is nums')
}

console.info('CASE cant find the element from array that satisfies the testing callback')

{
    const nums = [10, 20, 30]

    let iterations = 0

    const found = nums.find(num => {
        iterations++

        return num < 10
    })

    console.assert(found === undefined, 'found is undefined')
    console.assert(iterations === 3, 'iterations is 3')
    //TODO
}

console.info('CASE the array is empty')

{
    const nums = []

    const found = nums.find(num => num < 10)

    console.assert(found === undefined, 'found is undefined')

}

console.info('CASE testing callback is not provided')

{
    let expectedError = null

    try {
        const nums = [10, 20, 30]

        nums.find()
    } catch (error) {
        expectedError = error
    }

    console.assert(expectedError instanceof TypeError, 'expectedError is instance of TypeError constructor')
    console.assert(expectedError.message === 'undefined is not a function')
}