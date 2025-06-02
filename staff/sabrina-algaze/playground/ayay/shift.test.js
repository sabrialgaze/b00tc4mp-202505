import './shift.js'

console.info('TEST shift')

console.info('CASE deletes first element from ayay')

{
    const nums = new Ayay(10, 20, 30)

    const deleted = nums.shift()

    console.assert(deleted === 10, 'deleted is 10')
    console.assert(nums.length === 2, 'nums length is 2')
    console.assert(nums[0] === 20, 'nums at index 0 is 20')
    console.assert(nums[1] === 30, 'nums at index 0 is 30')
}

console.info('CASE deletes first element from an empty ayay')

{
    const nums = new Ayay()

    const deleted = nums.shift()

    console.assert(deleted === undefined, 'deleted is undefined')
    console.assert(nums.length === 0, 'nums length is 0')
}