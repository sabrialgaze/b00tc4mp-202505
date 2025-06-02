console.info('TEST unshift')

console.info('CASE adds element to the beginning of array')

{
    const nums = [10, 20, 30]

    const length = nums.unshift(0)

    console.assert(length === 4, 'length is 4')
    console.assert(nums.length === 4, 'nums length is 4')
    console.assert(nums[0] === 0, 'the first element in nums is 0')
    console.assert(nums[1] === 10, 'the second element in nums is 10')
    console.assert(nums[2] === 20, 'the third element in nums is 20')
    console.assert(nums[3] === 30, 'the fourth element in nums is 30')

}

console.info('CASE adds elements to the beginning of array')

{
    const nums = [10, 20, 30]

    const length = nums.unshift(0, 5)

    console.assert(length === 5, 'length is 5')
    console.assert(nums.length === 5, 'nums length is 5')
    console.assert(nums[0] === 0, 'the fist element in nums is 0')
    console.assert(nums[1] === 5, 'the second element in nums is 5')
    console.assert(nums[2] === 10, 'the third element in nums is 10')
    console.assert(nums[3] === 20, 'the fourth element in nums is 20')
    console.assert(nums[4] === 30, 'the fifth element in nums is 30')

}

console.info('CASE adds no elements to array')

{
    const nums = [10, 20, 30]

    const length = nums.unshift()

    console.assert(length === 3, 'length is 3')
    console.assert(nums.length === 3, 'nums length is 3')
    console.assert(nums[0] === 10, 'the fist element in nums is 10')
    console.assert(nums[1] === 20, 'the second element in nums is 20')
    console.assert(nums[2] === 30, 'the second element in nums is 30')
}


