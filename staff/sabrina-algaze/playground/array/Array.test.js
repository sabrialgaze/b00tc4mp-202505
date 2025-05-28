console.info('TEST Array (constructor)')

console.info('CASE instantiate an empty array')

{
    const a = new Array()

    console.assert(a instanceof Array, 'a is instance of Array')
    console.assert(a.length === 0, 'a length is 0')
}

console.info('CASE instantiate an array with 3 elements')

{
    const a = new Array(10, 20, 30)

    console.assert(a instanceof Array, 'a is instance of Array')
    console.assert(a.length === 3, 'a length is 3')
    console.assert(a[0] === 10, 'a at index 0 is 10')
    console.assert(a[1] === 20, 'a at index 1 is 20')
    console.assert(a[2] === 30, 'a at index 2 is 30')
}

console.info('CASE instantiate an array with 2 elements')

{
    const a = new Array(10, 20)

    console.assert(a instanceof Array, 'a is instance of Array')
    console.assert(a.length === 2, 'a length is 2')
    console.assert(a[0] === 10, 'a at index 0 is 10')
    console.assert(a[1] === 20, 'a at index 1 is 20')
}

console.info('CASE instantiate an array with length and no elements')

{
    const a = new Array(10)

    console.assert(a instanceof Array, 'a is instance of Array')
    console.assert(a.length === 10, 'a length is 10')

    for (let i = 0; i < 10; i++)
        console.assert(a[i] === undefined, 'a at index i is undefined')
}

console.info('CASE instantiate an array with 1 element')

{
    const a = new Array('10')

    console.assert(a instanceof Array, 'a is instance of Array')
    console.assert(a.length === 1, 'a length is 1')
    console.assert(a[0] === '10', 'a at index 0 is "10"')
}

console.info('CASE instantiate an array with 1 boolean element')

{
    const a = new Array(false)

    console.assert(a instanceof Array, 'a is instance of Array')
    console.assert(a.length === 1, 'a length is 1')
    console.assert(a[0] === false, 'a at index 0 is false')
}

console.info('CASE instantiate an array with 1 null element')

{
    const a = new Array(null)

    console.assert(a instanceof Array, 'a is instance of Array')
    console.assert(a.length === 1, 'a length is 1')
    console.assert(a[0] === null, 'a at index 0 is null')
}
