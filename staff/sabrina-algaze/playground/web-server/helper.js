const renderWelcomeUser = userName => `<p>Welcome ${userName}</p>`

const renderProductItem = ({ id, brand, model, type, filmFormat, price }, isCart = false) => `<h3><a href="http://localhost:8080/products/${id}"> ${brand} ${model}</a></h3>
                        
<i>${type} ${filmFormat}</i>

<strong>${price}</strong>

<form action="/products/${id}/add" method="post">
    <button type="submit">Add</button>
</form>

${isCart ? `<form action="/products/${id}/remove" method="post">
    <button type="submit">🗑</button>
</form>` : ''}

<a href="http://${brand}.com">${brand}</a>`

const renderButton = (type, text) => `<button type=${type}>${text}</button>`

const renderLabel = (forId, text) => `<label for="${forId}">${text}</label>`

const renderInput = (type, id, name, value = '') => `<input type="${type}" id="${id}" name="${name}" value="${value}" />`


const helper = {
    renderWelcomeUser,
    renderProductItem,
    renderButton,
    renderLabel,
    renderInput
}

module.exports = { helper }