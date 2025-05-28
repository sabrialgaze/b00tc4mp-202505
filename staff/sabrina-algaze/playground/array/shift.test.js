console.info('TEST shift')

console.info('CASE deletes first element from array')

{
    const nums = [10, 20, 30]

    const deleted = nums.shift()

    console.assert(deleted === 10, 'deleted is 10')
    console.assert(nums.length === 2, 'nums length is 2')
}

console.info('CASE deletes first element from an empty array')

{
    const nums = []

    const deleted = nums.shift()

    console.assert(deleted === undefined, 'deleted is undefined')
    console.assert(nums.length === 0, 'nums length is 0')
}