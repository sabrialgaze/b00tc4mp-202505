import './pop.js'

console.info('TEST pop')

console.info('CASE deletes last element from ayay')

{
    const nums = new Ayay(10, 20, 30)

    const deleted = nums.pop()

    console.assert(deleted === 30, 'deleted is 30')
    console.assert(nums.length === 2, 'nums length is 2')
}

console.info('CASE deletes last element from an empty ayay')

{
    const nums = new Ayay()

    const deleted = nums.pop()

    console.assert(deleted === undefined, 'deleted is undefined')
    console.assert(nums.length === 0, 'nums length is 0')
}