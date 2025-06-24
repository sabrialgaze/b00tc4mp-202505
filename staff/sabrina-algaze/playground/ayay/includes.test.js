import './includes.js'

console.info('TEST includes')

console.info('CASE element is included in the ayay')

{
    const nums = new Ayay(10, 20, 30)

    const included = nums.includes(30)

    console.assert(included === true, 'included is true')
    console.assert(nums[2] === 30, 'nums at index 2 is 30')
}

console.info('CASE element is not included in the ayay')

{
    const nums = new Ayay(10, 20, 30)

    const included = nums.includes(40)

    console.assert(included === false, 'included is false')
}

console.info('CASE element is included starting from another index')

{
    const nums = new Ayay(10, 20, 30, 10)

    const included = nums.includes(10, 1)

    console.assert(included === true, 'included is true')
    console.assert(nums[3] === 10, 'nums at index 3 is 10')
}

console.info('CASE element is included when counting backward from the end of the ayay')

{
    const nums = new Ayay(10, 20, 30, 20)

    const included = nums.includes(20, -1)

    console.assert(included === true, 'included is true')
    console.assert(nums[3] === 20, 'nums at index 3 is 20')
}

console.info('CASE element is not included when counting backward from the end of the ayay')

{
    const nums = new Ayay(10, 20, 30)

    const included = nums.includes(10, -2)

    console.assert(included === false, 'included is false')
    console.assert(nums[0] === 10, 'nums at index 0 is 10')
}

console.info('CASE NaN is included in the ayay')

{
    const nums = new Ayay(NaN, 10, 20, 30)

    const included = nums.includes(NaN)

    console.assert(included === true, 'included is true')
    console.assert(Number.isNaN(nums[0]), 'nums at index 0 is NaN')
}