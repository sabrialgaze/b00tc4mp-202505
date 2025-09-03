const saveToken = token => sessionStorage.token = token

const loadToken = () => sessionStorage.token

const removeToken = () => delete sessionStorage.token

export const data = {
    saveToken,
    loadToken,
    removeToken,
}