import './indexOf.js'

console.info('TEST indexOf')

console.info('CASE finds index of element that exists in the ayay')

{
    const nums = new Ayay(10, 20, 30)

    const index = nums.indexOf(30)

    console.assert(index === 2, 'index is 2')
    console.assert(nums[2] === 30)
}

console.info('CASE element does not exist in the ayay')

{
    const nums = new Ayay(10, 20, 30)

    const index = nums.indexOf(40)

    console.assert(index === -1, 'index is -1')
}

console.info('CASE finds index of element starting from another index')

{
    const nums = new Ayay(10, 20, 30, 30)

    const index = nums.indexOf(30, 3)

    console.assert(index === 3, 'index is 3')
    console.assert(nums[3] === 30, 'nums at index 3 is 30')

}

console.info('CASE finds index of element counting back from the end of ayay')

{
    const nums = new Ayay(10, 20, 30, 20)

    const index = nums.indexOf(20, -1)

    console.assert(index === 3, 'index is 3')
    console.assert(nums[3] === 20, 'nums at index 3 is 20')
}

console.info('CASE element is not founded counting back from the end of ayay')

{
    const nums = new Ayay(10, 20, 30)

    const index = nums.indexOf(10, -2)

    console.assert(index === -1, 'index is -1')
    console.assert(nums[0] === 10, 'nums at index 0 is 10')
}

console.info('CASE cannot search for NaN in the ayay')

{
    const nums = new Ayay(NaN, 10, 20, 30)

    const index = nums.indexOf(NaN)

    console.assert(index === -1, 'index is -1')
    console.assert(Number.isNaN(nums[0]), 'nums at index 0 is NaN')
}

