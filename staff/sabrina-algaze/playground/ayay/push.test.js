import './push.js'

console.info('TEST push')

console.info('CASE adds element to the end of ayay')

{
    const nums = new Ayay(10, 20, 30)

    const length = nums.push(40)

    console.assert(length === 4, 'length is 4')
    console.assert(nums.length === 4, 'nums length is 4')
    console.assert(nums[nums.length - 1] === 40, 'the last element in nums is 40')
}

console.info('CASE adds elements to the end of ayay')

{
    const nums = new Ayay(10, 20, 30)

    const length = nums.push(40, 50)

    console.assert(length === 5, 'length is 5')
    console.assert(nums.length === 5, 'nums length is 5')
    console.assert(nums[nums.length - 1] === 50, 'the last element in nums is 50')
    console.assert(nums[nums.length - 2] === 40, 'the second to last element in nums is 40')
}

console.info('CASE adds no elements to ayay')

{
    const nums = new Ayay(10, 20, 30)

    const length = nums.push()

    console.assert(length === 3, 'length is 3')
    console.assert(nums.length === 3, 'nums length is 3')
}