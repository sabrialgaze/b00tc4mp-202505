export const extractPayloadFromToken = token => {
    const fromIndex = token.indexOf('.')
    const lastIndex = token.lastIndexOf('.')

    const payloadB64 = token.slice(fromIndex + 1, lastIndex)
    const payloadJSON = atob(payloadB64)
    const payload = JSON.parse(payloadJSON)

    return payload
}
