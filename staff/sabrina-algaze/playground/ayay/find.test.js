import './find.js'

console.info('TEST find')

console.info('CASE returns first element from ayay that satisfies the testing callback')

{
    const nums = new Ayay(10, 20, 30)

    let iterations = 0
    const elements = []
    const indexes = []
    const selfies = []

    const found = nums.find((num, index, ayay) => {
        iterations++
        elements.push(num)
        indexes.push(index)
        selfies.push(ayay)

        return num > 15
    })

    console.assert(found === 20, 'found is 20')
    console.assert(iterations === 2, 'iterations is 2')
    console.assert(elements[0] === 10, 'elements at 0 is 10')
    console.assert(elements[1] === 20, 'elements at 1 is 20')
    console.assert(indexes[0] === 0, 'indexes at 0 is 0')
    console.assert(indexes[1] === 1, 'indexes at 1 is 1')
    console.assert(selfies[0] === nums, 'selfies at 0 is nums')
    console.assert(selfies[1] === nums, 'selfies at 1 is nums')
}

console.info('CASE cant find the element from ayay that satisfies the testing callback')

{
    const nums = new Ayay(10, 20, 30)

    let iterations = 0
    const elements = []
    const indexes = []
    const selfies = []

    const found = nums.find((num, index, ayay) => {
        iterations++
        elements.push(num)
        indexes.push(index)
        selfies.push(ayay)

        return num < 10
    })

    console.assert(found === undefined, 'found is undefined')
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

console.info('CASE the ayay is empty')

{
    const nums = new Ayay()

    const found = nums.find(num => num < 10)

    console.assert(found === undefined, 'found is undefined')

}

console.info('CASE testing callback is not provided')

{
    let expectedError = null

    try {
        const nums = new Ayay(10, 20, 30)

        nums.find()
    } catch (error) {
        expectedError = error
    }

    console.assert(expectedError instanceof TypeError, 'expectedError is instance of TypeError constructor')
    console.assert(expectedError.message === 'undefined is not a function')
}