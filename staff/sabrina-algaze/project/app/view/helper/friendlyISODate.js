export const friendlyISODate = isoDate => {
    const date = new Date(isoDate)
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}