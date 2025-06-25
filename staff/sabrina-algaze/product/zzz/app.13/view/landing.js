const title = React.createElement('h1', { children: 'App' })

const registerLink = React.createElement('a', {
    href: '',
    children: ['Register'],
    onClick: function (event) {
        event.preventDefault()

        alert('go to register')
    }
})

const loginLink = React.createElement('a', {
    href: '',
    children: ['Login']
})

const navigations = React.createElement('p', {
    className: 'text-center',
    children: [registerLink, ' or ', loginLink],
})

const landing = React.createElement('div', { children: [title, navigations] })